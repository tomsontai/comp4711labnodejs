const express = require('express');

let mod = require('../artistData');

const router = express.Router();

mod.init();

router.get('/', function (req,res) {
   res.redirect(301, '/artists');
});

router.get('/delete/:id', (req,res) => {
   console.log("============Get Delete Artist=================");
   console.log(req.params.id);
   let id = Number(req.params.id);
   mod.delete(id); 

   // console.log(mod.getall());
   res.redirect(301, '/artists');
});

router.post('/delete/:id', (req,res) => {
   console.log("============Get Delete Artist=================");
   console.log(req.params.id);
   let id = Number(req.params.id);
   mod.delete(id); 

   // console.log(mod.getall());
   res.redirect(301, '/artists');
});

router.get('/artists', (req,res) => {
    let Artists = mod.getall();
   //  console.log("All artists:")
    console.log(Artists);
    res.render('artists', {artist: Artists });
});

router.get('/artist/add', (req,res) => {
    res.render('artistadd');
 });

router.post('/artists/search', (req,res) => {
   console.log("==== Search ====");
   let a_name = req.body.name;
   let SearchResult = mod.search(a_name);
   res.render('artists', {artist: SearchResult });
   //res.render('artistadd');
   //res.redirect(301, '/artists');
}); 

// Add to database
 router.post('/artists/add', (req, res) => {
    let a_name = req.body.name;
    let a_about = req.body.about;
    let a_imageURL = req.body.imageURL;

    let count = mod.count;

    let aOject = {
       id: count,
       name: a_name,
       about: a_about,
       imageurl: a_imageURL
    }

    mod.add(aOject);

    //console.log(mod.getall());
    res.redirect(301, '/artists');
  });


 // Defines a custom 404 Page and we use app.use because
// the request didn't match a route (Must follow the routes)
router.use(function(req, res) {
    // Define the content type
    res.type('text/html');
   
    // The default status is 200
    res.status(404);
   
    // Point at the 404.handlebars view
    res.render('partials/404');
});

 module.exports = router;