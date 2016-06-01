$(document).ready(function() {
    if (sessionStorage.sessionId) {
        //alert(sessionStorage.username);
        app.initialize();
        $.material.init();
        $.material.ripples();
        //alert(sessionStorage.someKey);
        $(".reload").attr("href", window.location.href);
        $.ajax({
            type: 'GET',
            url: 'http://192.168.8.49/crm_svn/index.php?entryPoint=crmAppJson&session_id='+sessionStorage.sessionId+'&user_name='+sessionStorage.username,
            dataType: 'json',
            beforeSend: function() {
                $(".loader").fadeIn("fast");
            },
            success: function(response) {

                //alert(JSON.stringify(response));
                $(".loader").fadeOut("slow", function() {
                    $.each(response, function(key, value) {
                        node = '<tr id="' + value.id + '">\
                        <td class="width"><i class="material-icons edit">edit</i></td>\
                        <td>' + value.name + '</td>\
                        <td>' + value.lead_source + '</td>\
                        <td>' + value.project_name + '</td>\
                      </tr>';
                        if (value.lead_type == 'New') {
                            $("#activityContent #newLeads table tbody").append(node);
                        } else {
                            $("#activityContent #followUpLeads table tbody").append(node);
                        }
                    });
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    $("#fail").snackbar("show");
                }

        });

        $(document).on('click', '#activityContent table tr', function() {
            var id = $(this).attr("id");
            //alert("aa");
            if (id != null)
                window.location.href = "leadDetail.html?id=" + id;
        });

        $(window).scroll(function() {
            var height = $(".toolbar").outerHeight();

            if ($(this).scrollTop() > height) {
                //$('.toolbar').slideUp("fast");
                $('.activityTabs').css({
                    "position": "fixed",
                    "top": "0",
                    "z-index": "999"
                });
            } else {
                $('.activityTabs').css({
                    "position": "static"
                });
            }
        });
    } else {
        window.location.href = "index.html";
    }

});