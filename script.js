import $ from "https://cdn.skypack.dev/jquery@3.6.0";

// const showing current quote
let currentQuote;
let currentAuthor;
// object saving all quote objects
let quotes;

// Function to get the quotes from API
function getQuotes() {
    return $.ajax({
        headers: {
        Accept: '/'
        },
        url: 'https://type.fit/api/quotes',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotes = JSON.parse(jsonQuotes);
                console.log('quotes');
                console.log(quotes);
            }
        }
    });
}

// Draw from the list of quotes
function getRandomQuote() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    currentQuote = randomQuote.text;
    currentAuthor = randomQuote.author;

    $("#quote-text").text(currentQuote);
    $("#quote-author").text(currentAuthor);

    // Create the link for tweeting the quote
    $("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?hashtags=LeonQuotes&text=" + encodeURIComponent('"' + currentQuote + '" -' + currentAuthor));
}

$(document).ready(function() {
    getQuotes().then(() => {
        getRandomQuote();
    });

    $("#new-quote").on("click", getRandomQuote);
});
