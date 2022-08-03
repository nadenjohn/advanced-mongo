const request = require("supertest");
const server = require("../server");

//Declare the jest will mock weatherData. Must be before teh require statement
jest.mock("../dataInterface/weather")
const weatherData = require("../dataInterface/weather")

describe("/weather routes", () => {

  beforeEach(() => {

  });

  describe("GET /", () =>{
    it("should return an array on success", async () => {
      weatherData.getWeatherReport.mockResolvedValue([{"_id": "5553a998e4b02cf715119a97",
      "st": "x+48300-044400"}]);

      const res = await request(server).get("/weather");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
   
      //check status code == 200
      //check if result is Array
    });
    it("should return an error message when no results returned", async () => {
      weatherData.getWeatherReport.mockResolvedValue([]);

      const res = await request(server).get("/weather")

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBeDefined();
  });
});

  describe("GET /:callLetters", () =>{
    it("should return all weather reports with callLetters", async () => {
        weatherData.getWeatherByCallLetters.mockResolvedValue([{"_id": "5553a998e4b02cf715119a97",
        "st": "x+48300-044400"}]);
        const res = await request(server).get("/weather/ABCD")

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body.error).not.toBeDefined();
      //check status code == 200
    });
    it("should return a status code of 400 if doesn't exist", async () => {
        weatherData.getWeatherByCallLetters.mockResolvedValue(null);
        const res = await request(server).get("/weather/ABCD")


        expect(res.statusCode).toEqual(400);
    });
  });

  describe("POST /", () =>{
    it("should return the new weather report on success", async () => {
        weatherData.createWeather.mockResolvedValue({message: "success"});

        const res = await request(server).post("/weather")

        expect(res.statusCode).toEqual(200);
        expect(res.body.error).not.toBeDefined();
        expect(res.body.message).toBeDefined();

      //check status code == 200
    });

    it("should return an error message if weather report fails to be created", async () => {
        weatherData.createWeather.mockResolvedValue(null);
        const res = await request(server).post("/weather")

        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toEqual(400);
    });
});
});
