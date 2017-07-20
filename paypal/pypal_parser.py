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
from datetime import datetime
# from payments import charge, pay

FIFO = 'mypipe'

try:
	os.mkfifo(FIFO)	
except OSError as oe:
	if oe.errno != errno.EEXIST:
		raise

def parse_args():
	while(True): # continuously reopen
		with open(FIFO) as fifo:
			while(True): 
				data = fifo.read()
				if len(data) == 0: # or delimiter
					break 
				parse_json(data)		
	
	
def parse_json(data):
	jsn = yaml.safe_load(data)	
	cmd = jsn["pypal"]["command"]["cmd"]
	se = jsn["pypal"]["command"]["sender_email"]
	re = jsn["pypal"]["command"]["receiver_email"]
	note = jsn["pypal"]["command"]["args"]["note"]
	amt = jsn["pypal"]["command"]["args"]["amt"]

	if cmd == "pay":
		# pay(amt, note, re, se)
		print("success")	
		pass
	else:
		# charge(amt, note, re, se)
		pass

def main():
	try:
		parse_args()
	except KeyboardInterrupt:
		print('')


if __name__ == '__main__':
	main()
