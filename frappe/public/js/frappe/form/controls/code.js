frappe.ui.form.ControlCode = frappe.ui.form.ControlText.extend({
	make_input: function() {
		this._super();
		$(this.input_area).find("textarea")
			.attr('name','data-edit')
			.allowTabs()
			.addClass('control-code');
		this.load_ace_editor().then(() => {
			this.make_editor();
		});
	},
	make_editor: function() {
		$('textarea[name="data-edit"]').each(function () {
			var textarea = $(this);
			var mode = textarea.data('editor');
			var editDiv = $('<div>', {
				position: 'absolute',
				width: textarea.width(),
				height: textarea.height(),
				'class': textarea.attr('class')
			}).insertBefore(textarea);
			textarea.css('visibility', 'hidden');
			var editor = ace.edit(editDiv[0]);
			editor.getSession().setUseWrapMode(true);
			editor.renderer.setShowGutter(true);
 			editor.getSession().setMode("ace/mode/javascript");
			editor.setFontSize(13);
			editor.setValue(textarea.val(), -1);
			editor.getSession().setValue(textarea.val());
			// textarea.closest('form').submit(function () {
			// 	textarea.val(editor.getSession().getValue());
			// })
		});
	},
	load_ace_editor: function() {
		return new Promise(resolve => {
			frappe.require("assets/js/ace.min.js", resolve);
		});
	}
});