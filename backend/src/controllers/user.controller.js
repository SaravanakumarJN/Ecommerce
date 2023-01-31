const { User } = require('../models/User.model');
const { errorTemplate } = require('../utilities/errorTemplate');

const getUserDetails = async (req, res) => {
  try {
    let userDetails = await User.findOne({
      _id: req.user_id,
    })
      .select({ name: true, email: true, role: true, _id: false })
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: userDetails,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = { getUserDetails };
