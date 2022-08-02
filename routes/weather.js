const { Router } = require("express");

const router = Router();

const weatherData = require('../dataInterface/weather');



router.get("/:callLetters", async (req, res, next)=> {
    const result = await weatherData.getWeatherByCallLetters(req.params.callLetters)
    console.log(result.length)
    if (result.length === 0) {
        return {error:"Something went wrong. Please try again." }
    } else {
        res.status(200).send(result)
    }
})

module.exports = router;
  