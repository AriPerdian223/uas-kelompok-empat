import supertest from "supertest";
import {
  createManyTestUndangans,
  createTestUndangans,
  createTestUser,
  getTestUndangans,
  removeAllTestUndangans,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/undangans", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestUndangans();
    await removeTestUser();
  });

  it("should can create new undangan", async () => {
    const result = await supertest(web)
      .post("/api/undangans")
      .set("Authorization", "test")
      .send({
        namaPengantin: "test",
        tanggal: "2024-02-01T14:30:00",
        lokasi: "test",
        yourStatus: "MungkinHadir",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body);
    expect(result.body.data).toHaveProperty("undanganId");
    expect(result.body.data.namaPengantin).toBe("test");
    expect(result.body.data.tanggal).toBe("2024-02-01T07:30:00.000Z");
    expect(result.body.data.lokasi).toBe("test");
    expect(result.body.data.yourStatus).toBe("MungkinHadir");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/undangans")
      .set("Authorization", "test")
      .send({
        namaPengantin: "",
        tanggal: "2024-02-01T14:30:00adsa",
        lokasi: "test",
        yourStatus: "MungkinHadir",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/undangans/:undanganId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestUndangans();
  });

  afterEach(async () => {
    await removeAllTestUndangans();
    await removeTestUser();
  });

  it("should can get undangans", async () => {
    const testUndangan = await getTestUndangans();

    const result = await supertest(web)
      .get("/api/undangans/" + testUndangan.undanganId)
      .set("Authorization", "test");

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(200);
    expect(result.body.data.undanganId).toBe(testUndangan.undanganId);
    expect(result.body.data.namaPengantin).toBe(testUndangan.namaPengantin);
    expect(result.body.data.tanggal).toBe(testUndangan.tanggal.toISOString());
    expect(result.body.data.lokasi).toBe(testUndangan.lokasi);
    expect(result.body.data.yourStatus).toBe(testUndangan.yourStatus);
  });

  it("should return 404 if undangan id is not found", async () => {
    const testUndangan = await getTestUndangans();

    const result = await supertest(web)
      .get("/api/undangans/" + (testUndangan.undanganId + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/undangans", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestUndangans();
  });

  afterEach(async () => {
    await removeAllTestUndangans();
    await removeTestUser();
  });

  it("should can update existing undangans", async () => {
    const testUndangan = await getTestUndangans();

    const result = await supertest(web)
      .put("/api/undangans/" + testUndangan.undanganId)
      .set("Authorization", "test")
      .send({
        namaPengantin: "arie",
        tanggal: "01-12-2024",
        lokasi: "cibatu",
        yourStatus: "Hadir",
      });

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(200);
    expect(result.body.data.undanganId).toBe(testUndangan.undanganId);
    expect(result.body.data.namaPengantin).toBe("arie");
    expect(result.body.data.tanggal).toBe("2025-02-01T07:30:00.000Z");
    expect(result.body.data.yourStatus).toBe("Hadir");
  });
  it("should reject if request is invalid", async () => {
    const testUndangan = await getTestUndangans();

    const result = await supertest(web)
      .put("/api/undangans/" + testUndangan.undanganId)
      .set("Authorization", "test")
      .send({
        namaPengantin: "",
        tanggal: "",
        lokasi: "",
        yourStatus: "Hadir",
      });

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(400);
  });

  it("should reject if undangan is not found", async () => {
    const testUndangan = await getTestUndangans();

    const result = await supertest(web)
      .put("/api/undangans/" + (testUndangan.undanganId + 1))
      .set("Authorization", "test")
      .send({
        namaPengantin: "arie",
        tanggal: "2025-02-01T07:30:00.000Z",
        lokasi: "cibolang",
        yourStatus: "Hadir",
      });

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/undangans/:undanganId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestUndangans();
  });

  afterEach(async () => {
    await removeAllTestUndangans();
    await removeTestUser();
  });

  it("should can delete undangan", async () => {
    let testUndangan = await getTestUndangans();
    const result = await supertest(web)
      .delete("/api/undangans/" + testUndangan.undanganId)
      .set("Authorization", "test");

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testUndangan = await getTestUndangans();
    expect(testUndangan).toBeNull();
  });

  it("should reject if undangan is not found", async () => {
    let testUndangan = await getTestUndangans();
    const result = await supertest(web)
      .delete("/api/undangans/" + (testUndangan.undanganId + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/undangans", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestUndangans();
  });

  afterEach(async () => {
    await removeAllTestUndangans();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/undangans")
      .set("Authorization", "test");

    logger.info("-------");
    logger.info(result.error);
    logger.info("-------");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });
});
