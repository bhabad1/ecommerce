const request = require("supertest");

const app = require("../app");

describe("GET /api/customer/", () => {
  it("should return all customers", async () => {
    // expect(2).toBe(1 + 1);
    const res = await request(app).get("/api/customer/");
    expect(res.statusCode).toBe(200);
  });
});
