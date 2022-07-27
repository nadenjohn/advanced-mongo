const request = require("supertest");
const server = require("../server");

//Declare the jest will mock movieData. Must be before teh require statement
jest.mock("../dataInterface/movies")
const movieData = require("../dataInterface/movies")

describe("/movies routes", () => {

  beforeEach(() => {

  });

  describe("GET /", () =>{
    it("should return an array on success", async () => {
      movieData.getAll.mockResolvedValue([{_id:"890", title:"One Day"}]);

      const res = await request(server).get("/movies");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
   
      //check status code == 200
      //check if result is Array
    });
    it("should return an error message on error", async () => {
      movieData.getAll.mockResolvedValue(null);

      const res = await request(server).get("/movies")

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
  });
});

  describe("GET /:id", () =>{
    it("should return a single movie on success", async () => {
      expect(false).toEqual(true);
      //check status code == 200
  
    });
    it("should return a status code of 400 if doesn't exist", async () => {
      expect(false).toEqual(true);
    });
  });

  describe("GET /:id/comments", () =>{
    it("should return an array on success", async () => {
      movieData.getAllComments.mockResolvedValue([{_id: 500, name: "Me"}]);

      const res = await request(server).get("/movies/:id/comments");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
   

    });
    it("should return an error message on error", async () => {
      movieData.getAllComments.mockResolvedValue(null);

      const res = await request(server).get("/movies/:id/comments")

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
  });
});

  describe("POST /", () =>{
    it("should return the new movie on success", async () => {
      expect(false).toEqual(true);
      //check status code == 200
    });
    it("should return an error message if there is no title", async () => {
      expect(false).toEqual(true);
    });
    it("should return an error message if movie fails to be created", async () => {
      expect(false).toEqual(true);
    });
  });

  describe("PUT /:id", () =>{
    it("should return the updated movie on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return error if movie fails to update", async () => {
      expect(false).toEqual(true);
    });
  });

  describe("DELETE /:id", () =>{
    it("should return a message on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return error if fails to delete", async () => {
      expect(false).toEqual(true);
    });
  });
  describe("delete /:movie_id/comments/:id", () =>{
    it("should return an resturn success message on request on success", async () => {
      movieData.deleteCommentById.mockResolvedValue({message: "Deleted"});

      const res = await request(server).delete("/:movie_id/comments/:id");

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBeDefined();

      expect(res.body.error).not.toBeDefined();
   
      //check status code == 200
      //check if result is Array
    });
    it("should return an error message on error", async () => {
      movieData.getAll.mockResolvedValue({error: "not deleted"});

      const res = await request(server).delete("/:movie_id/comments/:id")

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBeDefined();
  });
});
});