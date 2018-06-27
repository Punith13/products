const fs = require('fs'); 

const simulate = (numberOfRecords) => {
    let dbString = '{'

    for(var i =1; i < numberOfRecords ; i++){
        dbString+= `"${i}": {
            "objects": [
                {
                    "category": "Air Conditioners",
                    "title": "Window Seal for Portable Air Conditioner Outlets",
                    "weight": 235,
                    "size": {
                        "width": 10,
                        "length": 10,
                        "height": 10
                    }
                }], 
                "next": ${i + 1} 
            },`
    }

    dbString+= `"${i}": {
        "objects": [
            {
                "category": "Air Conditioners",
                "title": "Window Seal for Portable Air Conditioner Outlets",
                "weight": 235,
                "size": {
                    "width": 10,
                    "length": 10,
                    "height": 10
                }
            }], 
            "next": null
        } }`

    return dbString;
}

const createDBFile = (numberOfRecords, timeToInitialize) => {
    return new Promise(( resolve, reject ) => {
        fs.writeFile('./DB.json', simulate(numberOfRecords), (err) => {
            if (err){
                reject(err)
            }
            setTimeout(() => {
                resolve('file created')
            }, timeToInitialize)
        })
    })
}

module.exports = createDBFile;

