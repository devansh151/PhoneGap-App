$(document).ready(function(){
	app.initialize();
    $.material.init();
    $.material.ripples();
	$(".login").click(function(){
		var username=$("#username").val();
		var password=$("#password").val();
		if(username !='' && password !='')
		{
			var formData="user_name="+username+"&password="+password+"&login_request=1";
			$.ajax({
				type:'POST',
				url:'http://192.168.9.52/crm_svn/index.php?entryPoint=crmAppLogin',
				ContentType: 'multipart/form-data',
                data: formData,
                beforeSend: function(){
                  
                },
                success:function(response){
                  alert(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.log(textStatus, errorThrown);
                }
			});
			sessionStorage.someKey = 'someValue';
			window.location.href="activity.html";
		}
		else
		{
			$("span.error").fadeIn();
		}
	});
    
});