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
  
    $("#miniCodeBtn").on('click', () => {
      location.href="https://github.com/Julia8956/tasteOfWork";
    });
    $("#semiCodeBtn").on('click', () => {
      location.href="https://github.com/Julia8956/shareThings";
    });
    $("#finalCodeBtn").on('click', () => {
      location.href="https://github.com/Julia8956/travelInterface";
    });

    $("#sendBtn").on('click', () => {
      const name = $("#name").val();
      const email = $("#email").val();
      const comments = $("#comments").val();

      if(email == "" || comments == "") {
         return alert("메일주소와 내용을 입력해주세요");
      }
      
        

    });

});