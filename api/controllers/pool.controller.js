import Pool from '../models/pool.model.js';
import { errorHandler } from '../utils/error.js';

export const createPool = async (req, res, next) => {
  try {
    const newPool = await Pool.create(req.body);
    return res.status(201).json(newPool);
  } catch (error) {
    next(error);
  }
};

export const deletePool = async (req, res, next) => {
  const existingPool = await Pool.findById(req.params.id);

  if (!existingPool) {
    return next(errorHandler(404, 'Pool not found!'));
  }

  if (req.user.id !== existingPool.userRef) {
    return next(errorHandler(401, 'You can only delete your own pools!'));
  }

  try {
    await Pool.findByIdAndDelete(req.params.id);
    res.status(200).json('Pool has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updatePool = async (req, res, next) => {
  const existingPool = await Pool.findById(req.params.id);
  if (!existingPool) {
    return next(errorHandler(404, 'Pool not found!'));
  }
  if (req.user.id !== existingPool.userRef) {
    return next(errorHandler(401, 'You can only update your own pools!'));
  }

  try {
    const updatedPool = await Pool.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPool);
  } catch (error) {
    next(error);
  }
};

export const getPool = async (req, res, next) => {
  try {
    const existingPool = await Pool.findById(req.params.id);
    if (!existingPool) {
      return next(errorHandler(404, 'Pool not found!'));
    }
    res.status(200).json(existingPool);
  } catch (error) {
    next(error);
  }
};

export const getPools = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const pools = await Pool.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(pools);
  } catch (error) {
    next(error);
  }
};
