$(document).ready(function(){ 
  $("#search-button").on("click", function() {

      var searchCity= $("#search-value").val();
    searchDailyForecast(searchCity);
  });
  
   function makeRow(text) {
    var li = $("<li>").text(text);
    $(".history").append(li);
  }
  

  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  if (history.length > 0) {
    searchDailyForecast(history[history.length-1]);
  }
  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
  
  $(".history").on("click", "li", function() {
    searchCity($(this).text());
  });


  
  function searchDailyForecast(searchCity) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=b550bdc7e893c3cc180911fb8363a8af&units=imperial`,
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
    

        searchOneCallApi(responseData.coord.lon, responseData.coord.lat);        
        if (history.indexOf(searchCity) === -1) {
          history.push(searchCity);
          window.localStorage.setItem("history", JSON.stringify(history));
          makeRow(searchCity);
        }
      

      
        
        
        } ) 
        
        function searchOneCallApi(longitude, latitude) {

        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lon=${longitude}&lat=${latitude}&appid=b550bdc7e893c3cc180911fb8363a8af`,
          method: "GET",
         }).then( function(responseData2) { 
          console.log(responseData2)
          
          console.log(responseData2.current.uvi)
          var uvIndex = $("<p>").addClass("card-text").css('padding-left', '20px').text("UV Index: " + responseData2.current.uvi)
          if (responseData2.current.uvi > 6) {
            uvIndex.css('background', '#aa2020')
        } else if (responseData2.current.uvi > 4) {
            uvIndex.css('background', '#aa6a20')
        } else {
            uvIndex.css('background', '#40aa20')
        }
    
        $(uvIndex).css('display', 'block', 'margin-right', '751px')
      
  
          $("#today").append(uvIndex);
          $("#fivedayforecast").empty();
          for (let index = 1; responseData2.daily.length = 6; index++) {
                  var title = $("<h3>").text(moment.unix(responseData2.daily[index].dt).format("MM/D/YYYY"))
                  var temp = $('<p>').text("Temp: " + responseData2.daily[index].temp.day + " °F")
                  var humidity = $('<p>').text("Humidity: " + responseData2.daily[index].humidity + "%")
                  var forcastIcon = $("<img>").attr('src', `http://openweathermap.org/img/wn/${responseData2.daily[index].weather[0].icon}.png`);

                  
                  var forecastcard = $('<div>').addClass('forecastcard')
                  
                  
                  
                  
                  
                  forecastcard.append(title, forcastIcon, temp, humidity)
                  $('#fivedayforecast').append(forecastcard)
              
                


          
          
                }
        
        
        
        
        
        
        
        })
        
        
      }
  

        

  
     
    
      }

    })