var express = require('express')
var router = express.Router()
var fetch = require('node-fetch')

var baseUrl
if (true == false) {
  baseUrl = "http://localhost:3003"
} else {
  baseUrl = "https://southernct-443-robots-api.herokuapp.com"
}

/* LIST */

router.get('/robots', function(req, res, next) {
  const endpointUrl = `${baseUrl}/api/robots`

  fetch(endpointUrl).then(function(response) {
    response.json().then(function(json){
      console.log("LISTING ROBOTS", json.length)
      res.render('robots/index', {robots: json, title: "Robots List"});
    })
  })
});

/* NEW */

router.get('/robots/new', function(req, res, next) {
  const endpointUrl = `${baseUrl}/api/robots`

  res.render('robots/new', {
    title: "New Robot",
    formAction: endpointUrl,
    formMethod: "POST"
  })
})

/* SHOW */

router.get('/robots/:id', function(req, res, next) {
  const robotId = req.params.id
  const endpointUrl = `${baseUrl}/api/robots/${robotId}`

  fetch(endpointUrl).then(function(response) {
    response.json().then(function(json){
      console.log("SHOWING ROBOT", json)
      res.render('robots/show', {
        robot: json,
        title: `Robot ${robotId}`,
        requestUrl: endpointUrl
      })
    })
  })
})

/* EDIT */

router.get('/robots/:id/edit', function(req, res, next) {
  const robotId = req.params.id
  const endpointUrl = `${baseUrl}/api/robots/${robotId}`

  fetch(endpointUrl).then(function(response) {
    response.json().then(function(json){
      console.log("POPULATING FORM WITH ROBOT", json)
      res.render('robots/edit', {
        robot: json,
        title: `Edit Robot ${robotId}`,
        requestUrl: endpointUrl,
        requestMethod: "PUT"
      })
    })
  })
})

module.exports = router