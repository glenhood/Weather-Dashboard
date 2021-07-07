$(document).ready(function(){ //document.ready makes sure functions do not automatically fire on page loadd and user actually initiates
  $("#search-button").on("click", function() {//#search-button grabs a value from #search-value input and passes value as var searchCity to searchDailyForecast()

      var searchCity= $("#search-value").val();
    searchDailyForecast(searchCity);
  });
  
   function makeRow(text) {//add to list of previous searches
    var li = $("<li>").text(text);
    $(".history").append(li);
  }

  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  //have page disaply latest history search, if any
  if (history.length > 0) {
    searchDailyForecast(history[history.length-1]);
  }
//create rows based on each searched city in history array
  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }


  
  function searchDailyForecast(searchCity) {
      var APIKEY = "b550bdc7e893c3cc180911fb8363a8af"
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=b550bdc7e893c3cc180911fb8363a8af&units=imperial`,
      method: "GET",
     }).then( function(responseData) { 
        console.log(responseData) 
        $('#today').empty()
        var title = $("<h3>").text(responseData.name + " (" + new Date().toLocaleDateString() + ")");
        var forcastIcon = $("<img>").attr('src', `http://openweathermap.org/img/wn/${responseData.weather[0].icon}.png`);
        var wind = $("<p>").addClass("card-text").text( "Wind Speed: " + responseData.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + responseData.main.humidity + "%" );
        var temp = $("<p>").addClass("card-text").text("Temp: " + responseData.main.temp + " °F");//grabbed farenheit  with imperial units
        
        var cardBody = $("<div>").addClass("card-body");
        
    cardBody.append(title, forcastIcon, temp, humid, wind);
       
    $("#today").append(cardBody);
    
    // searchCity = data.name;
        searchOneCallApi(responseData.coord.lon, responseData.coord.lat);
        // history(searchCity, false);
        // console.log(data.coord.lon)
        
        if (history.indexOf(searchCity) === -1) {
          history.push(searchCity);
          window.localStorage.setItem("history", JSON.stringify(history));
          makeRow(searchCity);
        }
      

      
        
        
        } ) 
        
        function searchOneCallApi(longitude, latitude) {

          var APIKEY = "b550bdc7e893c3cc180911fb8363a8af"
        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lon=${longitude}&lat=${latitude}&appid=b550bdc7e893c3cc180911fb8363a8af`,
          method: "GET",
         }).then( function(responseData2) { 
          console.log(responseData2)
          
          console.log(responseData2.current.uvi)
          var uvIndex = $("<p>").addClass("card-text").css('padding-left', '20px').text("UV Index: " + responseData2.current.uvi)
          if (uvIndex > 6) {
            $("card-text").css('background', '#aa2020')
        } else if (uvIndex > 4) {
            $("card-text").css('background', '#aa6a20')
        } else {
            $("card-text").css('background', '#40aa20')
        }
    
        $("card-text").css('display', 'block')
      
  
          $("#today").append(uvIndex);
          $("#fivedayforecast").empty();
          for (let index = 1; responseData2.daily.length = 6; index++) {
                  var title = $("<h3>").text(" (" + new Date().toLocaleDateString() + ")");
                  var temp = $('<p>').text("Temp: " + responseData2.daily[index].temp.day + " °F")
                  var humidity = $('<p>').text("Humidity: " + responseData2.daily[index].humidity + "%")
                  var forcastIcon = $("<img>").attr('src', `http://openweathermap.org/img/wn/${responseData2.daily[index].weather[0].icon}.png`);

                  
                  var forecastcard = $('<div>').addClass('forecastcard')
                  
                  
                  
                  
                  
                  forecastcard.append(title, forcastIcon, temp, humidity)
                  $('#fivedayforecast').append(forecastcard)
              
                


          
          
                }
        
        
        
        
        
        
        
        })
        
        
      }
  

        // create dynamic html content for current weather
        // prepend data we want to drill down to with with "responseData"
        

      //   function displayWeekForecast(forecastData) {
      //     // future cards => 5 days, date, icon of weather conditions, temp, wind speed, humidity
      //     //5 days
      //     fivedayforecast.html('');
      //     
      // }

        // append and add to page
    
        

  
     
    
      }

    })