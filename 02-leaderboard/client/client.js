if (Meteor.isClient) {

//	Meteor.subscribe('thePlayers');


  Template.body.events({
   "change .filter-female": function (event){
      Session.set("filterFemale", event.target.checked);
	  console.log("filterFemale: " + Session.get("filterFemale")); 
    }
  });
 

Template.leaderboardList.onCreated( () => {
  Template.instance().subscribe( 'thePlayers' );  
});

	Template.leaderboardList.helpers({
		player : function(){
			if(Session.get("filterFemale")){
				return PlayersList.find({gender:"female"},{sort:{score:-1,name:1}})
			} else{
				return PlayersList.find({},{sort:{score: -1,name:1}})
			}
		},
		getLastClickedPlayerName : function(){
			if (Session.get("LastClickedPlayerName")){
				return Session.get("LastClickedPlayerName");	
			} else {
				return "Not clicked yet";
			}
		},
		'selectedClass': function(){
			
			if(Session.get("LastClickedPlayerId") == this._id){
				return "selected";
			}
			//return the string "selected" to set the CSS class
		},
		'showSelectedPlayer': function(){
			var selectedPlayer = Session.get("LastClickedPlayerId");
			return PlayersList.findOne(selectedPlayer);
		}
	})

	Template.leaderboardList.events({
		'click .li-player': function(){
			console.log("clicked on a li-player element");
			Session.set("LastClickedPlayerName",this.name);
			Session.set("LastClickedPlayerId",this._id);
		},
		'mouseover .li-player':function(){
			console.log("Hovered over a li-player element")
		},
		'dblclick .li-player':function(){
			console.log("doubleclicked a li-player element")
		},
		'focus .textfield':function(){
			console.log("focussed Textfield");
		},
		'blur .textfield':function(){
			console.log("blured Textfield");
		},
		'click .increment': function(){
			console.log("add 5 point to player: "+this._id);
			var selectedPlayer = Session.get('LastClickedPlayerId');

			Meteor.call('modifyPlayerScore',selectedPlayer,5);
			//old: PlayersList.update(selectedPlayer,{$inc: {score:5}});
		},
		'click .decrement': function(){
			console.log("subtract 5 point from player: "+this._id);
			var selectedPlayer = Session.get('LastClickedPlayerId');
			
			Meteor.call('modifyPlayerScore',selectedPlayer,-5);
			//old: PlayersList.update(selectedPlayer,{$inc: {score:-5}});
		},
		'click .remove': function(){

			if(confirm('Are you sure youw want to delete'+Session.get("LastClickedPlayerName")+'?')){
				var selectedPlayerName = Session.get("LastClickedPlayerName");
				var selectedPlayerId = Session.get("LastClickedPlayerId");
				
				console.log("Remove player " + selectedPlayerName);
				Meteor.call('removePlayerData', selectedPlayerId);
				
				//old (insecure): PlayersList.remove(Session.get("LastClickedPlayerId"));
			}
		},
	});

	Template.addPlayerForm.events({
		'submit form' : function (event){ //"event", "evt", or "e"
			event.preventDefault(); //disable bwoser redirect after submit
			
			//get input data
			var playerName = event.target.playerName;
			var playerScore = event.target.playerScore;

			//get currenlty logged in user
			var currentUserId = Meteor.userId();

			Meteor.call('insertPlayerData',playerName.value,parseInt(playerScore.value,10));

			//set input fields to defaultValue
			event.target.playerName.value= event.target.playerName.defaultValue;
			event.target.playerScore.value= event.target.playerScore.defaultValue;



			//Console
			console.log("++++++++ Form submitted ++++++++");
			console.log ("Content: "+playerName.value+" "+playerScore);
			console.log("Event object:");
			console.log(event);

	

			/** former insert method - not working with removed insercure package 
			PlayersList.insert({
				name: playerName.value,
				score: parseInt(playerScore.value,10),
				createdBy: currentUserId
			});**/
		}
	});


}//Meteor.isClient
