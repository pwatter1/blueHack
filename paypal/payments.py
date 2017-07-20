#!/usr/bin/env python

import json

def pay_or_charge(sender_email, receiver_email, amt):
	found_user = False

	with open('users.json', 'r') as usersFile:
		d = json.load(usersFile)
		usersFile.close()

	for i in range(len(d["users"])):
		if d["users"][i]["email"] == receiver_email:
			found_user = True

	if found_user != True:
		return found_user

	for i in range(len(d["users"])):
		if d["users"][i]["email"] == receiver_email:
			d["users"][i]["balance"] += amt
		if d["users"][i]["email"] == sender_email:
			if (d["users"][i]["balance"] - amt) > 0:
				d["users"][i]["balance"] -= amt
			else:
				return False

	# update balance in users.json (rewrite)
	usersFile = open('users.json', 'w')
	usersFile.write(json.dumps(d))
	usersFile.close()
 
	return found_user
