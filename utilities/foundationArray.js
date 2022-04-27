module.exports = function ({foundation}) {
let newFoundation = [];
  
foundation.forEach((element) => {
    if (isNotExist(element)){
      newFoundation.push(element)
    }
    function isNotExist(object){
      return newFoundation.every(element => JSON.stringify(element) !== JSON.stringify(object) )
    }
  })

  return newFoundation;
}