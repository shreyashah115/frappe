// Copyright (c) 2016, Frappe Technologies and contributors
// For license information, please see license.txt

{% include 'frappe/contacts/address_and_contact.js' %};

cur_frm.email_field = "email_id";
frappe.ui.form.on("Contact", {
	refresh: function(frm) {
		if(frm.doc.__islocal) {
			const last_doc = frm.events.get_last_doc();
			if(frappe.dynamic_link && frappe.dynamic_link.doc
					&& frappe.dynamic_link.doc.name == last_doc.docname) {
				frm.set_value('links', '');
				frm.add_child('links', {
					link_doctype: frappe.dynamic_link.doctype,
					link_name: frappe.dynamic_link.doc[frappe.dynamic_link.fieldname]
				});
			}
		}

		if(!frm.doc.user && !frm.is_new() && frm.perm[0].write) {
			frm.add_custom_button(__("Invite as User"), function() {
				return frappe.call({
					method: "frappe.contacts.doctype.contact.contact.invite_user",
					args: {
						contact: frm.doc.name
					},
					callback: function(r) {
						frm.set_value("user", r.message);
					}
				});
			});
		}
		frm.set_query('link_doctype', "links", function() {
			return {
				query: "frappe.contacts.address_and_contact.filter_dynamic_link_doctypes",
				filters: {
					fieldtype: "HTML",
					fieldname: "contact_html",
				}
			}
		});
		frm.refresh_field("links");
	},
	validate: function(frm) {
		// clear linked customer / supplier / sales partner on saving...
		if(frm.doc.links) {
			frm.doc.links.forEach(function(d) {
				frappe.model.remove_from_locals(d.link_doctype, d.link_name);
			});
		}
	},
	after_save: function(frm) {
		frappe.run_serially([
			() => frappe.timeout(1),
			() => {
				const last_doc = frm.events.get_last_doc();
				if(frappe.dynamic_link && frappe.dynamic_link.doc
					&& frappe.dynamic_link.doc.name == last_doc.docname){
					frappe.set_route('Form', last_doc.doctype, last_doc.docname);
				}
			}
		]);
	}
});

frappe.ui.form.on("Dynamic Link", {
	link_name:function(frm, cdt, cdn){
		var child = locals[cdt][cdn];
		if(child.link_name) {
			frappe.model.with_doctype(child.link_doctype, function () {
				var title_field = frappe.get_meta(child.link_doctype).title_field || "name"
				frappe.model.get_value(child.link_doctype, child.link_name, title_field, function (r) {
					frappe.model.set_value(cdt, cdn, "link_title", r[title_field])
				})
			})
		}
	}
})
