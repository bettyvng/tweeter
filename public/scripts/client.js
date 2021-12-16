
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
        <span class="tweet-body-text">${tweet.content.text}</span>
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
    renderTweets(result);
  });
}

/**
 * Reset new tweet area; empty textarea and reset tweet counter
 */
const resetNewTweetArea = function() {
  // reset textarea input value
  $('#tweet-text').val('');
  // reset the text counter
  const jCounter = $(".counter");
  jCounter.removeClass("counter-negative");
  jCounter.html(140);
}

/**
 * Initialize add-tweet handler so that it can post on submit
 */
const initAddTweetHandler = function() {
  // Listen to tweet form submission
  $( "#new-tweet-form" ).submit(function( event ) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val();
    // Grab the value in textarea and submit tweet message.
    $.post("http://localhost:8080/tweets", { text: tweetText }, function(result) {
      resetNewTweetArea();
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
