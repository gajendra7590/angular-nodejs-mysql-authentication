const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var randomString = require('random-string');
var moment = require('moment');


const config = require('../config/app');
const commonModel = require('../models/commonModel');

function randomKey() {
    return randomString({ length: 48 });
}

function authMiddleWare(req, res, next) {
    if ((typeof (req.headers.authorization) != 'undefined') && (req.headers.authorization != '')) {
        let token = (req.headers.authorization).split(" ")[1];
        if (token != '') {
            jwt.verify(token, config.API_KEY, function (err, result) {
                if (err) {
                    res.status(401).json({ status: false, status_code: 401, message: 'Invalid token' });
                } else { next(); }
            });
        } else {
            res.status(401).json({ status: false, status_code: 401, message: 'UnAuthorised request' });
        }
    } else {
        res.status(401).json({ status: false, status_code: 401, message: 'UnAuthorised request' });
    }
}


//User Sign In Method
router.get('/all', async (req, res) => {
    let q = "SELECT * FROM events WHERE event_type = '0' AND event_status='1'";
    var result = await commonModel.customQuery(q);
    res.status(200).json(result); 
     
});

//User Sign In Method
router.get('/special',authMiddleWare ,async (req, res) => {
    let q = "SELECT * FROM events WHERE event_type = '1' AND event_status='1'";
    var result = await commonModel.customQuery(q);
    res.status(200).json(result); 
});
  

module.exports = router;