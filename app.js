const express = require('express');

const app = express();

app.get('/numbers', (req, res, next) => {
    
    /*var nums = req.body.nums;

    var length = req.body.length;
    
    var average = req.body.average;
*/
    res.status(200).json({
        numbers : 'test'
    });
});

module.exports = app;
