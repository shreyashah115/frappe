frappe.ui.form.ControlCodeEditor = frappe.ui.form.ControlCode.extend({
	horizontal: false,
	html_element: "input",
	input_type: "text",
	make_input: function() {
		this.has_input = true;
		var me = this;
		this.load_ace_editor().then(() => {
			me.make_editor();
		});
	},
	make_editor: function() {
		this.ace_container = $('<div>').appendTo(this.input_area);
		this.ace_container.addClass('panel panel-default');
		this.ace_container.addClass('control-code')
		this.editor = ace.edit(this.ace_container[0]);
		this.editor.getSession().setUseWrapMode(true);
		this.editor.renderer.setShowGutter(true);
		// this.editor.setAutoScrollEditorIntoView(true);
		this.editor.getSession().setMode("ace/mode/javascript");
		this.editor.setFontSize(13);
		this.bind_events();
	},
	bind_events: function() {
		this.editor.on('change', () => {
			const input_value = this.get_input_value();
			this.parse_validate_and_set_in_model(input_value);
		});
	},
	get_input_value() {
		return this.editor ? this.editor.getSession().getValue() : '';
	},
	set_input: function(value) {
		var me = this;
		if(value) {
			me.editor.getSession().setValue(value);
		}
		else {
			me.editor.getSession().setValue("");
		}
		// var me = this;

		// this.last_value = this.value;
		// this.value = value;
	},
	// parse: function(value) {

	// },
	set_formatted_input: function(value) {
		this.$input && this.$input.val(this.format_for_input(value));
	},
	load_ace_editor: function() {
		return new Promise(resolve => {
			frappe.require("assets/js/ace.min.js", resolve);
		});
	}
});