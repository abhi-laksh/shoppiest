import moment from "moment-timezone";

export const formatDate = (date) => moment(date).tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss")

export const arrayToObject = (array)=>{
    const newObject=Object.assign({}, ...array.map(element => { 
        return { [`${element.basePath}`]: {...element} } 
      }))
      delete(newObject["null"])
      return newObject
}




export function flatten(array, result = []) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]['childrens']) {
            flatten(array[i]['childrens'], result)
        }
        result.push(array[i]);
    }
    return result;
}