$(document).ready(function () {
  let maxText = 140;

  $('#textArea').on("input", function () {
    console.log("HELLOOO")
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



