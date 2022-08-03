const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
  "mongodb+srv://jnaden:Or05Kila@cluster0.gyrolbu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = 'sample_weatherdata';
const weatherCollName = 'data';


module.exports = {}



module.exports.getWeatherByCallLetters = async (callLetters) => {
    const database = client.db(databaseName);
    const weather = database.collection(weatherCollName);

    const query = {callLetters: callLetters};
    let weatherResultCursor = await weather.find(query).limit(10);

    return weatherResultCursor.toArray()
   
}

module.exports.createWeather = async (newObj) => {
    const database = client.db(databaseName);
    const weather = database.collection(weatherCollName);
    if(!newObj.st){

        return {error: "Must enter weather data."}
      }
      const result = await weather.insertOne(newObj);
    
      if(result.acknowledged){
        return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
      } else {
        return {error: "Something went wrong. Please try again."}
      }
    }
    // curl "http://localhost:3001/weather?minAirTemp=5"
    // Should return up to 10 weather report objects where the air temperature was above 5 degrees.
    
    // curl "http://localhost:3001/weather?minAirTemp=5&maxAirTemp=90"
    // Should return up to 10 weather report objects where the air temperature was between 5 and 90 degrees.
    // curl "http://localhost:3001/weather?section=AG1"
    
    // Should return up to 10 weather report objects where one of the sections was "AG1".
    // curl curl "http://localhost:3001/weather?callLetters=VC81&minAirTemp=35"
module.exports.getWeatherReport = async (minAirTemp, maxAirTemp, sections, callLetters) => {
    const database = client.db(databaseName);
    const weather = database.collection(weatherCollName);

    let queryObj = {}
    let minTemp = parseFloat(minAirTemp);
    let maxTemp = parseFloat(maxAirTemp);
    


    if (minTemp = NaN) {
      return {error: "Temp must be a number"}
    } 
    if (maxTemp = NaN) {
      return {error: "Temp must be a number"}
    }

    if (minAirTemp){
      queryObj['airTemperature.value']['$gte'] = minTemp
    }
    if (maxAirTemp){
      queryObj['airTemperature.value']['$lte'] = maxTemp
    }
    if (sections) {
      query.sections = sections;
    }
  
    if (callLetters) {
      query.callLetters = callLetters;
    }
    
    console.log(queryObj)


    // const queryObj = {"callLetters":callLetters, sections: {$in: [sections]},"airTemperature.value": { $lte: (parseFloat(minAirTemp)), $gte: (parseFloat(maxAirTemp)) }};
   
    let weatherReportCursor = await weather.find(queryObj).limit(10)

    return weatherReportCursor.toArray()
  }


