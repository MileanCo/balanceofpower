if (Meteor.isServer) {
  // Write your package code here!
  var master = JSON.parse(Assets.getText('data/json/master.json'));

  DataGenerator = {
      master: master,
  };
}
