const { UserInputError } = require("apollo-server");

const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(
      _,
      { username, email, password, confirmPassword },
      context,
      info
    ) {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is already taken");
      }

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = res.getSignedJwtToken();

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("User not found");
      }

      const matchPassword = await user.comparePassword(password);
      if (!matchPassword) {
        throw new UserInputError("Wrong Credentials");
      }

      const token = user.getSignedJwtToken();

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
