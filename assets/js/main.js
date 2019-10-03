


$(document).on('ready', function() {

  
  $(".search-icon").click(function(){ 
      $(".search-dropdown").slideToggle();

  });
  $(".panel-title").click(function(){
    $("i", this).toggleClass("ion-android-add ion-android-remove");
  });


  $('.best-sellers-slider').flickity({
    // options
   
    wrapAround: true,
    imagesLoaded: true,
    contain: true,
    percentPosition: false,
    lazyLoad: 1,
    groupCells:true,
    pageDots:false,
    prevNextButtons:false  
    
   
  });
 
  $('.hero-carousel').flickity({
    // options
    wrapAround: true,
    imagesLoaded: true,
    contain: true,
    prevNextButtons:false,
    pageDots:false,
  });

  $('.main-slider-mobile').flickity({
    // options
    wrapAround: true,
    imagesLoaded: true,
    contain: true,
    prevNextButtons:false,
    pageDots:false,
  });




  $('.product-carousel').flickity({
    // options
   
    adaptiveHeight: false,
    percentPosition: false, 
    imagesLoaded: true, 
    wrapAround: false,
    contain:true,
    freeScroll:false,
    prevNextButtons:false,
    pageDots:false,
    lazyLoad:true,
    dragThreshold:20,
    arrowShape: { 
      x0: 10,
      x1: 60, y1: 50,
      x2: 60, y2: 45,
      x3: 15
    }

   
  });

  $('.scroller-carousel').flickity({
    // options
   
    asNavFor:".product-carousel",
    draggable:true,
    percentPosition: false, 
    cellAlign: 'left',
    groupCells:true,
    prevNextButtons:true,
    contain:true,
    pageDots:false,
    verticalCells: true,
    arrowShape: { 
      x0: 10,
      x1: 60, y1: 50,
      x2: 70, y2: 45,
      x3: 25
    }

   
  });



// cart section
  $(function () {
    $('.cart-icon').on('click', function(event) {
        // event.preventDefault();
        $('#cart_menu').show();
        $('.dark-wrapper').addClass("dark")
        event.stopPropagation();
        // $('body').addClass('overflow-hidden');
        
    });   
    $('#cart_menu').click( function(event) {
      event.stopPropagation(); // when you click within the content area, it stops the page from seeing it as clicking the body too
      
  });
 
  $('.closebtn').click(function (e){
    $('#cart_menu').hide();    
    $('.dark-wrapper').removeClass("dark")

  }); 

  $(document).click(function (e) {
    if (!$(e.target).is('#cart_menu').length) {
      $('#cart_menu').hide();   
      $('.dark-wrapper').removeClass("dark") 
    }
});  
    
      
    // $('#cart_menu').submit(function(event) {
    //     event.preventDefault();
    //     return false;
    // })


    var oldprice=$(".prouct-price:first").text();
    var oldnumber = Number(oldprice.replace(/[^0-9.-]+/g,""));

    $('a[id=decrease]').on('click',function()
    {
        //current button value
        var qty= ($(this).parents('li')).find('.quantity').val();

        var amt=(($(this).parents('li')).find('.prouct-price').text());
        var number = Number(amt.replace(/[^0-9.-]+/g,""));
        var newAmt=number;
        if(qty>0)
        {
          qty--;

          //new button value
          ($(this).parents('li')).find('.quantity').val(qty);

          ($(this).parents('li')).find('.prouct-price').text("$"+(newAmt-oldnumber));
         
        }
        else if(qty==0){
           $(this).parents('.p-3').css("display","none");
           var cartItems=$(".cart-items-qty").text();
           cartItems--;
             $(".cart-items-qty").text(cartItems);
          // console.log($(this).parents('.p-3'));
        }
      
    });
   
    $('a[id=increase]').on('click',function()
    {
      //curr value of button
      var qty= ($(this).parents('li')).find('.quantity').val();
      var amt=(($(this).parents('li')).find('.prouct-price').text());
      var number = Number(amt.replace(/[^0-9.-]+/g,""));
      var newAmt=number;
          qty++;
          //new value for button
          ($(this).parents('li')).find('.quantity').val(qty);
          ($(this).parents('li')).find('.prouct-price').text("$"+(newAmt+oldnumber))
        
    });

    // $('.remove-product').on('click',function()
    // {
    //   $(this).parents('li').css("display","none");

    // });
  });


    $('.cart-add').on('click',function(event)
    {
   
    
        var cartItems=$(".cart-items-qty").text();
        

        $('#cart_menu').show();
        $('.dark-wrapper').addClass("dark")
        event.stopPropagation();
        
        var price=$(this).parents(".card-footer").siblings(".cart-details").data("price");
        var name=$(this).parents(".card-footer").siblings(".cart-details").data("name");
        var img=$(this).parents(".card-footer").siblings(".cart-details").data("img");
          
          $('.cart-section .cart-menu-wrapper .cart-body .cart-items').append(
            ' <li class="p-3"><div class="row align-items-center"><div class="col-3"><div class="product-img-small"><a href="#"><img class="w-100" src="'+img+'"></a></div></div><div class="col-9"><div class="product-details d-flex justify-content-between align-items-center"><a href="#" class="letter-space-1 font-primary font-weight-normal text-secondary link-decoration-none text-hover-primary">'+name+'</a><a href="#" class="remove-product text-danger"><i class="ion-close-round"></i></a></div><ul class="cart-action list-none m-0 p-0 mt-3 d-flex justify-content-between"><li class="cart-quantity"><div class="input-group input-group-sm"><div class="input-group-prepend"><a href="#" rel="nofollow" aria-label="Decrease" id="decrease" title="Decrease" data-qty-decrease="" class="input-group-text bg-transparent border-right-0 border-secondary px-3"><i class="ion-android-remove ml-1"></i></a></div> <input type="number" name="quantity" aria-label="quantity" value="1" step="1" min="1" inputmode="numeric" data-qty-input="" readonly="readonly" class="quantity outline-none h-100 input-group-text form-control border-secondary font-weight-bold text-center border-left-0 border-right-0 bg-transparent font-size-base"> <div class="input-group-append"><a href="#" rel="nofollow" aria-label="Increase" id="increase" title="Increase" data-qty-increase="" class="input-group-text bg-transparent border-left-0 border-secondary px-3"><i class="ion-android-add"></i></a></div></div></li><li class="prouct-price">$'+price+'</li></ul></div></div></li>')
          // console.log('hello')
          cartItems++;
          $(".cart-items-qty").text(cartItems);

   
    })
    $('.remove-product').on('click',function()
    { 
        var cartItems=$(".cart-items-qty").text();
        $(this).parents('.p-3').remove();
        // console.log('hello')
        cartItems--;
          $(".cart-items-qty").text(cartItems);
     

    });

  $(".navbar-toggler-icon").on('click',function(){
    $('.mobile-nav-drawer').addClass("open")
    $('.site-overlay').addClass("show")

 });
    

$(".icon-close").on('click',function(){
    $('.mobile-nav-drawer').removeClass("open")
    $('.site-overlay').removeClass("show")
 });





//  $(document).keyup(function(e) {
//   if (e.key === "Escape") { // escape key maps to keycode `27`
//      // <DO YOUR WORK HERE>
//      console.log(e.key);
//  }
// });
  

// setTimeout(function(){
//   location.reload();
// },10000);




});


// || event.target.className == 'closebtn'

// || event.key == 27