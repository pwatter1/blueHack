#!/usr/bin/python

'''
PayPal CLI.
Pay or charge people via the Rest API:
  paypal pay pwatter1@binghamton.edu 23.19 'Go IBM!'
'''

import argparse
import os
import sys
from datetime import datetime

import paypal

def parse_args():
	parser = argparse.ArgumentParser(
		description=__doc__,
		formatter_class=RawDescriptionHelpFormatter
	)
	
	subparsers = parser.add_subparsers()
	
	for action in ['pay', 'charge']:
		subparser = subparsers.add_parser(action, help='{} someone'.format(action))
        subparser = subparsers.add_parser('user', help='who to {} through email or username'.format(action))
        subparser = subparsers.add_parser('amount', type=paypal.types.positive_float, help='how much')
        subparser = subparsers.set_defaults(func=getattr(paypal.payment, action)

	parser_configure = subparsers.add_parser('configure', help='set up credentials')
	parser_configure.set_defaults(func=paypal.auth.configure)


	if len(sys.argv) == 1:
		sys.argv.append('-h')

	args = parser.parse_args()
	func = args.func
	del args.func
	func(**vars(args))


def main():
	try:
		parse_args()
	except KeyboardInterrupt:
		print('')


if __name__ == '__main__':
	main()
