const User = require('./../models/User.model');
const { errorTemplate } = require('../utilities/errorTemplate');

const authorization = (roles) => {
  return async (req, res, next) => {
    try {
      if (!roles || roles.length == 0) {
        return next();
      }

      const user_id = await req.user_id;

      const userCheck = await User.findOne({
        _id: user_id,
        roles: { $in: roles },
      })
        .lean()
        .exec();

      if (!userCheck) {
        return errorTemplate(res, 401, 'Unauthorised user');
      }

      return next();
    } catch (error) {
      return errorTemplate(res, 400, error.message);
    }
  };
};

module.exports = authorization;
