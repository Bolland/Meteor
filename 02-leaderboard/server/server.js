
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

//  console.log(PlayersList.find().fetch())


	Meteor.methods({
		'insertPlayerData':function(name,score){
			var currentUserId = Meteor.userId();
			PlayersList.insert({
				name:name,
				score:score,
				createdBy: currentUserId
			})
		},
		'removePlayerData':function(id){
			var currentUserId = Meteor.userId();
			PlayersList.remove({_id: id, createdBy:currentUserId});
		},
		'modifyPlayerScore':function(selectedPlayer,scoreValue){
			var currentUserId = Meteor.userId();			
			PlayersList.update({_id:selectedPlayer, createdBy:currentUserId},{$inc: {score:scoreValue}})
		}
	});


//  console.log("Server printout");
}