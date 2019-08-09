const newman = require('newman');

const pathToSignUpCollection = './Smoke.postman_collection.json';

newman.run({
    collection: require(pathToSignUpCollection),
    reporters: ['cli', 'junit', 'htmlextra'],
    reporter: {
        junit: {
            export: './reports/report.xml',
        },
        htmlextra: {
            export: './reports/report.html',
        }
    }
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});
