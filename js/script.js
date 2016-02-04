document.ready

$(function() {
console.log('LINKED!');

var $isStartButtonEnable = true;
var $gameboard = $('.gameboard');
var $row = 2;//max 6
var $col = 2;//max 6
var $lengthOfSq = 105;
var $wrongGuess = 0;
var $correctGuess = 0;

var hideWrong = function(){
  var $wrong= $('.wrong');
  $($wrong).removeClass('wrong');
}//hideWrong()

var nextLevel = function(){
  $('.square').remove();
  if ($row <=5 && $col <= 5){
  $row += 1;
  $col += 1;
  startGame($row,$col);
  }else{
  startGame($row,$col);
};
$wrongGuess = 0;
$correctGuess = 0;
}//nextLevel

var isReadyForNext = function(){
  if($correctGuess === Math.ceil($row*$col/3)){
    return true;
  }else{
    return false;
  }
}//isReadyForNextLevel

var addEventToEachSq = function(){
  var $square = $('.square');
  for(var i = 0; i < $square.length;i++){
    $($square[i]).click(function(event){

      if($(this).hasClass('hidden') && !$(this).hasClass('clicked')){
        $(this).addClass('correct clicked');
        $correctGuess += 1;
      }else if($(this).hasClass('clicked')){
        return;
      }
      else{
        $(this).addClass('wrong');
        window.setTimeout(hideWrong,700);
        $wrongGuess += 1;
      }
      if(isReadyForNext()){
        nextLevel();
      };
    })//click
  }//for
}//addEventToEachSq()

var selectRandomColorSquare = function(){
  var $square = $('.square');
  for (var i = 0; i < Math.ceil($row*$col/3);i++){
    var $randomIndex = Math.floor(Math.random()*$square.length);
      if(!$($square[$randomIndex]).hasClass('selected')){
      var $randomSq = $square[$randomIndex];
      $($randomSq).addClass('selected');
      }else{
      return
      }
  }
}//selectRandomColorSquare()

var hideSelected = function(){
  var $selected = $('.selected');
  for (var i = 0; i < $selected.length;i++){
    $($selected).removeClass('selected');
    $($selected).addClass('hidden');
  }
}//hideSelected()

var startGame = function(r,c){
      // if($isStartButtonEnable === true){
      // $('#button').click(function(){
        $isStartButtonEnable = false;
        $gameboard.width(r * $lengthOfSq).height(c*$lengthOfSq);
        for(var i = 0; i < r * c; i++){
          var $el = $('<div>').addClass('square');
          $gameboard.append($el);
        }//forloop in side buttonclick
        selectRandomColorSquare();

        window.setTimeout(hideSelected,1500);
        window.setTimeout(addEventToEachSq,1500);
    // })//buttonclick



  // }//if (isStartButtonEnable)
}//startGame()

$('.button').click(startGame($row,$col))














})//document.ready
