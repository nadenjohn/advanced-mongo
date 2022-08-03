const { Router } = require("express");
const bodyParser = require('body-parser');


const router = Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const weatherData = require('../dataInterface/weather');



router.get("/:callLetters", async (req, res)=> {
    const result = await weatherData.getWeatherByCallLetters(req.params.callLetters)

    if (result) {
        res.status(200).send(result)
    } else {
        res.status(400).send({error: "something went wrong, try again"})
      
    }
})

router.get("/", async (req, res, next)=> {
    console.log("hi")
    console.log(req.query)

    const minAirTemp = req.query.minAirTemp
    const maxAirTemp = req.query.maxAirTemp
    const sections = req.query.sections
    const callLetters = req.query.callLetters
    
    
    let result = await weatherData.getWeatherReport(minAirTemp, maxAirTemp, sections, callLetters)
  
  if (result === []){
    res.status(400).send({error: "not found"})
  }
    res.status(200).send(result)
})

router.post("/", async (req, res, next) =>{

    let result = await weatherData.createWeather(req.body)

    if (result){
        res.status(200).send(result)
    } else {
        res.status(400).send({error: "not created"});
    }

})

module.exports = router;