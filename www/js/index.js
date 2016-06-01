$(document).ready(function() {
    app.initialize();
    $.material.init();
    $.material.ripples();
    $('input').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if ( (code==13) || (code==10))
        {
            $(".login").click();
        }
    });
    $(".login").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username != '' && password != '') {
            var formData = "user_name=" + username + "&password=" + password + "&login_request=1";
            $.ajax({
                type: 'POST',
                url: 'http://192.168.8.49/crm_svn/index.php?entryPoint=crmAppLogin',
                ContentType: 'multipart/form-data',
                data: formData,
                beforeSend: function() {

                },
                success: function(response) {
                    var response = JSON.parse(response);
                    if (response.id != 0) {
                        sessionStorage.sessionId = response.id;
                        sessionStorage.username= username;
                        console.log(sessionStorage.sessionId);
                        window.location.href = "activity.html";
                    } else {
                        $("span.error").fadeIn();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    $("#fail").snackbar("show");
                }
            });

            //window.location.href="activity.html";
        } else {
            $("span.error").fadeIn();
        }
    });
    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       if (st > lastScrollTop){
           //alert('downscroll code');
       } else {
          //alert('upscroll code');
       }
       lastScrollTop = st;
    });

});