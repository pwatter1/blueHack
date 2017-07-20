#!/usr/bin/python

'''
PayPal CLI.
Pay or charge people via the Rest API.
Takes in json on stdin and returns results.
'''

import fcntl
import os
import errno
import sys
from datetime import datetime


FIFO = 'mypipe'
try:
	os.mkfifo(FIFO)
	os.system('echo hello > FIFO')
except OSError as oe:
	if oe.errno != errno.EEXIST:
		raise

# fcntl.fcntl(thePipe, fcntl.F_SETFL, os.O_NONBLOCK)

def parse_args():
	while True: # continuously reopen
		with open(FIFO) as fifo:
			while(True):
				data = fifo.read()
				if len(data) == 0:
					break # empty
				print(data)
				

def main():
	try:
		parse_args()
	except KeyboardInterrupt:
		print('')


if __name__ == '__main__':
	main()
