$(document).ready(function(){

    $(".navbar a, footer a[href='#homePage']").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){

          window.location.hash = hash;
        });
      } 
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

    getWeather();

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

    $("#playBtn, #playAgainBtn").on('click', () => {
      let round = 1;
      play(round++);
      $("#nextRoundBtn").on('click', () => {
        if(round <= 3) play(round++);
      });
    });


    $("#sendBtn").on('click', () => {
      const name = $("#name").val();
      const email = $("#email").val();
      const origin = $("#comments").val();
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
let round1;
let round2;
let round3;

const play = (round, callback) => {
  const cards = [1, 2, 3, 4, 5];
  const enemy = [1, 2, 3, 4, 5];
  let myScore = 0;
  let enemyScore = 0;
  let count = 0;
  $("#cardTitle").text('PICK YOUR CARD!').css('color', 'red');
  $("#nextRoundBtn, #playAgainBtn").hide();
  $("#playBtn").text('Start!').css('background', 'red');
  $("#round").text('Round ' + round).css({'color':'#B49BFF', 'transform-scale':'scale(1.4, 1.4)', 'transition-duration':'2s'});
  //$("#round").text('Round' + round);
  $("#result").show().css('font-size', '2em');
  $("#vs").show();
  $("#myScore, #enemyScore").text(0);
  $("#myResult, #enemyResult, #roundResult").text('');
  $('.card').css('border', '');
  $("#myCard, #enemyCard").hide();
  $(".my").mouseover(function() {
    if(cards.indexOf(Number($(this).text().charAt(0))) != -1) {
      $(this).css({ 'cursor':'pointer', 'transform':'scale(1.5, 1.5)' });
    }else {
      $(this).css({ 'cursor':'not-allowed' });
    }
  }).mouseleave(function() {
    $(this).css({ 'cursor':'not-allowed', 'transform':'scale(1, 1)' });
  });

  $(".my").on('click', function() {
    $(this).css("border", "2px solid #B49BFF");
  
    const cardNumber = Number($(this).text().charAt(0));
    const index = cards.indexOf(cardNumber);   
    if(index == -1) return;
    console.log('round', round);
    console.log('count', ++count);

    cards.splice(index, 1);
    console.log(cards);   
    showCard('myCard', cardNumber);
    
    let enemyNumber;
    while(true) {
      const random = Math.floor(Math.random() * 5) + 1;
      if(enemy.indexOf(random) != -1) {
        enemyNumber = random;
        enemy.splice(enemy.indexOf(enemyNumber), 1);
        showCard('enemyCard', enemyNumber);
        break;
      }
    }
    $(".enemy").each(function() {
      if(Number($(this).text().charAt(0)) == enemyNumber) {
        $(this).css("border", "2px solid #B49BFF");
      } 
    });

    if(cardNumber > enemyNumber) {
      myScore++;
      $('#myResult').text('Win!!').css('color', 'red');
      $('#enemyResult').text('Lose..').css('color', 'gray');
    }else if(cardNumber < enemyNumber) {
      $('#enemyResult').text('Win!!').css('color', 'red');
      $('#myResult').text('Lose..').css('color', 'gray');
      enemyScore++;
    }else {
      $('#enemyResult').text('Tie..!').css('color', 'gray');
      $('#myResult').text('Tie..!').css('color', 'gray');
      myScore++;
      enemyScore++;
    }
    $("#myScore").text(myScore);
    $("#enemyScore").text(enemyScore);
      
    if(cards.length == 0) {
      console.log('round end');
      var result;
      if(myScore > enemyScore) {
        result = 'You won!!';
      }else if(myScore < enemyScore) {
        result = 'You lost...';
      }else {
        result = 'You tied..!';
      }
      //$("#myScore, #enemyScore").css({'font-size':'15px', 'color':'red', 'transition-duration':'2s'});
      $("#roundResult").text(result);
        
      
      if(round == 1) {
        round1 = myScore + ':' + enemyScore + ' ' + result;
        $("#nextRoundBtn").show();
      }else if(round == 2) {
        round2 = myScore + ':' + enemyScore + ' ' + result;
        $("#nextRoundBtn").show();
      }else if(round == 3) {
        round3 = myScore + ':' + enemyScore + ' ' + result;
        $("#myCard, #enemyCard, #result, #nextRoundBtn").hide();
        $("#round").text('Game Result');
        $("#myResult, #enemyResult").text("");
        $("#roundResult").html('[round1] ' + round1 + '<br>' 
                              + '[round2] ' + round2 + '<br>' 
                              + '[round3] ' + round3 + '<br>'
                              + 'Wanna try agian?').css('font-size', '1em');
        $("#playAgainBtn").show();
        $("#vs").hide();           
        $("#playBtn").text('play').css('background', '#B49BFF');
        
      }
    }
  });
}
const showCard = (whose, cardNumber) => {
  switch(cardNumber) {
    case 1: img = '/img/ant.jpg'; break;
    case 2: img = '/img/bunny.jpg'; break;
    case 3: img = '/img/snake.jpg'; break;
    case 4: img = '/img/tiger.jpg'; break;
    case 5: img = '/img/dragon.jpg'; break;
  }
  $("#" + whose).prop('src', img).show();
}