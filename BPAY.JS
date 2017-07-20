/**
 * Approve item
 * @param {org.acme.mynetwork.Approve} approve - the item approval
 * @transaction
 */

function checkApproval(participantRegistry){
  	foreach participantRegistry.getAll()

function approve(approve){
	approve.approver.lastApproved = approve.item;
  	return getParticipantRegistry('org.acme.mynetwork.Roomate').then(function(participantRegistry) {
	  var allParticipants = participantRegistry.getAll();
	  var approvalCount = 0;
	  var canPayCount = 0;
      participantRegistry.getAll().forEach(function(participant){
	    if (approve.participant.approved == true)	{
			approve.participant.approved = false;
			approvalCount += 1;
			if (approve.participant.balance >= approve.item.price)	{
				canPayCount += 1;
			}
		}
	  })
	  if (approvalCount == allParticipants.count() canPayCount == allParticipants.count())	{
  		return participantRegistry.update(approve.approver);
		}
	  else	{
		emit(//PLEASE PUT AN EVENT HERE);
	  }
    });
}



/**
 * Approve item
 * @param {org.acme.mynetwork.Approve} approve - the item approval
 * @transaction
 */

function approve(approve){
	approve.approver.lastApproved = approve.item;
  
  
  
  	return getParticipantRegistry('org.acme.mynetwork.Roomate').then(function (participantRegistry) {
      	participantRegistry.getAll().then(function(list){
          	approve.approver.balance = list.length;
        	return participantRegistry.update(approve.approver);  
            
        })
  		return participantRegistry.update(approve.approver);  
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