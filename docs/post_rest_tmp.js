router.post('/admin/restaurant', eatAuth, function(req, res) {
  var newRest = new Rest({
    name: req.body.name,
    address: {
      number: req.body.number,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    },
    hours: {
      mon: req.body.mon,
      tue: req.body.tue,
      wed: req.body.wed,
      thu: req.body.thu,
      fri: req.body.fri,
      sat: req.body.sat,
      sun: req.body.sun,
    },
    phone: req.body.phone,
    genre: req.body.genre,
    price: req.body.price,
    blog_link: req.body.blog_link,
    r_site: req.body.r_site,
    menu_link: req.body.menu_link,
    menu_item: req.body.menu_item,
    photos: req.body.photos,
    other: req.body.other
  });

  newRest.save(function(err, rest) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }

    res.json({msg: 'restaurant saved'});
  });
});
