#!/usr/bin/python

'''
PayPal CLI - starting point of app
Pay or charge people via the Rest API.
Takes in json on stdin and returns results.
'''

import yaml 
import json
import os
import errno
import sys
from payments import pay_or_charge
import random, string

FI = 'inpipe'
FO = "outpipe"

try:
	os.mkfifo(FI)
	os.mkfifo(FO)	
except OSError as oe:
	if oe.errno != errno.EEXIST:
		raise


def parse_args():
		
	while(True): # continuously reopen
		with open(FI) as fi:
			while(True): 
				data = fi.read()
				if len(data) == 0 or data == "!": # delimiter
					break 
				parse_json(data)		
	
	
def parse_json(data):
	jsn      = yaml.safe_load(data)	
	cmd      = jsn["pypal"]["command"]["cmd"]
	sender   = (jsn["pypal"]["command"]["sender_email"]) 
	receiver = (jsn["pypal"]["command"]["receiver_email"])
	amt      = jsn["pypal"]["command"]["args"]["amt"]

	if cmd == "pay":
		retVal = pay_or_charge(sender, receiver, amt)
		send_return_json(retVal, receiver)
	else:
		retVal = pay_or_charge(receiver, sender, amt)
		send_return_json(retVal, sender)			


def send_return_json(retVal, user_getting_money):
	bal = get_users_balance(user_getting_money)
	jsn = {"val": retVal, "user": user_getting_money, "balance": bal} 
	print(jsn)
	fo = open('outpipe', 'w')
	fo.write(str(jsn))

	
def get_users_balance(user):
	with open('users.json', 'r') as usersFile:
		d = json.load(usersFile)
	for i in range(len(d["users"])):
		if d["users"][i]["email"] == user:
			return d["users"][i]["balance"]
	return None


def main():
	try:
		parse_args()
	except KeyboardInterrupt:
		print('')


if __name__ == '__main__':
	main()
