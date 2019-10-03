"use strict";
$( document ).ready( function(){
    var y=0;
    $("#loadMore").click(function(event){
       $.getJSON('https://curlmix.com/collections/all?view=products.json', function(data) {
       

            var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
            $.each(data, function (index, value) {
                arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
            });

            
            console.log(arrItems[0].images[0]);
           
            
            for(var j=y;j<arrItems.length;j+=4){
                for(var i=j;i<j+4;i++)
                {
                    $(".best-sellers .container .loadValues").append('<div class="col-6  col-lg-3 py-3 text-center px-xl-4 d-flex  "><div class="card card-body p-0 flex-fill border-0 "><a href="#"class="shop-image position-relative d-block"><img class="position-absolute card-img-top lazyloaded" src="https://'+arrItems[i].images+'"></a><div class="card-body p-0"><h6 class="letter-space-1 font-primary font-weight-semi-bold"><a href="#" id='+arrItems[i].id+' class="text-secondary font-size-secondary link-decoration-none text-hover-primary line-height-lg overflow-hidden">'+arrItems[i].title+'</a></h6></div><div class="card-footer bg-white border-0 p-0"><p class="price text-secondary mb-3">$'+arrItems[i].price+'</p><a href="#" class="btn btn-default  rounded-0 letter-space-1 text-uppercase  d-none d-md-block" tabindex="0">Shop Now</a></div></div></div>');
                }
                break;
                
            }

           
            y+=4;

            if(i==arrItems.length){
                $("#load-section").addClass("d-none");
            }

       });
       
    });
        
 });

