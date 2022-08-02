const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
  "mongodb+srv://jnaden:Or05Kila@cluster0.gyrolbu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = 'sample_weatherdata';
const weatherCollName = 'data';

module.exports = {}

module.exports.getWeatherReport = ansyc ()

module.exports.getWeatherByCallLetters = async (callLetters) => {
    const database = client.db(databaseName);
    const weather = database.collection(weatherCollName);

    const query = {callLetters: callLetters};
    let weatherResultCursor = await weather.find(query).limit(10);

    return weatherResultCursor.toArray()
   
}

