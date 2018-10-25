frappe.ui.form.ControlCodeEditor = frappe.ui.form.ControlCode.extend({
	make_input: function() {
		this._super();
		this.has_input = true;
		this.load_ace_editor().then(() => {
			this.make_editor();
		});
	},
	make_editor: function() {
		var me = this;
		this.textarea = this.$input;
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
		// this.bind_events();
	},
	// bind_events: function() {
	// 	this.editor.on('change', frappe.utils.debounce((delta, oldDelta, source) => {
	// 		// if (!this.is_quill_dirty(source)) return;
	// 		// const input_value = this.get_input_value();
	// 		// this.parse_validate_and_set_in_model(input_value);
	// 	}, 300));
	// },

	parse: function(value){
		if(!this.editor) return;
		this.editor.getSession().setValue(value);
		if(this.editor.getSession().getValue() != value) {
			this.frm.set_value("script", this.editor.getSession().getValue());
			return;
		}
	},
	load_ace_editor: function() {
		return new Promise(resolve => {
			frappe.require("assets/js/ace.min.js", resolve);
		});
	}
});