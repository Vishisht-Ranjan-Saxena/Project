const express = require('express');
const router = express.Router();

const Model = require('../models/chatModel');

router.post('/add', (req, res) => {
    console.log(req.body);
    
    // async function
    new Model(req.body).save()
    .then((data) => {
        console.log(data);
        res.json(data); //default status code is 200 (OK)
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
})

router.get('/getall', (req, res) => {
    Model.find({})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
})

router.get('/getchat', (req, res) => {
    // const message = req.body;
    Model.findById(req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;
