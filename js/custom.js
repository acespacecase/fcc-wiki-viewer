// add enter key functionality
$('#wiki-submit').click(wikiViewer);
$('#wiki-input').keypress(function() {
  if (event.which == 13) {
    wikiViewer();
  }
})

function wikiViewer() {
    var wikiQuery = $('#wiki-input').val();

    // Error handling if left blank
    if(wikiQuery === "") {
      $('.error').html('<span class="error">Looks like you left the search blank. Please try again!</span>');
    } else {
      fetchJSON(wikiQuery);
    };
  }

function fetchJSON(wikiQuery) {
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + wikiQuery + "&format=json&callback=?";
  var request = new XMLHttpRequest();

  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data) {
      placeResults(data);
    },
    error: function(error) {
      $('.error').html('<span class="error">Looks like there was an error contacting the server. Please let the webmaster know.</span>');
    }
  })
}

function placeResults(data) {
  $('.wiki-results').empty(); // clear previous results
  $('.error').empty();        // clear errors
  $('#wiki-submit').empty();  // clear search query

  var resultsTitles = data[1];

  if (data[1].length === 0) {
    $('.error').html('<span class="error">I\'m sorry, there aren\'t any results. Check your spelling.</span>');
  } else {
    $('.searching').html('Showing search results for <em>"' + data[0] + '"</em>');

    for (var i = 0; i < data[1].length; i++) {
      $('.wiki-results').append('<a href="' + data[3][i] + '" target="_blank"><div class="result"><h2>' + data[1][i] + '</h2><p>' + data[2][i] + '</p></div></a>');
    }
  }

}
