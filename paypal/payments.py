#!/usr/bin/python

from  paypalrestsdk import Invoice, Payout
from types import positive_float
import json

def pay(amt, note, receiver_email, sender_email): # PayPal Payout
    _send_payout_json(amt, note, receiver_email, sender_email)


def charge(amt, note, receiver_email, sender_email): # PayPal Invoice
	amt = -amt
	_send_invoice_json(amt, note, receiver_email, sender_email)


def _send_payout_json(amt, note, receiver_email, sender_email):
    ''' if amt is a list of size one, single payout, else multiple '''

    jsn =
        {"sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": amt,
                    "currency": "USD"
                },
                "receiver": who_to_pay_email,
                "note": note,
                "sender_item_id": "item_1"
            }
        ]} 

    jsn_lst = [jsn] * len(amts)

    for i in range(len(amts)):
        sender_batch_id = ''.join(random.choice(string.ascii_uppercase) for x in range(12))
        jsn_lst[i]["sender_batch_header"] = sender_batch_id
        jsn_lst[i]["items"][0]["amount"]["value"] = amt
        jsn_lst[i]["items"][0]["receiver"] = who_to_pay_email
        jsn_lst[i]["items"][0]["note"] = note

        payout = Payout(jst_lst[i])

        if payout.create(sync_mode=True):
            print("payout[%s] created successfully" % (payout.batch_header.payout_batch_id))
        else:
            print(payout.error)


def _send_invoice_json(amt, note, who_to_charge_email):
	invoice = Invoice({
        "merchant_info": {
            "email": "patrickwatters1995@hotmail.com",  # must be paypal sandbox email account
            "first_name": "Patrick",
            "last_name": "Watters",
            "business_name": "Watters Financial",
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
        "billing_info": [{"email": who_to_charge_email}],
        "items": [
            {
                "name": "Sutures",
                "quantity": 1,
                "unit_price": {
                    "currency": "USD",
                    "value": amt
                }
            }
        ],
        "note": note,
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

    if invoice.create() and invoice.send():
        print("Invoice[%s] created and sent successfully" % (invoice.id))
    else:
        print(invoice.error)




