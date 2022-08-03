const express = require("express");
const router = express.Router();
const Model = require("../models/userModel");

router.post("/add", (req, res) => {
  const formdata = req.body;
  console.log(req.body);
  // res.send("request processed in user router");

  // Create Operation
  new Model(formdata)
    .save()
    .then((result) => {
      console.log("data saved!!");
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// to fetch all the users data
router.get("/getall", (req, res) => {
  Model.find({})
    .populate("contacts")
    .then((result) => {
      console.log("user Data fetched");
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
router.get("/getbyemail/:email", (req, res) => {
  Model.findOne({ email: req.params.email })
    .then((result) => {
      console.log("user Data fetched");
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

router.put("/pushupdate/:id", (req, res) => {
  console.log(req.body);
  Model.findByIdAndUpdate(req.params.id, { $push: req.body }, { new: true })
    .populate("contacts")
    .then((result) => {
      console.log("user Data fetched");
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

//managing user and update
router.delete("/delete/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

router.get("/getbyid/:userid", (req, res) => {
  console.log(req.params.userid);
  res.send("Response from getbyid");
});


router.put("/update/:id", (req, res) => {
  const formdata = req.body;

  // to find the entry by id and update with formdata
  Model.findByIdAndUpdate(req.params.id, formdata)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
// for login page
router.post("/authenticate", (req, res) => {
  const formdata = req.body;

  // to find the first entry
  Model.findOne({ email: formdata.email, password: formdata.password })
    .populate("contacts")
    .then((userdata) => {
      if (userdata) {
        console.log("login success");
        res.status(200).json(userdata);
      } else {
        console.log("login failed");
        res.status(300).json({ loginStatus: false });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

module.exports = router;











// // for performing user database operations
// const express = require('express');
// const { db } = require('../models/userModel');
// const router = express.Router();

// // importing user model
// const Model = require('../models/userModel');

// // router.use( cors({ origin : ['http://localhost:3000/login'] }) );


// router.post('/add', (req, res) => {
//     console.log(req.body);
//     // client.db(Model).collection.aggregate([
//     //     { $addFields: { age: { $floor: { $divide: [{ $subtract: [new Date(), "$dob"] }, 31536000000] } } } },
//     // ]);
    
//     // db.user.aggregate([
//     //     { $addFields: { age: { $floor: { $divide: [{ $subtract: [new Date(), "$dob"] }, 31536000000] } } } }
//     // ])
//     // async function
//     new Model(req.body).save()
//     .then((data) => {
//         console.log(data);
//         res.json(data); //default status code is 200 (OK)

//         // Model.collection.aggregate([
//         //     { $addFields: { age: { $floor: { $divide: [{ $subtract: [new Date(), "$dob"] }, 31536000000] } } } }
//         // ])
//         //     .then((data) => {
//         //         console.log(data);
//         //     })
//         //     .catch((err) => {
//         //         console.log(err);
//         //     });
            
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).json(err);
//     });
// })

// router.get('/getall', (req, res) => {
//     Model.find({})
//     .then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json(err);
//     });
// })

// // ':' denotes a parameter
// router.get('/getbyemail/:email', (req, res) => {
//     const email = req.params.email;
//     console.log(email);
//     Model.findOne({email : req.params.email})
//     .then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json(err);
//     });
// })

// router.get('/getbyid/:id', (req, res) => {
    
//     Model.findById(req.params.id)
//     .then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json(err);
//     });
// });

// router.delete('/delete/:id', (req, res) => {
    
//     Model.findByIdAndDelete(req.params.id)
//     .then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json(err);
//     });
// });


// router.put('/update/:id', (req, res) => {
//     Model.findByIdAndUpdate(req.params.id, req.body, {new : true})
//     .then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json(err);
//     });
// });

// router.post('/authenticate', (req, res) => {
//     const formdata = req.body;
//     console.log(formdata);
//     Model.findOne({email : formdata.email, password : formdata.password})
//         .then((result) => {
//             console.log(result);

//             //if condition is true, i.e., user is found
//             if(result){
//                 console.log("Login Successful..!");
//                 res.json(result);
//             }
//             else{
//                 console.log("Login Failed.");
//                 res.status(400).json({status : 'Login Failled.'});
//             }

//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json(err);
//         });

//     });

// module.exports = router;