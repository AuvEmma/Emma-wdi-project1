document.ready

$(function() {
console.log('LINKED!');

var $isStartButtonEnable = true;
var $gameboard = $('.gameboard');
var $row = 2;
var $col = 2;
var $lengthOfSq = 105;
var $wrongGuess = 0;

var hideWrong = function(){
  var $wrong= $('.wrong');
  $($wrong).removeClass('wrong');
}//hideWrong()

var addEventToEachSq = function(){
  var $square = $('.square');
  for(var i = 0; i < $square.length;i++){
    $($square[i]).click(function(event){
      if($(this).hasClass('hidden')){
        $(this).addClass('correct');
      }else{
        $(this).addClass('wrong');
        window.setTimeout(hideWrong,700);
        $wrongGuess += 1;
      }
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

var startGame = function(){
      // if($isStartButtonEnable === true){
      $('#button').click(function(){
        $isStartButtonEnable = false;
        $gameboard.width($row * $lengthOfSq).height($col*$lengthOfSq);
        for(var i = 0; i < $row * $col; i++){
          var $el = $('<div>').addClass('square');
          // $el.css('cursor') = pointer;
          $gameboard.append($el);
        }//forloop in side buttonclick
        selectRandomColorSquare();

        window.setTimeout(hideSelected,1500);
        window.setTimeout(addEventToEachSq,1500);
    })//buttonclick



  // }//if (isStartButtonEnable)
}//startGame()

var a = new startGame();
a;















})//document.ready
