Countries = new Mongo.Collection("countries");

// collection.allow Meteor function defines the permissions that the client needs to write directly to the collection
Countries.allow({
  /**
  userId: wants to update a document doc
  fieldNames: an array of the (top-level) fields. ex) ['name', 'score'].
  modifier: raw Mongo modifier  client executes; ex) {$set: {'name.first': "Alice"}, $inc: {score: 1}}
  */
  update: function (userId, doc, fieldNames, modifier) {
    // Always allow all updates.
    //console.log("userId: " + userId + " wants to update " + fieldNames + " on doc " + doc);
    return true;
  },

  /**
  insert: function (userId, record) {
    // return TRUE if allowed
    return userId && record.owner === userId;
  },m

  remove: function (userId, record) {
    return userId && record.owner === userId;
  }
  */
});
