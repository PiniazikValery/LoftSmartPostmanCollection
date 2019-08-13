const newman = require('newman');

let pathToCollection = undefined;

const collection = require('yargs').argv.collection;

switch (true) {
    case collection === 'smoke':
        pathToCollection = './collections/Smoke.postman_collection.json';
        break;
    case collection === 'critical_path':
        pathToCollection = './collections/CriticalPath.postman_collection.json';
        break;
    default:
        pathToCollection = './collections/Smoke.postman_collection.json';
        break;
}

newman.run({
    collection: require(pathToCollection),
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
