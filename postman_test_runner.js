const newman = require('newman');

newman.run({
    collection: require('./Sign_Up.postman_collection.json'),
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});