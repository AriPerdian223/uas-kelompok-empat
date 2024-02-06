import undanganServices from "../service/undangan-services.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await undanganServices.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const undanganId = req.params.undanganId;
    const result = await undanganServices.get(user, undanganId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const undanganId = req.params.undanganId;
    const request = req.body;
    request.undanganId = undanganId;

    const result = await undanganServices.update(user, request);

    if (!result) {
      // Jika tidak ada data yang ditemukan untuk diupdate
      return res.status(404).json({
        error: 'Undangan tidak ditemukan',
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const undanganId = req.params.undanganId;

    await undanganServices.remove(user, undanganId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      namaPengantin: req.query.namaPengantin,
      lokasi: req.query.lokasi,
      yourStatus: req.query.yourStatus,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await undanganServices.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
