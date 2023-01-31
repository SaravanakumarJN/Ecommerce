const { User } = require('../models/User.model');
const { errorTemplate } = require('../utilities/errorTemplate');
const { encode } = require('../utilities/jwt');

const registerUser = async (req, res) => {
  let { email, name, password } = req.body;

  try {
    let existingCheck = await User.findOne({ email }).lean().exec();

    if (existingCheck) {
      return errorTemplate(res, 400, 'User already exists');
    }

    let payload = { email, name, password };
    await User.create(payload);

    return res.status(200).json({
      error: false,
      message: 'Registered Successfully',
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();

    if (!user) {
      return errorTemplate(res, 400, "User doesn't exists. Please register");
    }

    let passwordVerification = await user.verifyPassword(password);

    if (!passwordVerification) {
      return errorTemplate(res, 400, 'Incorrect password');
    }

    let { _id, role } = user;
    let token = await encode({ _id, role });

    let userDetails = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.status(200).json({
      error: false,
      data: {
        token,
        userDetails,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = { registerUser, loginUser };
