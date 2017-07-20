#!/usr/bin/env python

import bankAccount

class User(self):

    def __init__(self, bal, email, pswrd):        
        self.acct = BankAccount()
		self.acct.setBalance(bal)
		self.email = email
		self.password = pswrd        

	def getUser(self):
		return self

    def charge(self, friend, amt):
        if isFriendinUsers(friend):
			if friend.acct.withdraw(amt):
				return True
		return False

    
    def pay(self, friend, amt):
		if isFriendinUsers(friend):
			friend.acct.deposit(amt)
			return True
		else:
			return False
	

	def isFriendinUsers(friends_email):
		with open('users.json') as json_data:
			d = json.load(json_data)
			for i in range(d["users"].items()):
				if d["users"][i]["email"] == friend.email:
					return True

		return False 

