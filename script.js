$("#search-button").on("click", function() {//#search-button grabs a value from #search-value input and passes value as var searchCity to searchDailyForecast()
    var searchCity= $("#search-value").val();
    searchDailyForecast(searchCity);
  });
  
   function makeRow(text) {//add to list of previous searches
    var li = $("<li>").text(text);
    $(".history").append(li);
  }

  

  function searchDailyForecast(searchCity) {
      //this API key is unique to your openweather account
      var APIKEY = "b550bdc7e893c3cc180911fb8363a8af"
​
    $.ajax({
        //breaking apart API url
  //base api url -> "http://api.openweathermap.org/data/2.5/weather"
  // begin API query -> "?q=" + searchterm
  //add your api key to url -> "&appid=" + key
  //additional parameters added with "&" -> ex. &units=imperial
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKEY + "&units=imperial",
      method: "GET", //once we have our url, get the data object blob that makes available all the info we want
​
     }).then( function(responseData) { //"responseData" is  the entire data object blob returned from weather aPI
        
      console.log(responseData) //show weather reponse data in console so we can see how to drill down to data we want
      
      
      // create history link for this search based on history array made at bottom of page
        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);//push each search to localstorage "history" array
          window.localStorage.setItem("history", JSON.stringify(history));
    //create a history search row based on search tern
          makeRow(searchCity);
        }
        
  ;

        // create dynamic html content for current weather
        //prepend data we want to drill down to with with "responseData"
        var title = $("<h3>").text(responseData.name + " (" + new Date().toLocaleDateString() + ")");
        
        var wind = $("<p>").addClass("card-text").text( responseData.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text( responseData.main.humidity + "% Humidity");
        var temp = $("<p>").addClass("card-text").text("Temp" + responseData.main.temp + " °F");//grabbed farenheit  with imperial units
        var cardBody = $("<div>").addClass("card-body");
      

        // append and add to page
    
        cardBody.append(title, temp, humid, wind);
       
        $("#today").append(cardBody);

  
      }
    );
  }
  
  
  

  // on page load get history from local storage, if nothing, leave as empty array
  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  //have page disaply latest history search, if any
  if (history.length > 0) {
    searchDailyForecast(history[history.length-1]);
  }
//create rows based on each searched city in history array
  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }