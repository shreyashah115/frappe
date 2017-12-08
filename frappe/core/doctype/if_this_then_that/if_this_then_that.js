// Copyright (c) 2017, Frappe Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('If This Then That', {
	onload: function(frm) {
		frm.trigger('doctype_name');
	},
	doctype_name: function(frm) {
		const { doctype_name } = frm.doc;
		if (!doctype_name) return;

		frappe.model.with_doctype(doctype_name, () => {
			const meta = frappe.get_meta(doctype_name);

			const fieldname_options = meta.fields.filter(
				df => !frappe.model.no_value_type.includes(df.fieldtype)
			).map(df => df.fieldname);

			frappe.meta.get_docfield('If','fieldname',frm.docname).options = fieldname_options;
			frappe.meta.get_docfield('Then','fieldname',frm.docname).options = fieldname_options;
			frm.refresh();
		})
	}
});
