var gifs = ["Surfing Fails", "Snowboarding Fails", "Skateboard Fails", "Parkour Fails", "Kayak Fails", "Paddleboard Fails", "Yoga Fails", "Boat Fails"];

function displayGifInfo() {

  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=i004jCKK4PspnRmYYYDbVWOG37kQF3Zf&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {


      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var gifDiv = $("<div>");
        gifDiv.addClass("col-sm");


        var rating = results[i].rating;


        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");

        gifImage.attr("src", results[i].images.fixed_height.url);

       
        gifDiv.append(gifImage);
        gifDiv.append(p);

        $("#gif-view").prepend(gifDiv);


      };
    };
  });
};


function renderButtons() {

  $("#firstRow").empty();

  for (var i = 0; i < gifs.length; i++) {

    var a = $("<button>");

    a.addClass("btn");
    a.addClass("btn-outline-light");
    a.addClass("gif-btn");
    a.addClass("mt-4");

    a.attr("data-name", gifs[i]);

    a.text(gifs[i]);

    // $("#button-0").append(a)

    var b = $("<div>");
    b.addClass("col-sm");
    b.append(a);
    $("#firstRow").append(b);

  };

};


$("#add-gif").on("click", function (event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();


  gifs.push(gif);

  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
