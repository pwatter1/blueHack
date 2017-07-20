import paypalrestsdk
import random
import string

sender_batch_id = ''.join(random.choice(string.ascii_uppercase) for i in range(12))

paypalrestsdk.configure({"mode":"sandbox",
						"client_id": "AXfz9xfbNbSdvCEwVRBbpHyzT2hFS9W1JyXetRw_59iNAmwe2S_WSbhUKdAjjHIYb8nUAMC-UVxp3tTW",
						"client_secret":"EIns228oAFJiA_wm5hp102d8Q0oth_8jPQFhAd78C61xcB4Jp5lJnbf0OeLd7yYcJcyaBBamYCCbZHP1"})

payout = paypalrestsdk.Payout({
    "sender_batch_header": {
        "sender_batch_id": sender_batch_id,
        "email_subject": "You have a payment"
    },
    "items": [
        {
            "recipient_type": "EMAIL",
            "amount": {
                "value": 0.99,
                "currency": "USD"
            },
            "receiver": "mushaffarkhan@gmail.com",
            "note": "Thank you.",
            "sender_item_id": "item_1"
        	}
    	]
	})

if payout.create(sync_mode=True):
   	print("payout[%s] created successfully" % (payout.batch_header.payout_batch_id))
else:
   	print(payout.error)
