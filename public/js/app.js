$(document).ready(function(){
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#homePage']").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
    
    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
      });
  
      var windTop = $(window).scrollTop();
      if(windTop > 350) {
        $(".navbar").css("background", "black");
      }else {
        $(".navbar").css("background", "transparent");
      }
    });

    //getWeather();

    $("#address").on('change', () => {
      $("#location").text("");
      $("#summary").text("Loading...");
      $("#temperature").text("");
      $("#max").text("");
      $("#min").text("");
      $("#rain").text("");
      fetch('/weather?address=' + $("#address").val()).then((response) => {
        response.json().then(({ error, forecast, location }) => {
          if(error) {
            $("#location").text("");
            $("#summary").text(error).css('font-size', '13px');
            $("#temperature").text("");
            $("#max").text("");
            $("#min").text("");
            $("#rain").text("");
          }else {
            $("#location").html('<i class="fas fa-map-marker-alt"></i>' + location);
            $("#summary").text(forecast.summary);
            $("#temperature").html(forecast.temperature + '<i class="fas fa-temperature-high" style="orange"></i>');
            $("#max").html(forecast.max + '<i class="fas fa-long-arrow-alt-up" style="color:red"></i> /');
            $("#min").html(forecast.min + '<i class="fas fa-long-arrow-alt-down" style="color:blue"></i>');
            $("#rain").html('<i class="fas fa-tint" style="color:white"></i>' + forecast.rain + '%');
          }
        });
      });
    });

  
    $("#miniCodeBtn").on('click', () => {
      location.href="https://github.com/Julia8956/tasteOfWork";
    });
    $("#semiCodeBtn").on('click', () => {
      location.href="https://github.com/Julia8956/shareThings";
    });
    $("#finalCodeBtn").on('click', () => {
      location.href="https://github.com/Julia8956/travelInterface";
    });

    $(".card").on('click', function() {
      var img;
      console.log($(this).text().charAt(0));
      switch($(this).text().charAt(0)) {
        case '1': img = '/img/ant.jpg'; break;
        case '2': img = '/img/bunny.jpg'; break;
        case '3': img = '/img/snake.jpg'; break;
        case '4': img = '/img/tiger.jpg'; break;
        case '5': img = '/img/dragon.jpg'; break;
      }
      $("#myCard").prop('src', img);
    });



    $("#sendBtn").on('click', () => {
      const name = $("#name").val();
      const email = $("#email").val();
      const origin = $("#comments").val();
      // for(var i = 0; i < text.length; i++) {
      //   if(text.charAt(i) == '\n') {
      //     text.replace(/\s/, );
      //   }
      // }
      const text = origin.replace(/\s+/g, " ").trim();
      console.log(text);
      const from = name + ' <' + email + '>';

      if(email == "" || comments == "") {
         return alert("메일주소와 내용을 입력해주세요");
      }

      $("#sendBtn").text('Sending...').attr('disabled', true);
      
      fetch("/mail?from=" + from + "&text=" + text).then((response) => {
        response.json().then((data) => {
          if(data.error) {
            console.log(data.error);
            $("#sendBtn").text('전송실패..!').css({'background':'red', 'color':'white'});
          }else {
            console.log(data.response);
            $("#sendBtn").text('전송 완료!').css({'background':'green', 'color':'white'});
          }
        });
      });
        

    });

});

const getWeather = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    $("#summary").text("Loading...");
    console.log(lat, lng);
    fetch('/weather?address=geolocation&lat=' + lat + '&lng=' + lng).then((response) => {
      response.json().then(({ error, forecast, location }) => {
        if(error) {
          $("#location").text("");
          $("#summary").text(error).css('font-size', '13px');
          $("#temperature").text("");
          $("#max").text("");
          $("#min").text("");
          $("#rain").text("");
        }else {
          $("#location").html('<i class="fas fa-map-marker-alt"></i>' + location);
          $("#summary").text(forecast.summary);
          $("#temperature").html(forecast.temperature + '<i class="fas fa-temperature-high" style="orange"></i>');
          $("#max").html(forecast.max + '<i class="fas fa-long-arrow-alt-up" style="color:red"></i> /');
          $("#min").html(forecast.min + '<i class="fas fa-long-arrow-alt-down" style="color:blue"></i>');
          $("#rain").html('<i class="fas fa-tint" style="color:white"></i>' + forecast.rain + '%');
        }
      });
    });
  });
}