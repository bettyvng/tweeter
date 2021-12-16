$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("input", function() {
    const counter = 140 - (this.value || '').length;
    const jCounter = $(".counter");
    if (counter < 0) {
      jCounter.addClass("counter-negative");
    } else {
      jCounter.removeClass("counter-negative");
    }
    jCounter.text(counter);
  })
});