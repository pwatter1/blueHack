#!/usr/bin/python

'''
PayPal CLI - starting point of app
Pay or charge people via the Rest API.
Takes in json on stdin and returns results.
'''

import fcntl
import os
import errno
import sys
from datetime import datetime
from payments import charge, pay


FIFO = 'mypipe'

try:
	os.mkfifo(FIFO)
	os.system('echo hello > FIFO')
except OSError as oe:
	if oe.errno != errno.EEXIST:
		raise

def parse_args():
	while True: # continuously reopen
		json = ''
		with open(FIFO) as fifo:
			while(True): 
				data = fifo.read()
				if len(data) == 0: # or delimiter
					break 
				json += data
		
		parse_json(json)			
	
	
def parse_json(json):
	cmd = json["paypal"]["command"]["cmd"]	
	sender_email = json["paypal"]["command"]["sender_email"]
	receiver_email = json["paypal"]["command"]["receiver_email"]
	note = json["paypal"]["command"]["args"]["note"]
	amt = json["paypal"]["command"]["args"]["amt"]

	if cmd == "pay":
		pay(amt, note, receiver_email, sender_email)
	else:
		charge(amt, note, receiver_email, sender_email)


def main():
	try:
		parse_args()
	except KeyboardInterrupt:
		print('')


if __name__ == '__main__':
	main()
