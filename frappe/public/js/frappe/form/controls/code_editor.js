frappe.ui.form.ControlCodeEditor = frappe.ui.form.ControlCode.extend({
	make_input: function() {
		this._super();
		this.has_input = true;
		$(this.input_area).find("textarea")
			.attr('name','data-edit')
		this.load_ace_editor().then(() => {
			this.make_editor();
		});
	},
	make_editor: function() {
		$('textarea[name="data-edit"]').each(function () {
			if (this.editor) return;
			this.textarea = $(this);
			this.ace_container = $('<div>', {
				position: 'absolute',
				width: this.textarea.width(),
				height: this.textarea.height(),
				'class': this.textarea.attr('class')
			}).insertBefore(this.textarea);
			this.textarea.css('display', 'none');
			this.editor = ace.edit(this.ace_container[0]);
			this.editor.getSession().setUseWrapMode(true);
			this.editor.renderer.setShowGutter(true);
			this.editor.setAutoScrollEditorIntoView(true);
			this.editor.getSession().setMode("ace/mode/javascript");
			this.editor.setFontSize(13);
			this.editor.getSession().setValue(this.textarea.val());
			this.bind_change_event();
		});
	},
	bind_change_event() {
		this.editor.getSession().on('change', function() {
			console.log('hehehhehehehe');
		});
	},
	load_ace_editor: function() {
		return new Promise(resolve => {
			frappe.require("assets/js/ace.min.js", resolve);
		});
	}
});