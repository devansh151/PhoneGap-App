$(document).ready(function(){
	app.initialize();
    $.material.init();
    $.material.ripples();
    $(".reload").attr("href",window.location.href);
        $.ajax({
        	type:'GET',
        	url:'http://192.168.9.52/crm_svn/index.php?entryPoint=crmAppJson',
        	dataType:'json',
        	beforeSend:function(){
        		$(".loader").fadeIn("fast");
        	},
        	success:function(response){
        		
        		//alert(JSON.stringify(response));
           $(".loader").fadeOut("slow",function(){
                $.each(response, function(key,value) {
                        node='<tr id="'+ value.id +'">\
                        <td class="width"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>\
                        <td>'+ value.name +'</td>\
                        <td>'+ value.lead_source +'</td>\
                        <td>'+ value.project_name +'</td>\
                      </tr>';
                    if(value.lead_type=='New')
                    {
                        $("#activityContent #newLeads table tbody").append(node);
                    }
                    else
                    {
                        $("#activityContent #followUpLeads table tbody").append(node); 
                    }
                });
            });

        	}

        });

        $(document).on('click','#activityContent table tr',function(){
          var id=$(this).attr("id");
          //alert("aa");
          if(id!=null)
          window.location.href="leadDetail.html?id="+id;
        });

        $(window).scroll(function() {
                  var height=$(".toolbar").outerHeight();
                  
                   if ($(this).scrollTop() > height)
                   {
                    //$('.toolbar').slideUp("fast");
                    $('.activityTabs').css({"position":"fixed","top":"0","z-index":"999"});
                   }
                   else
                   {
                      $('.activityTabs').css({"position":"static"});
                   }
        });


});