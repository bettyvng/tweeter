/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $(document).ready(function() {
    tweets.forEach(tweet => {
      $('.current-tweets').append(createTweetElement(tweet));
    });
  });
}

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

renderTweets(data);
