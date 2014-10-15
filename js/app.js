/**
 * Author: Maximo Mena
 * GitHub: mmenavas
 * Twitter: @menamaximo
 */

// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// Shuffling Card object
var cardSet = {

  cards: [],
  shuffledCards: {},

  settings: {
    totalCards: 0,
    maxValue: 0, // (totalCards / 2)
  },

  init: function(totalCards) {
    this.settings.totalCards = totalCards;
    this.settings.maxValue = (totalCards / 2);
    this.cards = this.getCards(this.settings.maxValue);
    this.shuffledCards = this.getShuffledCards(this.cards);
  },

  getCards: function(maxValue) {
    var cards = [];
    var count = 0;
    while (count < maxValue) {
      cards[2 * count] = count + 1;
      cards[2 * count + 1] = count + 1;
      count++;
    }
    return cards;
  },

  getShuffledCards: function(cards) {
    var shuffledCards = {}
    var count = 0;
    while (count < cards.length) {
      var value = Math.floor(Math.random() * cards.length);
      if (!shuffledCards.hasOwnProperty(value)) {
        shuffledCards[value] = cards[count];
        count++;
      }
    }
    return shuffledCards;
  }

};

// Get settings
var grid = $('#grid').val();
var gridValues = grid.split('x');
var total = gridValues[0] * gridValues[1];

// Boolean
var card1 = false;

// Pair Counter
var counter = 0;

// Prepare table
function prepareBoard(h, v, t) {
  var gridClass = 'small-block-grid-' + h;
  var output = "";
  var i = 0;
  while(i < t) {
    output += '<li class="card"><a class="inactive" href="#">?</a></li>';
    i++;
  }

  $('#board').attr('class', gridClass)
  $('#board').html(output);
  $('.status').text("");

  card1 = false;
  counter = 0;
}
prepareBoard(gridValues[0], gridValues[1], total);

// Initialize object
cardSet.init(total);

////////////
// Events //
////////////
// Settings
$("#submit").on("click", function() {
  grid = $('#grid').val();
  gridValues = grid.split('x');
  total = gridValues[0] * gridValues[1];
  prepareBoard(gridValues[0], gridValues[1], total);
  cardSet.init(total);
});

// Reveal/conceal card
$("#board" ).delegate(".card a.inactive", "click", function(event) {
  event.preventDefault();
  var element = $(this);
  var index = $(".card a").index(element);
  element.text(cardSet.shuffledCards[index]);
  element.removeClass('inactive').addClass('active');

  if (card1 === false) {
    card1 = index;
  }
  else {
    var buffer = card1;
    if (cardSet.shuffledCards[buffer] != cardSet.shuffledCards[index]) {
      setTimeout(function() {
        element.text("?");
        element.removeClass('active').addClass('inactive');
        $( ".card a" ).eq(buffer).text("?");
        $( ".card a" ).eq(buffer).removeClass('active').addClass('inactive');
      }, 900);
    }
    else {
      counter++;
      if (counter == (total / 2)) {
        $('.status').text("You win!");
      }
    }
    card1 = false;
  }

});
