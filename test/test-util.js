import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestUndangans = async () => {
  await prismaClient.undangan.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUndangans = async () => {
  await prismaClient.undangan.create({
    data: {
      username: "test",
      namaPengantin: "test",
      tanggal: "2024-02-01T07:30:00.000Z",
      lokasi: "test",
      yourStatus: "MungkinHadir",
    },
  });
};

export const createManyTestUndangans = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.undangan.create({
      data: {
        username: "test",
        namaPengantin: "test",
        tanggal: "2024-02-01T07:30:00.000Z",
        lokasi: "test",
        yourStatus: "MungkinHadir",
      },
    });
  }
};

export const getTestUndangans = async () => {
  return prismaClient.undangan.findFirst({
    where: {
      username: "test",
      namaPengantin: "test",
    },
  });
};
