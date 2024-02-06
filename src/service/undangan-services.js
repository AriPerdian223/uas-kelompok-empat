import { validate } from "../validation/validation.js";
import {
  createUndanganValidation,
  getUndanganValidation,
  searchUndanganValidation,
  updateUndanganValidation,
} from "../validation/undangan-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const undangan = validate(createUndanganValidation, request);
  undangan.username = user.username;

  return prismaClient.undangan.create({
    data: undangan,
    select: {
      undanganId: true,
      namaPengantin: true,
      tanggal: true,
      lokasi: true,
      yourStatus: true,
    },
  });
};

const get = async (user, undanganId) => {
  undanganId = validate(getUndanganValidation, undanganId);

  const undangan = await prismaClient.undangan.findFirst({
    where: {
      username: user.username,
      undanganId: undanganId,
    },
    select: {
      undanganId: true,
      namaPengantin: true,
      tanggal: true,
      lokasi: true,
      yourStatus: true,
    },
  });

  if (!undangan) {
    throw new ResponseError(404, "undangan is not found");
  }

  return undangan;
};

const update = async (user, request) => {
  const undangan = validate(updateUndanganValidation, request);

  const totalUndanganInDatabase = await prismaClient.undangan.count({
    where: {
      username: user.username,
      undanganId: parseInt(request.undanganId),
    },
  });

  if (totalUndanganInDatabase !== 1) {
    throw new ResponseError(404, "undangan is not found");
  }

  return prismaClient.undangan.update({
    where: {
      undanganId: parseInt(request.undanganId),
    },
    data: {
      namaPengantin: undangan.namaPengantin,
      tanggal: undangan.tanggal,
      lokasi: undangan.lokasi,
      yourStatus: undangan.yourStatus,
    },
    select: {
      undanganId: true,
      namaPengantin: true,
      tanggal: true,
      lokasi: true,
      yourStatus: true,
    },
  });
};

const remove = async (user, undanganId) => {
  undanganId = validate(getUndanganValidation, undanganId);

  const totalInDatabase = await prismaClient.undangan.count({
    where: {
      username: user.username,
      undanganId: undanganId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "undangan is not found");
  }

  return prismaClient.undangan.delete({
    where: {
      undanganId: undanganId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchUndanganValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.namaPengantin) {
    filters.push({
      namaPengantin: {
        contains: request.namaPengantin,
      },
    });
  }

  if (request.lokasi) {
    filters.push({
      lokasi: {
        contains: request.lokasi,
      },
    });
  }

  if (request.yourStatus) {
    filters.push({
      yourStatus: {
        contains: request.yourStatus,
      },
    });
  }

  const undangan = await prismaClient.undangan.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.undangan.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: undangan,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
