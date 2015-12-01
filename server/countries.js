
// Publish functions should go only in the server so the client won't have access to them.
// define what to publish from the server to the client

// arg0: name of the subscription
// arg1: function that defines what will be returned in the subscription
//Meteor.publish("records", function () {
  // Mongo Query
//  return Records.find({});
//});

Meteor.publish("countries", function () {

  // Find all records
  return Countries.find(
    {

    }
  );
});
