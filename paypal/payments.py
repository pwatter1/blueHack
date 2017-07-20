#!/usr/bin/env python

import json

def pay(sender_email, receiver_email, amt):
	tmp = False
	with open('users.json', 'r') as dfile:
		data = json.load(dfile)
		jsn.close()

	for i in range(len(d["users"])):
		if d["users"][i]["email"] == receiver_email:
			d["users"][i]["balance"] += amt
			tmp = True

	if tmp != True:
		return tmp

	jsn = open('users.json', 'w')
	jsn.write(json.dumps(d))
	jsn.close()

	
def charge(sender_email, receiver_email, amt):
	with open('users.json') as jsn:
		d = json.load(jsn)
        for i in range(len(d["users"])):
                if d["users"][i]["email"] == receiver_email:
                    if (d["users"][i]["balance"] - amt) > 0:
						d["users"][i]["balance"] = amt
						return True
	return False
 
