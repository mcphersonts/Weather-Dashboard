
      var apiKey = "a7e7fe8b90f94b9f214bd4b3b38ded69"
      // Initial array of cities
      var cities = ["Richmond"];

      // displayCityInfo function re-renders the HTML to display the appropriate content
      function displayCityInfo() {
        var cityName = $(this).attr("data-name");
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          //$("#weather-view").text(JSON.stringify(response));
          console.log((response));
          var temp = ((response.main.temp) - 273.15) * 9/5 + 32;
          //console.log("temp: "+temp.toFixed(2));

          var temp_p = $("<p>");
          temp_p.text("Temperature: "+temp.toFixed(2)+"F");

          var humid_p = $("<p>");
          humid_p.text("Humidity: "+response.main.humidity);

          var wind_p = $("<p>");
          wind_p.text("Wind Speed: "+response.wind.speed);

          /*var uv_p = $("<p>");
          uv_p.text("UV Index: "+response.)*/

          $(".current").append(temp_p, humid_p, wind_p);
        });
      }

      // Creating a div to hold the city
      var cityDiv = $("<div class='city'>");
      
      // Function for displaying city data
      function renderButtons() {

        // Deleting the cities prior to adding new cities
        $("#buttons-view").empty();
        console.log("Cities array: "+cities);

        // Looping through the array of cities
        for (var i = 0; i < cities.length; i++) {

          // Then dynamicaly generating buttons for each city in the array
          var a = $("<button>");
          // Adding a class of city-btn to our button
          a.addClass("city-btn");
          // Adding a data-attribute
          a.attr("data-name", cities[i]);
          // Providing the initial button text
          a.text(cities[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a city button is clicked
      $("#add-city").on("click", function(event) {
       event.preventDefault();
        console.log("Inside city click button");
        // This line grabs the input from the textbox
        var city = $("#csearch").val().trim();
        $("#csearch").val("");
        // Adding city from the textbox to our array
        cities.push(city);
        // Calling renderButtons which handles the processing of our city array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "city-btn"
      $(document).on("click", ".city-btn", displayCityInfo);
      // Calling the renderButtons function to display the initial buttons
      renderButtons();