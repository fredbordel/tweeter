$(document).ready(function() {

let maxText = 140;

$('.counter').html(maxText);

$('#textArea').keyup(function() {
  let textLength = $('#textArea').val().length;
  let textRemaining = maxText - textLength;

  if (textRemaining > 0) {
    $('.counter').html(textRemaining)
    $('.counter').removeClass('counterUnderZero');
  } else if (textRemaining <= 0) {
    $('.counter').addClass('counterUnderZero');
    $('.counter').html(textRemaining)
  }
})
});