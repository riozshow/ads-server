const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    methods: {
      getSessionData() {
        return {
          _id: this._id,
          login: this.login,
          avatar: this.avatar,
          phone: this.phone,
        };
      },
    },
  }
);

module.exports = mongoose.model('User', userSchema);
