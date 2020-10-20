const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: (value) => new Promise((resolve, reject) => {
        City.countDocuments({ 'location.coordinates': value }, function (err, count) {
          if (count) reject(new Error('Coordinates already exist'));
          resolve();
        });
      })
    }
  }
}, {
  timestamps: false,
  versionKey: false
});

CitySchema.index({ location: '2dsphere' });
const City = mongoose.model("City", CitySchema);

module.exports = City;