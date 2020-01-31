$(document).ready(function() {

  let createTweetElement = function(tweetData) {
  
    //BOSS
    let $mainDiv       = $('<div>').addClass('boxedTweet');


    //Children of BOSS
    let $header        = $('<header>').addClass('userInformation');
    let $par           = $('<p>').attr('id', 'tweetLine');
    $par.text(tweetData.content.text);
    let $footer        = $('<footer>').addClass('postInfoAndIcons');


    //Children of header
    let $divAvatarInfo = $('<div>').attr('id', 'avatarInfo');
    let $spanOfHandler = $('<span>').attr('id', 'handler');
    $spanOfHandler.text(tweetData.user.handle);


    //Children of divAvatarInfo
    let $imgOfAvatar = $('<img>');
    $imgOfAvatar.attr('src', tweetData.user.avatars);
    let $spanOfName  = $('<span>').attr('id', 'name');
    $spanOfName.text(tweetData.user.name);


    //Children of footer
    let tweetMoment = moment(tweetData['created_at']).fromNow();
    let $spanTimePost   = $('<span>').text(tweetMoment).attr('id', 'timeOfTweet');
    let $divOfIcons     = $('<div>').attr('id', 'threeIcons');

    //Children of divOfIcons
    let $iconShare      = $('<i>').addClass('fas fa-share-square')
    let $iconHeart      = $('<i>').addClass('fas fa-heart')
    let $iconComment    = $('<i>').addClass('fas fa-comment')

  
  
    // APPENDING FROM GRAND-CHILDREN TO BOSS

    $divOfIcons
      .append($iconShare)
      .append($iconHeart)
      .append($iconComment);
    
    $divAvatarInfo
      .append($imgOfAvatar)
      .append($spanOfName);
    
    $header
      .append($divAvatarInfo)
      .append($spanOfHandler);
    
    $footer
      .append($spanTimePost)
      .append($divOfIcons);

    $mainDiv
      .append($header)
      .append($par)
      .append($footer);
    
    return  $mainDiv;

  };


  // MANAGING TWEET FEED|
  //____________________|

  $(".actionAndButton").click(function() {
    $(".new-tweet").slideToggle();
  });

  const loadOneTweet = function() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
      .done(function(data) {
        let newTweet = createTweetElement(data.pop());
        $('#tweetsContainer').prepend(newTweet);
        $('#textArea').val("");
        $('.counter').html(140);
      });
  };
  loadOneTweet();


  $(".form").on("submit", function(event) {
    event.preventDefault();
    if (!$('#textArea').val()) {
      $("#errorNothing").removeClass("hidden");
      $("#errorTooLong").addClass("hidden");
    } else if ($('.counter').hasClass('counterUnderZero')) {
      $("#errorTooLong").removeClass("hidden");
      $("#errorNothing").addClass("hidden");
    } else {
      $("#errorTooLong").addClass("hidden");
      $("#errorNothing").addClass("hidden");
      $.ajax({
        method:'POST',
        url: 'http://localhost:8080/tweets',
        data: $('form').serialize()
      })
        .done(loadOneTweet);
    //.fail(handleCommentLoadErrors);
    }
  });

 


  const renderTweets = function(tweets) {
    for (let eachTweet of tweets) {
      let result = createTweetElement(eachTweet);
      $('#tweetsContainer').prepend(result);
    }
  };



  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
      .done(renderTweets);
  };

  loadTweets();




  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227,
  };

  const $tweet = createTweetElement(tweetData);
  $('#tweetsContainer').prepend($tweet);
});




/*
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  */
