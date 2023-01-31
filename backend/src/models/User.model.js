const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
    },
    role: [
      {
        type: String,
        enum: ['admin', 'seller', 'customer'],
        default: 'customer',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  return next();
});

userSchema.methods.verifyPassword = function (password) {
  const hashedPassword = this.password;

  return bcrypt.compareSync(password, hashedPassword);
};

const User = mongoose.model('user', userSchema);

module.exports = { User };
