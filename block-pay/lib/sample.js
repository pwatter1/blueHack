/**
 * Approve item
 * @param {org.acme.mynetwork.Approve} approve - the item approval
 * @transaction
 */

function approve(approve){
  	if(approve.approver.balance<approve.item.Price)
    {
      return;
    }
	approve.approver.lastApproved = approve.item;
  
  
  
  	return getParticipantRegistry('org.acme.mynetwork.Roomate').then(function (participantRegistry) {
      
      return participantRegistry.getAll().then(function(list){
        var currentItem = approve.item.purchaseName;
        var approved = true;
        for(i=0;i<list.length;i++){
     		if(list[i].roomateId == approve.approver.roomateId){
              list[i].lastApproved=approve.item;
            }
          	if(list[i].lastApproved.purchaseName != currentItem){
            	 approved = false;
            }
          
        }
        if(approved){
          for(i=0;i<list.length;i++){
            list[i].lastApproved.purchaseName=""+i;
            if(list[i].roomateId == approve.item.owner.roomateId){
             	list[i].balance+=(approve.item.Price-(approve.item.Price/list.length));
            }
            else{
    	        list[i].balance-=approve.item.Price/list.length;
            }
          }
        }
      	return  participantRegistry.updateAll(list);  
      })
    });
}



/**
 * Add funds
 * @param {org.acme.mynetwork.AddFunds} addfunds - the item approval
 * @transaction
 */
function addFunds(funds){
	funds.roomate.balance += funds.amount;
  	return getParticipantRegistry('org.acme.mynetwork.Roomate').then(function (participantRegistry) {
      
  		return participantRegistry.update(funds.roomate);
    });
}

/**
 * Remove funds
 * @param {org.acme.mynetwork.RemoveFunds} removefunds - the item approval
 * @transaction
 */
function RemoveFunds(funds){
	funds.roomate.balance -= funds.amount;
  	return getParticipantRegistry('org.acme.mynetwork.Roomate').then(function (participantRegistry) {
      
  		return participantRegistry.update(funds.roomate);
    });
}


/**
 * new item
 * @param {org.acme.mynetwork.newItem} newitem - the item approval
 * @transaction
 */
function newItem(item){
  return getAssetRegistry('org.acme.mynetwork.Lastapproved').then(function (assetRegistry) {
	return assetRegistry.getAll().then(function (lastitem) {
      	lastitem[0].last=item.item.purchaseName;
  		return assetRegistry.updateAll(lastitem);
    });
  })
}

/**
 * test difference
 * @param {org.acme.mynetwork.qualifier} qualifier - the item approval
 * @transaction
 */
function qualifier(){
	
}
