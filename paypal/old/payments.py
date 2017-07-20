#!/usr/bin/python

import paypalrestsdk
from paypalrestsdk import Payout
import random
import string

def configure():
	paypalrestsdk.configure({"mode":"sandbox",
						"client_id": "AXfz9xfbNbSdvCEwVRBbpHyzT2hFS9W1JyXetRw_59iNAmwe2S_WSbhUKdAjjHIYb8nUAMC-UVxp3tTW",
						"client_secret":"EIns228oAFJiA_wm5hp102d8Q0oth_8jPQFhAd78C61xcB4Jp5lJnbf0OeLd7yYcJcyaBBamYCCbZHP1"})
	return


def pay(amt, note, receiver_email, sender_email):	
	configure()
	sender_batch_id = ''.join(random.choice(string.ascii_uppercase) for x in range(12))
	jsn = {
		"sender_batch_header": {
            	"sender_batch_id": "",
				"sender": "",
            	"email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": "",
                    "currency": "USD"
                },
                "receiver": "",
                "note": "",
                "sender_item_id": "item_1"
            }    
		]
	} 
	jsn["sender_batch_header"]["sender"] = sender_email
	jsn["sender_batch_header"]["sender_batch_id"] = sender_batch_id
	jsn["items"][0]["amount"]["value"] = float(amt)
	jsn["items"][0]["receiver"] = receiver_email
	jsn["items"][0]["note"] = note

	payout = Payout(jsn)

	if payout.create(sync_mode=True):
		return True
	else:
		print(payout.error)
		return False


def charge(amt, note, receiver_email, sender_email):
	configure()
	jsn = ({
        "merchant_info": {
            "email": "",  # must be paypal sandbox email account
            "first_name": "",
            "last_name": "",
            "business_name": "Watters Fin",
            "phone": {
                "country_code": "001",
                "national_number": "5032141716"
            },
            "address": {
                "line1": "1234 Main St.",
                "city": "Portland",
                "state": "OR",
                "postal_code": "97217",
                "country_code": "US"
            }
        },    
        "billing_info": [{"email": ""}],
        "items": [
            {
                "name": "Sutures",
                "quantity": 1,
                "unit_price": {
                    "currency": "USD",
                    "value": 0
                }
            }
        ],
        "note": "",
        "payment_term": {
            "term_type": "NET_45"
        },
        "shipping_info": {
            "first_name": "Sally",
            "last_name": "Patient",
            "business_name": "Not applicable",
            "phone": {
                "country_code": "001",
                "national_number": "5039871234"
            },
            "address": {
                "line1": "1234 Broad St.",
                "city": "Portland",
                "state": "OR",
                "postal_code": "97216",
                "country_code": "US"
            }
        },
        "shipping_cost": {
            "amount": {
                "currency": "USD",
                "value": 0
            }
        }
    })

	jsn["merchant_info"]["email"] = sender_email
	jsn["billing_info"][0]["email"] = receiver_email
	jsn["items"][0]["unit_price"]["value"] = float(amt)
	jsn["note"] = note

	invoice = Invoice(jsn)

	if invoice.create() and invoice.send():
		return True
		# print("Invoice[%s] created and sent successfully" % (invoice.id))
	else:
		return False
	    # print(invoice.error)

