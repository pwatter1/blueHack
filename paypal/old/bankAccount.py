#!/usr/bin/env python

class BankAccount(self):

    def __init__(self):
		self.balance = 0.0

    def setBalance(self, amt):
        self.balance = amt

    def getBalance(self):
        return self.balance        

    def withdraw(self, amt):
        if(self.balance - amt != 0 and amt > 0):
            self.balance -= amt
            return True
        else:
            return False            

    def deposit(self, amt):
        self.balance += amt

