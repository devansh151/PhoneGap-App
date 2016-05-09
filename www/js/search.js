$(document).ready(function(){
app.initialize();
        $.material.init();
        $.material.ripples();
        $("select").dropdown({
            "optionClass": "withripple"
        });
        $().dropdown({
            autoinit: "select"
        });
        $(".search").click(function(){

          var lname=$("#lname").val();
          var email=$("#email").val();
          var tel=$("#tel").val();
          var pname=$("#pname").val();

           $.ajax({
              type:'GET',
              url:'http://192.168.9.52/crm_svn/index.php?entryPoint=crmAppJson&name='+lname+'&email='+email+'&phone='+tel+'&project_name='+pname,
              dataType:'json',
              beforeSend:function(){
                $(".search-form").fadeOut("fast");
                   $(".loader").fadeIn("fast");
                 
                
              },
              success:function(result){
                var result = $.parseJSON(JSON.stringify(result));
                //alert(result.length);
                 $(".loader").fadeOut("slow",function(){
                  $(".search-results").fadeIn();
                  if(result.length)
                  {
                      $(".result-line").html("<span class='badge result-badge'>"+result.length+"</span> Lead(s) Found !!");
                  }
                  else
                  {
                    $(".result-line").html("<span class='badge result-badge'>"+result.length+"</span> Leads Found !! Try with filters.");
                  }
                  $(".search-results table tbody").html("");
                    $.each(result, function(key,value) {
                            node='<tr id="'+ value.id +'">\
                            <td class="width"><i class="material-icons edit">edit</i></td>\
                            <td>'+ value.name +'</td>\
                            <td>'+ value.lead_source +'</td>\
                          </tr>';
                        
                          $(".search-results table tbody").append(node); 
                        
                    });
                    $(".one-badge,.two-badge,.no-badge").html("");
                    var filters=0;
                    $( ".search-form input" ).each( function( index, element ){
                        if($(this).val())
                        {

                          filters++;
                          
                          if(filters==1)
                          {
                            $(".one-badge").html($(this).val());
                          }
                          if(filters==2)
                          {
                            $(".two-badge").html($(this).val());
                          }
                          if(filters > 2)
                          {
                            var num=filters-2;
                            $(".no-badge").html("+"+num); 
                          }
                        }
                    });
                    if(filters==0)
                    {
                      $(".no-badge").html("No Filters"); 
                    }
                });

                $(".modify-filter").removeClass("hidden");
                
              }

            });
        });

        $(".modify-filter").click(function(){

            $(".search-results").fadeOut("fast");
            $(".search-form").fadeIn("slow");
        });


         $(document).on('click','.search-results table tr',function(){
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
                    $('.toolbar').css({"position":"fixed","top":"0","z-index":"999"});
                   }
                   else
                   {
                      $('.toolbar').css({"position":"static"});
                   }
               });

});