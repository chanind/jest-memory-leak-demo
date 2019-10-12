const request = require("supertest");
const app = require("../src/app");

describe("/", () => {
  it("says hello", async () => {
    const res = await request(app).get("/");
    expect(res.text).toBe("Hello!");
  });
});

describe("/ip-to-loc", () => {
  it("returns info about the users' location based on IP address", async () => {
    const res = await request(app)
      .get("/ip-to-loc")
      .set("X-Forwarded-For", "101.110.64.6");
    expect(res.body.country).toBe("CN");
  });

  it("returns an error if no info was found", async () => {
    const res = await request(app)
      .get("/ip-to-loc")
      .set("X-Forwarded-For", "127.0.0.1");
    expect(res.body.error).toBe("no ip found");
  });
});

describe("/word-freq/:word", () => {
  it("returns the word frequency of a word", async () => {
    const res = await request(app).get("/word-freq/dog");
    expect(res.body.word).toBe("dog");
    expect(res.body.frequency).toBe(1);
  });

  it("returns 0 for words that aren't found", async () => {
    const res = await request(app).get("/word-freq/fishfldshfs");
    expect(res.body.word).toBe("fishfldshfs");
    expect(res.body.frequency).toBe(0);
  });
});
