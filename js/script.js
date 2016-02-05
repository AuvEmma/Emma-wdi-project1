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
var $score = 0
var hideWrong = function(){
  var $wrong= $('.wrong');
  $($wrong).removeClass('wrong');
}//hideWrong()

var nextLevel = function(){
  $('.square').remove();
  if ($row <=5 && $col <= 5){
  $row += 1;
  $col += 1;
  console.log('row'+$row+':'+'col'+$col);
  startGame($row,$col);
  }else{
  startGame($row,$col);
};
$wrongGuess = 0;
$correctGuess = 0;
}//nextLevel

var isReadyForNext = function(){
  // var $boo = false;
  // var $square = $('.square');
  // for(var i = 0; i < $square.length;i++){
  //   if($($square[i]).hasClass('hidden') && $($square[i]).hasClass('correct')){
  //     $boo = true
  //   }else{
  //     $boo = false;
  //   }
  //   return $boo;
  // }
  console.log('correctGuess'+$correctGuess);
  console.log('mathceil'+ Math.ceil($row*$col/3));
  if($correctGuess === Math.ceil($row*$col/3)){
    $score += 1;
    $('.score').text('Player 1 Score: '+$score);
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
        console.log('correct'+$correctGuess);
      }else if($(this).hasClass('clicked')){
        return
      }else{
        $(this).addClass('wrong');
        window.setTimeout(hideWrong,700);
        $wrongGuess += 1;
        console.log('wrong'+$wrongGuess);
      }
      if(isReadyForNext()){
        nextLevel();
      }else if($wrongGuess === 2){
        $('hidden').addClass('yellow');
        window.setTimeout($('hidden').removeClass('yellow'),1000)
      };
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
                      return a !== $randomSq;
                    });
};//for
}//selectRandomColorSquare()


//   for (var i = 0; i < Math.ceil($row*$col/3);i++){
//     var $randomIndex = Math.floor(Math.random()*$square.length);
//       if(!$($square[$randomIndex]).hasClass('selected')){
//       var $randomSq = $square[$randomIndex];
//       $($randomSq).addClass('selected');
//       }else{
//         var $anotherIndex = $randomIndex + 1;
//         if(!$($square[$anotherIndex]).hasClass('selected')){
//         $($square[$anotherIndex]).addClass('selected')
//         }else{
//           var $anotherIndex = $randomIndex - 1;
//           if(!$($square[$anotherIndex]).hasClass('selected')){
//           $($square[$anotherIndex]).addClass('selected');
//           }else{
//             var $anotherIndex = $randomIndex + 2;
//             if(!$($square[$anotherIndex]).hasClass('selected')){
//               $($square[$anotherIndex]).addClass('selected');
//             }
//           }
//       }
//   }
// }//this method is soooooooooooooooo stupid!

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
