const request = require("supertest");

const server = require("./server.js");

describe("server.js yoo", () => {
  describe("get /games", () => {
    it("should return status 200 when data exists in the db", () => {
      return request(server)
        .get("/games")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return an empty array", () => {
      const Games = [];
      return request(server)
        .get("/games")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it("should return data in json view", () => {
      return request(server)
        .get("/games")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });
  });

  describe("the post endpoint", () => {
    it("should post body if name and genre are provided", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "rocket league", genre: "competitive" });

      expect(res.status).toBe(201);
    });

    it("should return status 422 if name isnt provided", async () => {
      const res = await request(server)
        .post("/games")
        .send({ name: "", genre: "strategy" });

      expect(res.status).toBe(422);
    });

    it("should return status 422 if genre isnt provided", async () => {
      const res = await request(server)
        .post("/games")
        .send({ name: "Windwaker", genre: "" });

      expect(res.status).toBe(422);
    });
  });
});
