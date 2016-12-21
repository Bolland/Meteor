PlayersList = new Mongo.Collection('players');

//  console.log("Both client + server printout");


PlayersList.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

PlayersList.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});