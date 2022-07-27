import fs from 'fs'

const checkLocality = () => {
    const file = fs.readFileSync('./localityMapData.json')
    const data = JSON.parse(file)

    var zomatoArr = []
    var swiggyArr = []
    var dineoutArr = []
    var eazydinerArr = []

    for (const a of data.localities.zomato) {zomatoArr.push(a.id)}
    for (const a of data.localities.swiggy) {swiggyArr.push(a.id)}
    for (const a of data.localities.dineout) {dineoutArr.push(...a.localities)}
    for (const a of data.localities.eazydiner) {eazydinerArr.push(a.id)}
    
    const file1 = fs.readFileSync('./tempData.json')
    const data1 = JSON.parse(file1)

    var zomatoArr2 = [], swiggyArr2 = [], dineoutArr2 = [], eazydinerArr2 = []
    
    for (const a of data1) { zomatoArr2.push(...a.z_locality_name)}
    for (const a of data1) { swiggyArr2.push(...a.s_locality_name)}
    for (const a of data1) { dineoutArr2.push(...a.d_locality_name)}
    for (const a of data1) { eazydinerArr2.push(...a.e_locality_name)}

    /*
    console.log(zomatoArr2)
    console.log(swiggyArr2)
    console.log(dineoutArr2)
    console.log(eazydinerArr2)
    */

    for (var a of dineoutArr) {
        var bool = false
        for( var b of dineoutArr2) {
            if (a == b) {bool = true}
        }
        if(bool == false) {console.log(a)}
    }    
}

checkLocality()