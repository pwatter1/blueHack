#!/usr/bin/python

from paypalrestsdk import Payout, ResourceNotFound


def singlePayout(amt, note, receiver_email):
	
	sender_batch_id = ''.join(random.choice(string.ascii_uppercase) for i in range(12))

	payout = Payout({
        "sender_batch_header": {
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
            	"receiver": receiver_email,
            	"note": note,
            	"sender_item_id": "item_1"
        	}
    	]
	})

	if payout.create(sync_mode=True):
    	print("payout[%s] created successfully" % (payout.batch_header.payout_batch_id))
	else:
    	print(payout.error)


