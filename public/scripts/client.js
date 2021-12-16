/**
 * Escape function to help prevent xss
 * @param {*} str - string to be rendered/escaped
 * @returns xss-safe string
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * 
 * Creat tweet element that can be rendered
 * @param {*} tweet - tweet object
 * @returns tweet element to be rendered
 */
const createTweetElement = function(tweet) {
  const $tweetElementMarkup = `
    <article class="tweet">
      <header class="tweet-header">
        <div class="tweet-header-name">
          <img src="${tweet.user.avatars}">
          <span>${tweet.user.name}</span>
        </div>
        <div class="tweet-header-handle">${tweet.user.handle}</div>
      </header>
      <div class="tweet-body">
        <span class="tweet-body-text">${escape(tweet.content.text)}</span>
      </div>
      <footer class="tweet-footer">
        <div class="tweet-time">${timeago.format(tweet.created_at)}</div>
        <div class="tweet-actions">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `;
  return $tweetElementMarkup;
}

/**
 * Render a list of tweets on our UI
 * @param {*} tweets - a list of tweets to be rendered
 */
const renderTweets = function(tweets) {
  // Empty existing tweets first.
  $('.current-tweets').empty();
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach(tweet => {
    $('.current-tweets').append(createTweetElement(tweet));
  });
}

/**
 * Load tweets from server
 */
const loadTweets = function() {
  // Load tweets from server
  $.get("http://localhost:8080/tweets", function(result) {
    // Show latest on top so user see latest first
    result.sort((a, b) => b.created_at - a.created_at);
    renderTweets(result);
  });
}

/**
 * Reset new tweet area; empty textarea and reset tweet counter
 */
const resetNewTweetArea = function() {
  // Reset error on new tweet area if any
  // reset textarea input value
  $('#tweet-text').val('');
  // reset the text counter
  const jCounter = $(".counter");
  jCounter.removeClass("counter-negative");
  jCounter.text(140);
}

const toggleNewTweetError = function(message) {
  if (message) {
    // add text message
    $('.new-tweet-error-body').text(message);
    // revealing the message
    $('.new-tweet-error').slideDown("fast", "linear");
  } else {
    // hide the message, after it's done, then reset the error message
    // using callback to make text disappear only after it is
    // completely hidden
    $('.new-tweet-error').slideUp("fast", "linear", () => {
      $('.new-tweet-error-body').text('');
    });
  }
}
/**
 * Initialize add-tweet handler so that it can post on submit
 */
const initAddTweetHandler = function() {
  // Listen to tweet form submission
  $( "#new-tweet-form" ).submit(function( event ) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val();
    if (!tweetText || tweetText.length <= 0) {
      toggleNewTweetError("Sorry! please write something before submission.");
      return;
    }
    if (tweetText.length > 140) {
      toggleNewTweetError("Sorry! Your message exceeds maximum character limit at 140.");
      return;
    }
    // Reset error
    toggleNewTweetError('');
    // Grab the value in textarea and submit tweet message.
    $.post("http://localhost:8080/tweets", { text: tweetText }, function() {
      // reset new tweet area
      resetNewTweetArea();
      // load tweets again
      loadTweets();
    });
  });
}

const bootstrap = function() {
  // Wait for document to be ready
  $(document).ready(function() {
    loadTweets();
    initAddTweetHandler();
  });
}

// Initial call to wait for document ready and start all the work
bootstrap();
