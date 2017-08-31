// Copyright (c) 2017, Frappe Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Role Profile', {
	onload: function(frm) {
		if(has_common(frappe.user_roles, ["Administrator", "System Manager"]) && !frm.doc.__islocal) {
			if(!frm.roles_editor) {
				var role_area = $('<div style="min-height: 300px">')
					.appendTo(frm.fields_dict.roles_html.wrapper);
				frm.roles_editor = new frappe.RoleEditor(role_area, frm);
			} else {
				frm.roles_editor.show();
			}
		}
	},
});
