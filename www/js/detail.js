$(document).ready(function() {
    if (sessionStorage.sessionId) {
        app.initialize();
        $.material.init();
        $.material.ripples();

        $("select").dropdown({
            autoinit: "select"
        });
        var url = window.location.href;
        var id = url.substring(url.indexOf('?id=') + 4);
        $(".reload").attr("href", window.location.href);
        var pid = '';
        $('input').keypress(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if ( (code==13) || (code==10))
            {
                $(".save").click();
            }
        });
        $.ajax({
            type: 'GET',
            url: 'http://192.168.8.49/crm_svn/index.php?entryPoint=editViewApp&session_id='+ sessionStorage.sessionId +'&id=' + id +'&user_name='+sessionStorage.username,
            dataType: 'json',
            beforeSend: function() {
                $(".loader").fadeIn("fast");
            },
            success: function(response) {
                var response = $.parseJSON(JSON.stringify(response));
                //alert(JSON.stringify(response));
                $(".loader").fadeOut("slow", function() {
                    $(".detailTable tbody").css("display", "table-row-group");
                    pid = response['0'].project_id;

                    if (response['0'].name != null)
                        $("#name").val(response[0].name);

                    if (response['0'].phone != null)
                        $("#phone").val(response[0].phone);

                    if (response['0'].email != null)
                        $("#email").val(response[0].email);

                    //alert(pid);
                    //$(".leadName").html(response[0].name);
                    $.each(response.project, function(index, value) {
                        $('#project').append($('<option/>', {
                            value: response.project[index].project_name,
                            text: response.project[index].project_name,
                        }));
                    });
                    if (response['0'].project_name != null)
                        $('#project').val(response['0'].project_name).trigger("change");

                    $.each(response.status, function(index, value) {
                        $('#status').append($('<option/>', {
                            value: response.status[index],
                            text: response.status[index],
                        }));
                    });

                    if (response['0'].status != null)
                        $("#status").val(response['0'].status).trigger("change");

                    $.each(response.lead_source, function(index, value) {
                        $('#agent').append($('<option/>', {
                            value: response.lead_source[index],
                            text: response.lead_source[index],
                        }));
                    });
                    if (response['0'].lead_source != null)
                        $('#agent').val(response['0'].lead_source).trigger("change");
                    if (response['0'].description != null)
                        $("#desc").val(response['0'].description);

                    $.each(response.rating, function(index, value) {
                        $('#rating').append($('<option/>', {
                            value: response.rating[index],
                            text: response.rating[index],
                        }));
                    });
                    if (response['0'].rating != null)
                        $('#rating').val(response['0'].rating).trigger("change");

                    if (response['0'].follow_up_date != null) {
                        var date = response['0'].follow_up_date;
                        var yy = date.substr(0, 4);
                        var mm = parseInt(date.substr(5, 2));
                        var dd = date.substr(8, 2);
                        var h = date.substr(11, 2);
                        var m = date.substr(14, 2);
                        var s = date.substr(17, 2);
                        var newDate = new Date(yy, mm, dd, h, m, s);
                        $("#fupdate").AnyPicker({
                            mode: "datetime",

                            showComponentLabel: true,

                            dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
                            onInit: function() {
                                oAP1 = this;
                                oAP1.setSelectedDate(newDate);
                            }
                        });
                    } else {
                        $("#fupdate").AnyPicker({
                            mode: "datetime",

                            showComponentLabel: true,

                            dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
                        });
                    }
                    if (response['0'].sitevisit_date != null) {
                        var date = response['0'].sitevisit_date;
                        var yy = date.substr(0, 4);
                        var mm = parseInt(date.substr(5, 2));
                        var dd = date.substr(8, 2);
                        var h = date.substr(11, 2);
                        var m = date.substr(14, 2);
                        var s = date.substr(17, 2);
                        var newDate = new Date(yy, mm, dd, h, m, s);
                        $("#svdate").AnyPicker({
                            mode: "datetime",

                            showComponentLabel: true,

                            dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
                            onInit: function() {
                                oAP1 = this;
                                oAP1.setSelectedDate(newDate);
                            }
                        });
                    } else {
                        $("#svdate").AnyPicker({
                            mode: "datetime",

                            showComponentLabel: true,

                            dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
                        });
                    }

                    $("#sdetail").val(response['0'].lead_source_detail);

                });

            },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    $("#fail").snackbar("show");
                }
        });

        $(".save").click(function() {
            if($("#email").parent(".form-group").hasClass("has-error"))
            {
                var content="<i class='material-icons wrong'>close</i>&nbsp;&nbsp;Please provide correct EmailId!";
                $("#error").attr("data-content",content);
                $("#error").snackbar("show"); 
                return false;
            }
            var formData = "user_name="+ sessionStorage.username+"&session_id="+ sessionStorage.sessionId +"&id=" + id + "&name=" + $('#name').val() + "&email=" + $('#email').val() + "&phone=" + $('#phone').val() + "&project_name=" + $('#project').val() + "&project_id=" + pid + "&status=" + $('#status').val() + "&lead_source=" + $('#agent').val() + "&description=" + $('#desc').val() + "&rating=" + $('#rating').val() + "&follow_up_date=" + $('#fupdate').val() + "&lead_source_detail=" + $('#sdetail').val() + "&sitevisit_date=" + $('#svdate').val();
            $.ajax({
                type: "POST",
                url: 'http://192.168.8.49/crm_svn/index.php?entryPoint=editLeadApp',
                ContentType: 'multipart/form-data',
                data: formData,
                beforeSend: function() {
                    $(".table.detailTable tbody .save").html("Saving Data &nbsp;&nbsp;&nbsp;<i class='fa fa-spinner fa-spin' aria-hidden='true'></i>");
                },
                success: function(response) {
                    var response= JSON.parse(response);
                    //alert(response.status);
                    if(response.status!='Success')
                    {
                        var content="<i class='material-icons wrong'>close</i>&nbsp;&nbsp;"+response.status;
                        $("#error").attr("data-content",content);
                        $("#error").snackbar("show");   
                    }
                    else
                    {
                        $("#success").snackbar("show");
                    }
                    $(".table.detailTable tbody .save").html("Save");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    $("#fail").snackbar("show");
                    $(".table.detailTable tbody .save").html("Save");
                }

            });

        });
        $(window).scroll(function() {
            var height = $(".toolbar").outerHeight();

            if ($(this).scrollTop() > height) {
                //$('.toolbar').slideUp("fast");
                $('.toolbar').css({
                    "position": "fixed",
                    "top": "0",
                    "z-index": "999"
                });
            } else {
                $('.toolbar').css({
                    "position": "static"
                });
            }
        });
    } else {
        window.location.href = "index.html";
    }
});