Countries = new Mongo.Collection("countries");

// collection.allow Meteor function defines the permissions that the client needs to write directly to the collection
Countries.allow({

  /**
  insert: function (userId, record) {
    // return TRUE if allowed
    return userId && record.owner === userId;
  },m
  // fieldNames is an array of the (top-level) fields. ex) ['name', 'score'].
  // modifier is raw Mongo modifier  client executes; ex) {$set: {'name.first': "Alice"}, $inc: {score: 1}}
  update: function (userId, record, fields, modifier) {
    return userId && record.owner === userId;
  },
  remove: function (userId, record) {
    return userId && record.owner === userId;
  }
  */
});
