


from __future__ import unicode_literals, print_function
import json
import frappe

def check_color(dt):
	"if the user does not have a _color column, then it creates one"
	try:
		frappe.db.sql("select `_color` from `tab%s` limit 1" % dt)
	except Exception as e:
		if e.args[0] == 1054:
			DocColor(dt).setup()

class DocColor:
	"""Color for a particular doctype"""
	def __init__(self, dt):
		self.dt = dt

	def get_color_field(self):
		"""returns color_field property"""
		return frappe.db.get_value('DocType', self.dt, 'color_field')

	# def get_tags(self, dn):
	# 	"""returns tag for a particular item"""
	# 	return (frappe.db.get_value(self.dt, dn, '_color', ignore=1) or '').strip()

	# def add(self, dn, tag):
	# 	"""add a new user tag"""
	# 	tl = self.get_tags(dn).split(',')
	# 	if not tag in tl:
	# 		tl.append(tag)
			# self.update(dn, tl)

	# def remove(self, dn, tag):
	# 	"""remove a user tag"""
	# 	tl = self.get_tags(dn).split(',')
	# 	self.update(dn, filter(lambda x:x.lower()!=tag.lower(), tl))

	# def remove_all(self, dn):
	# 	"""remove all user tags (call before delete)"""
	# 	self.update(dn, [])

	# def update(self, dn, tl):
	# 	"""updates the _color column in the table"""

	# 	if not tl:
	# 		tags = ''
	# 	else:
	# 		tl = list(set(filter(lambda x: x, tl)))
	# 		tags = ',' + ','.join(tl)
	# 	try:
	# 		frappe.db.sql("update `tab%s` set _user_tags=%s where name=%s" % \
	# 			(self.dt,'%s','%s'), (tags , dn))
	# 	except Exception as e:
	# 		if e.args[0]==1054:
	# 			if not tags:
	# 				# no tags, nothing to do
	# 				return

	# 			self.setup()
	# 			self.update(dn, tl)
	# 		else: raise

	def setup(self):
		"""adds the _color column if not exists"""
		from frappe.model.db_schema import add_column
		add_column(self.dt, "_color", "Data")
