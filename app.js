const express = require('express');

const app = express();

function switchWith (numbers, diffrence, outputSet) {
    var i, j;
    for(i = 0; i < outputSet.length; i++){
        for(j = 0; j < numbers.length; j++){
            if(outputSet[i] < parseInt(numbers[j]) && parseInt(numbers[j]) - outputSet[i] <= diffrence){
                diffrence -= parseInt(numbers[j]) - outputSet[i];
                outputSet[i] = parseInt(numbers[j]);
            }
            if(diffrence == 0){
                return outputSet;
            }
        }
    }
    return null;
}

app.get('/numbers', (req, res, next) => {
    var len = req.query.length, 
        numbersSet = req.query.numbersset, 
        avg = req.query.average;
     
    if(!Array.isArray(numbersSet)){
        res.status(400).json({
            numbers : "bad request : array is invalid input"
        });
    }
    len = parseInt(len);
    if(isNaN(avg)){
        res.status(400).json({
            numbers : "bad request : averag is invalid input"
        });
    }
    var i = 0, sum = 0, target = parseInt(len * avg);
    var output = new Array();
    
    while (output.length < len){
	    if(sum + parseInt(numbersSet[i]) <= target){
	        output.push(parseInt(numbersSet[i]));
	        sum += parseInt(numbersSet[i++]);
	    }
        if(i == numbersSet.length)
	        i = 0;
    }
    
    if(sum != (len * avg)){
	    output = switchWith(numbersSet, target - sum, output);
    }
    if(output == null){ 
        res.status(200).json({
            numbers : "can't decide numbers"
        });
    }
    res.status(200).json({
        numbers : output
    });
});

module.exports = app;
