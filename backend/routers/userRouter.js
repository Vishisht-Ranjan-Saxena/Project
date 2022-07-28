// for performing user database operations
const express = require('express');
const { db } = require('../models/userModel');
const router = express.Router();

// importing user model
const Model = require('../models/userModel');

// router.use( cors({ origin : ['http://localhost:3000/login'] }) );


router.post('/add', (req, res) => {
    console.log(req.body);
    // client.db(Model).collection.aggregate([
    //     { $addFields: { age: { $floor: { $divide: [{ $subtract: [new Date(), "$dob"] }, 31536000000] } } } },
    // ]);
    
    // db.user.aggregate([
    //     { $addFields: { age: { $floor: { $divide: [{ $subtract: [new Date(), "$dob"] }, 31536000000] } } } }
    // ])
    // async function
    new Model(req.body).save()
    .then((data) => {
        console.log(data);
        res.json(data); //default status code is 200 (OK)

        // Model.collection.aggregate([
        //     { $addFields: { age: { $floor: { $divide: [{ $subtract: [new Date(), "$dob"] }, 31536000000] } } } }
        // ])
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
            
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

// ':' denotes a parameter
router.get('/getbyemail/:email', (req, res) => {
    const email = req.params.email;
    console.log(email);
    Model.findOne({email : req.params.email})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
})

router.get('/getbyid/:id', (req, res) => {
    
    Model.findById(req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.delete('/delete/:id', (req, res) => {
    
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});


router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new : true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.post('/authenticate', (req, res) => {
    const formdata = req.body;
    console.log(formdata);
    Model.findOne({email : formdata.email, password : formdata.password})
        .then((result) => {
            console.log(result);

            //if condition is true, i.e., user is found
            if(result){
                console.log("Login Successful..!");
                res.json(result);
            }
            else{
                console.log("Login Failed.");
                res.status(400).json({status : 'Login Failled.'});
            }

        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });

    });

module.exports = router;