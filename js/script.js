document.ready

$(function() {
console.log('LINKED!');

var $buttonIsEnable = true;
var $gameboard = $('.gameboard');
var $row = 2;
var $col = 2;
var $lengthOfSq = 105;

var addEventToEachSq = function(){
  var $square = $('.square');
  for(var i = 0; i < $square.length;i++){
    $square[i].click(function(){
      if($square[i].attr('selected') === 'yes'){
        $square[i].addClass('.correct');
      }else{
        $square[i].addClass('.wrong');
      }
    })
  }
}//addEventToEachSq()

var selectRandomColorSquare = function(){
  debugger
  var $square = $('.square');
  console.log($square);
  for (var i = 0; i < Math.ceil($row*$col/3);i++){
    var $randomIndex = Math.floor(Math.random()*$square.length);
    console.log($randomIndex)
    console.log($square[$randomIndex]);
    $square[$randomIndex].addClass('selected');
  }
}//selectRandomColorSquare()


var startGame = function(){
  //if($buttonIsEnable === true){}...
      $('#button').click(function(event){
        $gameboard.width($row * $lengthOfSq).height($col*$lengthOfSq);
        for(var i = 0; i < $row * $col; i++){
          var $el = $('<div>').addClass('square');
          // $el.css('cursor') = pointer;
          $gameboard.append($el);
        }//forloop in side buttonclick
        selectRandomColorSquare();
    })//buttonclick



    // changeYellow();
    // changeWhite();

}//startGame()

var a = new startGame();
a;















})//document.ready
