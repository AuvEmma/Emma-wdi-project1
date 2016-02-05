document.ready

$(function() {
console.log('LINKED!');

var $isStartButtonEnable = true;
var $gameboard = $('.gameboard');
var $row = 2;//max 5
var $col = 2;//max x
var $lengthOfSq = 105;
var $wrongGuess = 0;
var $correctGuess = 0;
var $score1 = 0;
var $score2 = 0;
var $currentPlayer = 1;
var $life = 3;


var hideWrong = function(){
  var $wrong= $('.wrong');
  $($wrong).removeClass('wrong');
}//hideWrong()

var compareScore = function(){
  if($score1 > $score2){
    alert('Player 1 Wins!');
    $('.square').remove();
    $isStartButtonEnable = true;
    $row = 2;
    $col = 2;
  }else if ($score2 > $score1){
    alert('Player 2 Wins!');
    $('.square').remove();
    $isStartButtonEnable = true;
    $row = 2;
    $col = 2;
  }else{
    alert('Tie!');
    $('.square').remove();
    $isStartButtonEnable = true;
    $row = 2;
    $col = 2;
  }
}//compareScore()


var nextLevel = function(){
  $('.square').remove();
  if ($row <5 && $col <5){
  $row += 1;
  $col += 1;
  console.log('row'+$row+':'+'col'+$col);
  startGame($row,$col);
  }else if(($row ===5 && $col ===5)){
  $row+=4;
  startGame($row,$col);
  alert('You are very good at this game! Show me your potential!');
  }else{
  startGame($row,$col);
  };
  $wrongGuess = 0;
  $correctGuess = 0;
}//nextLevel

var isReadyForNext = function(){

  if($correctGuess === Math.ceil($row*$col/3)){
        if ($currentPlayer === 1){
          $score1 += 1;
        $(".player1").text('Player 1 Score: '+$score1);
        }else{
          $score2 += 1;
        $(".player2").text('Player 2 Score: '+$score2);
        }
    return true;
  }else{
    return false;
  }
}//isReadyForNextLevel


var isReadyToSwitchPlayer = function(){
  if ($currentPlayer === 1 && $wrongGuess === 3){
    return true;
  }
  else if($currentPlayer === 2 && $wrongGuess === 3){
    compareScore();
  }
  else{
    return false;
  }
}//isReadyToSwitchPlayer()

var addEventToEachSq = function(){
  var $square = $('.square');
  for(var i = 0; i < $square.length;i++){
    $($square[i]).click(function(event){

      if($(this).hasClass('hidden') && !$(this).hasClass('clicked')){
        $(this).addClass('correct clicked');
        $correctGuess += 1;
        console.log('correct'+$correctGuess);
      }else if($(this).hasClass('clicked')){
        return
      }else{
        $(this).addClass('wrong');
        window.setTimeout(hideWrong,700);
        $wrongGuess += 1;
        $life -= 1;
        $('.wrongGuess').text('Wrong Guesses: '+$life);
        console.log('wrong'+$wrongGuess);
        if(isReadyToSwitchPlayer()){
          $('.hidden').addClass('selected');
          alert('Player '+ $currentPlayer + ' Game Over');
          $currentPlayer = 2;
          $('.square').remove();
          $life = 3;
          $row = 2;
          $col = 2;
          $wrongGuess = 0;
          $correctGuess = 0;
          startGame($row,$col);
          // window.setTimeout(hideSelected(),1000);
        }
      }
      if(isReadyForNext()){
        nextLevel();
        $life = 3;
        $('.wrongGuess').text('Wrong Guesses: '+$life);
      }
    })//click
  }//for
}//addEventToEachSq()

var selectRandomColorSquare = function(){
  var $square = $('.square');
  for (var i = 0; i < Math.ceil($row*$col/3);i++){
    var $randomIndex = Math.floor(Math.random()*$square.length);
    var $randomSq = $square[$randomIndex];
    $($randomSq).addClass('selected');
    $square = jQuery.grep($square,function(a){
                      return a !== $randomSq;});
  };//for
}//selectRandomColorSquare()

var hideSelected = function(){
  var $selected = $('.selected');
  for (var i = 0; i < $selected.length;i++){
    $($selected).removeClass('selected');
    $($selected).addClass('hidden');
  }
}//hideSelected()

var showSelected = function(){
  var $hidden = $('.hidden');
  for (var i = 0; i < $hidden.length;i++){
    $($hidden).removeClass('hidden').addClass('selected');
  }
}
var startGame = function(r,c){
        $isStartButtonEnable = false;
        $gameboard.width(r * $lengthOfSq).height(c*$lengthOfSq);
        for(var i = 0; i < r * c; i++){
          var $el = $('<div>').addClass('square');
          $gameboard.append($el);
        }//forloop in side buttonclick
        selectRandomColorSquare();
        window.setTimeout(hideSelected,1500);
        window.setTimeout(addEventToEachSq,1500);
}//startGame()

$('#button').on('click',function(e){
  if($isStartButtonEnable === true){
  startGame($row,$col);
  }else{
    return;
  }
});//button Click

$('#cheat').on('click', function(e){
  showSelected();
  window.setTimeout(hideSelected,1500);
})

})//document.ready

//yeah!!!!!!!!!
