/* Track outbound links in Google Analytics */
//https://www.sitepoint.com/track-outbound-links-google-analytics/
(function($) {

  "use strict";

  // current page host
  var baseURI = window.location.host;

  // click event on body
  $("body").on("click", function(e) {

    // abandon if link already aborted or analytics is not available
    if (e.isDefaultPrevented() || typeof ga !== "function") return;

    // abandon if no active link or link within domain
    var link = $(e.target).closest("a");
    if (link.length != 1 || baseURI == link[0].host) return;

    // cancel event and record outbound link
    e.preventDefault();
    var href = link[0].href;
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'outbound',
      'eventAction': 'link',
      'eventLabel': href,
      'hitCallback': loadPage
    });


    // redirect to outbound page
    function loadPage() {
      document.location = href;
    }

  });

  $('#searchform').submit(function(event) {
    event.preventDefault();
    var query = $(this).find('input[name="query"]').val();
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'search',
      'eventAction': 'archive.org',
      'eventLabel': query
    });
    var search_url = "https://archive.org/search.php?query="
      + query + "&sin=TXT&and[]=collection%3A%22mfmasouthafrica%22";
    window.location = search_url;
  });

})(jQuery); // pass another library here if required
