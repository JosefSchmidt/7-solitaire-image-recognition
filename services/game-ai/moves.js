const foundationFunktion = require("../../utilities/foundationArray")


/*module.exports.drawFromDeck = function(){
    try{
    var action = {action: 'draw'};
    
    return action; 
    } catch(error){
      console.log(error)
    }
} */

module.exports.moveFromStackToFoundation = function({foundation, stack}){
let newFoundation = foundationFunktion({foundation});
let newStack = [];

stack.map((stack, index) =>{
  return console.log(index + " " + JSON.stringify(stack));
})

console.log(stack)

stack.forEach((element) => {
  if (isNotExist(element)){
    newStack.push(element)
  }
  function isNotExist(object){
    return newStack.every(element => JSON.stringify(element) !== JSON.stringify(object) )
  }
})
let topCard = newStack.map(e => {
  return e.topCard.class;
})

if(topCard[0].substring(0,1) == 'A'){
  console.log("true")
}
console.log(newFoundation);
console.log(newStack);

 
}

