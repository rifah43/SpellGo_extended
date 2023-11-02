const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  algorithm_name: {
    type: String,
    required: true,
  },
  level_no: {
    type: Number,
    required: true,
  },
  is_complete: {
    type: Boolean,
    default: false,
  },
});

levelSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const highestLevelNo = await this.constructor.findOne({}, 'level_no')
        .sort({ level_no: -1 })
        .lean()
        .exec();

      if (highestLevelNo) {
        this.level_no = highestLevelNo.level_no + 1;
      } else {
        this.level_no = 1;
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Level = mongoose.model('Level', levelSchema);

module.exports = Level;
