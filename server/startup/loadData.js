Meteor.startup(function (api) {


  //if (Countries.find().count() === 0) {
    // Clear DB
    Countries.remove({}) // remove every post
    // ALWAYS reload records
    console.log("Loading Records for Countries !");
    // data-generator-json package
    // insert EACH record
    _.each(DataGenerator.master, function (master) {
      Countries.insert(master);
    });
  //}

});
