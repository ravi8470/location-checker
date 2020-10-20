const express = require('express');
const City = require('../models/City');
const router = express.Router();


router.get("/delete-city", async (req, res) => {
  await City.deleteOne();
  res.redirect('/');
});

router.post('/save-city', async (req, res) => {
  let data = req.body.city.split(';');
  await City.create({
    name: data[0],
    location: {
      type: 'Point',
      coordinates: [+data[2], +data[1]]
    }
  });
  res.redirect('/');
});

router.post('/check-city', async (req, res) => {
  let count = await City.estimatedDocumentCount();
  if (count === 0) {
    var string = encodeURIComponent('true');
    return res.redirect('/?noCity=' + string);
  }
  let data = req.body.city.split(';');
  let coordinates = [+data[2], +data[1]];
  let newDoc = await City.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates },
        spherical: true,
        distanceField: "distance",
        distanceMultiplier: 0.001
      }
    }
  ]);
  let doc = newDoc[0];
  res.render('pages/result', {
    defaultCity: doc.name,
    myCity: data[0],
    distance: doc.distance.toFixed(2) + ' km',
    isInside: (doc.distance <= 100)
  });
})

module.exports = router;