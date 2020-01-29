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
                                                 $imgOfAvatar.attr('src', tweetData.user.avatars)
                              let $spanOfName  = $('<span>').attr('id', 'name');
                                                 $spanOfName.text(tweetData.user.name)  


           //Children of footer
           let $spanTimePost   = $('<span>').attr('id', 'timeOfTweet');
                                 $spanTimePost.text(tweetData.created_at)
           let $divOfIcons     = $('<div>').attr('id', 'threeIcons');
                                 //$divOfIcons empyt for now;

  
  
  // APPENDING FROM GRAND-CHILDREN TO BOSS

    $divAvatarInfo
          .append($imgOfAvatar)
          .append($spanOfName);
    
    $header
          .append($divAvatarInfo)
          .append($spanOfHandler);
    
    $footer
          .append($spanTimePost)
          .append($divOfIcons)

    $mainDiv
          .append($header)
          .append($par)
          .append($footer);
    
  return  $mainDiv;

};


// MANAGING TWEET FEED|
//____________________|



$( ".form" ).on( "submit", function(event) {
  debugger;
  if ($('#textArea').text < 0 && $('#textArea').text < 140) {
    event.preventDefault();
    $.ajax ({
      method:'POST',
      url: 'http://localhost:8080/tweets',
      data: $('form').serialize() 
    })
  } else if ($('#textArea').text === 0) {
        alert('You forgot to actually write something, weirdo..')
  } else if ($('#textArea').text > 140 ) {
        alert('Too much characters....aaaahrhrrhhrhajshf!!!!')
  }
 
    //.done(createTweetElement)
    //.fail(handleCommentLoadErrors);
    //console.log( $( this ).serialize() );
});

const renderTweets = function(tweets) {
    for(let eachTweet of tweets) {
      let result = createTweetElement(eachTweet)
      $('#tweetsContainer').append(result)
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
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);
$('#tweetsContainer').append($tweet); 
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
