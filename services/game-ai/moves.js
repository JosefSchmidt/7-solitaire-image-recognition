


const drawFromDeck = function(){
    try{
    var action = {action: 'draw'};
    
    return action; 
    } catch(error){
      console.log(error)
    }
} 


module.exports = {
    drawFromDeck
  };