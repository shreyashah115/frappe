# -*- coding: utf-8 -*-
# Copyright (c) 2017, Frappe Technologies and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class IfThisThenThat(Document):
	pass

@frappe.whitelist()

def get_values(doctype):
	value = frappe.db.get_value("If This Then That", {"doctype_name": doctype}, "name")
	ifchild = frappe.db.get_value("If", {"parent": value}, ["fieldname", "value"], as_dict=True)
	thenchild = frappe.db.get_values("Then", {"parent": value}, ["fieldname", "value"], as_dict=True)

	return {"if": ifchild, "then": thenchild}