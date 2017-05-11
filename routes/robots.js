var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

var baseUrl
if (true == false) {
  baseUrl = "http://localhost:3000"
} else {
  baseUrl = "https://southernct-443-robots-api.herokuapp.com"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = `${baseUrl}/api/robots`

  fetch(url).then(function(response) {
    response.json().then(function(json){
      console.log("LISTING ROBOTS", json.length)
      res.render('robots/index', {robots: json, title: "Robots List"});
    })
  })
});

/* ADD NEW ROBOT */

router.get('/robots/new', function(req, res, next) {
  const url = `${baseUrl}/api/robots`

  res.render('robots/new', {
    title: "New Robot",
    formAction: url,
    formMethod: "POST"
  })
})

/* SHOW ROBOT */

router.get('/robots/:id', function(req, res, next) {
  const robotId = req.params.id
  const url = `${baseUrl}/api/robots/${robotId}`

  fetch(url).then(function(response) {
    response.json().then(function(json){
      console.log("SHOWING ROBOT", json)
      res.render('robots/show', {
        robot: json,
        title: `Robot - ${robotId}`,
        requestUrl: url
      })
    })
  })
})


/* EDIT ROBOT */

router.get('/robots/:id/edit', function(req, res, next) {
  const robotId = req.params.id
  const url = `${baseUrl}/api/robots/${robotId}`

  fetch(url).then(function(response) {
    response.json().then(function(json){
      console.log("POPULATING FORM WITH ROBOT", json)
      res.render('robots/edit', {
        robot: json,
        title: `Edit Robot - ${robotId}`,
        requestUrl: url,
        requestMethod: "PUT"
      })
    })
  })
})


module.exports = router