import fs from 'fs'

const sortCuisine = () => {
    const file = fs.readFileSync('./cuisineListRaw.json')
    const data = JSON.parse(file)

    var resultList = []

    resultList.push(...data.zomato, ...data.swiggy, ...data.dineout, ...data.eazydiner);
    const results = resultList.map(element => {
        return element.trim();
      });
      
    var cuisines =  new Set(results)
    var arr = Array.from(cuisines)

    const finalList = new Array()
    for(var i=0; i<arr.length; i++) {
        var obj = {}
        obj['cuisine_id'] = i+1
        obj['cuisine_name'] = arr[i]
        obj['mapped_cuisines'] = [arr[i]]

        finalList.push(obj)
    }

    fs.writeFileSync('./cuisineListv1.json', JSON.stringify(finalList), function writeJSON(err) {
        if (err) return console.log(err);
    })

}

sortCuisine()