const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const { id, postId, commentId } = req.params;

  // Check if each ID in the params is valid, if present
  const ids = { id, postId, commentId };
  for (const [key, value] of Object.entries(ids)) {
    if (value && !mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).send({ error: `${key} is not a valid ObjectId` });
    }
  }

  next();
};

module.exports = validateObjectId;
