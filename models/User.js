const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  googleID: {
    type: String
  },
  githubId: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  bookstack: [
    {
      title: {
        type: String
      },
      author: {
        type: String
      },
      budget: {
        type: String
      }
    }
  ]
});

// Create collection and add schema
module.exports = User = mongoose.model("users", UserSchema);
