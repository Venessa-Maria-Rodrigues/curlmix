//javascript section

window.addEventListener('load', (e) => {
    e.preventDefault();
    class arrPro {
        constructor() {
            this.pros = [];
        }

        addPro(id) {
            const pro = {
                id
            }
            this.pros.push(pro);
            return pro;
        }
    }

    fetch('https://curlmix.com/collections/all?view=products.json')
        .then(response => {
            return response.json()
        })
        .then(data => {

            //   console.log(data)
            let x = 0

            let arrItems = new arrPro;

            data.forEach((i) => {
                x = arrItems.addPro(i);

            });


            addToPage(arrItems.pros);


        }) //end of data block
        .catch(err => {
            console.log(err);
            alert("error loading collections  :(")
        })
});



function addToPage(product) {

    let markup;

    for (let j = 0; j < product.length; j++) {
        markup = '<div class=" product-display col-6  col-lg-3 py-3 text-center px-xl-4 d-flex" data-id="' + product[j].id.id + '"><div class="card card-body p-0 flex-fill border-0"><a href="#"class="shop-image position-relative d-block"><img class="position-absolute card-img-top" src="https:' + product[j].id.images + '"></a><div class="card-body p-0"><h6 class="letter-space-1 font-primary font-weight-semi-bold"><a href="#" class="text-secondary font-size-secondary link-decoration-none text-hover-primary line-height-lg overflow-hidden">' + product[j].id.title + '</a></h6></div><div class="card-footer bg-white border-0 p-0"><p class="price text-secondary mb-3">$ ' + product[j].id.price + '</p><p>  <i class="ion-eye" data-index="' + j + '" onclick="quickView(' + j + ')" ></i></p><a href="#" class="btn btn-default cart-add rounded-0 letter-space-1 text-uppercase  d-none d-md-block" data-id="' + j + '" tabindex="0">Shop Now</a></div></div></div>';

        document.querySelector('.best-sellersinfo').insertAdjacentHTML('beforeend', markup);



    };




    function ShopNow(sid) { //to add into cart from main shop now


        if (checkCart(product[sid].id.id)) {
            var cid = product[sid].id.id;
            var cprice = product[sid].id.price;
            var ctitle = product[sid].id.title;
            var cimage = product[sid].id.images[0];
            var qty = 1;


            const cmarkup = `
                <li class="p-3 cart-product">
                    <div class="row align-items-center">
                    <div class="col-3">
                        <div class="product-img-small">
                            <a href="#"><img class="w-100" src="http:${cimage}"></a>
                        </div>
                    </div>
                    <div class="col-9">
                    <div data-id=${cid} class="product-details d-flex justify-content-between align-items-center">
                        <a href="javascript:void(0);" class="letter-space-1 font-primary font-weight-normal text-secondary link-decoration-none text-hover-primary">${ctitle}</a>
                        <a href="javascript:void(0);" class=" text-danger"><i class="remove-product ion-close-round"></i></a>
                        </div>
                        <ul class="cart-action list-none m-0 p-0 mt-3 d-flex justify-content-between">
                            <li class="cart-quantity">
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <a href="javascript:void(0);" rel="nofollow" aria-label="Decrease" id="decrease" title="Decrease" data-qty-decrease="" class="input-group-text bg-transparent border-right-0 border-secondary px-3">
                                            <i class="dec-qty ion-android-remove ml-1"></i>
                                        </a>
                                    </div> 
                                    <input type="number" name="quantity" aria-label="quantity" value="${qty}" step="1" min="1" inputmode="numeric" data-qty-input="" readonly="readonly" data-id=${cid} class="quantity outline-none h-100 input-group-text form-control border-secondary font-weight-bold text-center border-left-0 border-right-0 bg-transparent font-size-base"> 
                                    <div class="input-group-append">
                                        <a href="javascript:void(0);" rel="nofollow" aria-label="Increase" id="increase" title="Increase" data-qty-increase="" class="input-group-text bg-transparent border-left-0 border-secondary px-3">
                                            <i class="inc-qty ion-android-add"></i>
                                        </a>
                                    </div>
                                </div>                       
                            </li>
                            <li class="prouct-price">$${cprice}</li>
                        </ul>
                    </div>
                </div>
                </li>
            
            
            
            `;

            document.querySelector('.cart-items').insertAdjacentHTML('beforeend', cmarkup);

        } else {

            searchCartitem(product[sid].id.id);
        }



    }



    document.querySelector('.cart-items').addEventListener('click', e => {
        if (e.target.matches('.remove-product')) {
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove(); //to remove an element from cart
        } else if (e.target.matches('.inc-qty,.dec-qty')) {
            e.preventDefault();
            e.stopPropagation();
            if (e.target.matches('.inc-qty')) {
                var id = e.target.parentNode.parentNode.previousElementSibling.getAttribute('data-id');
            } else {
                var id = e.target.parentNode.parentNode.nextElementSibling.getAttribute('data-id');
            }

            console.log(id);
            incDecQty(e.target, id);
        }
    })






    //to show and hide cart

    document.querySelector('.cart-icon').addEventListener('click', (e) => {
        document.querySelector('.cart-section').style.display = 'block';
        e.stopPropagation();
        document.querySelector('.dark-wrapper').classList.add('dark');
    });

    document.querySelector('.cart-section').addEventListener('click', e => {
        e.stopPropagation();
    })

    document.addEventListener('click', e => {
        if (!e.target.matches('.cart-section').length) {
            document.querySelector('.cart-section').style.display = 'none';
            document.querySelector('.dark-wrapper').classList.remove('dark');
        }

        if (!e.target.matches('.quickViewBox').length) {
            document.querySelector('.quickViewBox').style.display = 'none';
        }
    });

    document.querySelector('.closebtn').addEventListener('click', () => {
        document.querySelector('.cart-section').style.display = 'none';
        document.querySelector('.dark-wrapper').classList.remove('dark');
    });







    //event delegation to add to cart
    document.querySelector('.best-sellersinfo').addEventListener('click', e => {
        // console.log(e);
        if (e.target.matches('.cart-add')) {
            e.preventDefault;
            e.stopPropagation();
            document.querySelector('.cart-section').style.display = 'block';
            document.querySelector('.dark-wrapper').classList.add('dark');

            ShopNow(e.target.getAttribute('data-id'));

        } else if (e.target.matches('.ion-eye')) {
            e.preventDefault();
            e.stopPropagation();

        }

    });

    document.querySelector('.cart-items').addEventListener('click', e => {
        if (e.target.matches('.remove-product')) {
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove(); //to remove an element from cart
        }
    });

};

//to check if iem already exists in cart or not
function checkCart(id) {
    // console.log(id);
    var flag = 0;
    var cart = document.querySelector('.cart-items');
    if (cart.children.length != 0) {

        //console.log(cart.children)   //this will return an array of children or items in cart
        var arr = cart.children;
        //  console.log(arr.length);
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr.item(i));//to loop over items
            var sid = arr.item(i).firstElementChild.children[1].firstElementChild.getAttribute('data-id'); //fecth id of cureent product
            //  console.log(sid);   //get id of selected item
            //  console.log(id!=sid);  
            if (id != sid) {
                flag = 0;

            } else {
                flag = 1;
                break;
            }
        }
        //  console.log(flag);
        if (flag == 1) {
            return false; //dont add item
        } else {
            return true; //add item;
        }

    } else {
        return true; //add item if no item ever added
    }


}

function searchCartitem(id) {  //increment value in cart for existing value
    

    var cart = document.querySelector('.cart-items');
    var arr = cart.children;
    for (let i = 0; i < arr.length; i++) {
        var sid = arr.item(i).firstElementChild.children[1].firstElementChild.getAttribute('data-id'); //compare sid to id

        if (id == sid) {
            var oldVal=arr.item(i).firstElementChild.children[1].lastElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.getAttribute('value');
            oldVal++;
            arr.item(i).firstElementChild.children[1].lastElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.setAttribute('value',oldVal);

        }
    }
}
//inc dec qty of item
function incDecQty(qtyStr, id) {



    if (qtyStr.matches('.inc-qty')) {
        qty = parseInt(qtyStr.parentNode.parentNode.previousElementSibling.value);
        // console.log(qty) //extract value of curr qty
        qty += 1;
        qtyStr.parentNode.parentNode.previousElementSibling.value = qty; //manipulate the qty
        qtyStr.parentNode.parentNode.parentNode.parentNode.nextElementSibling.setAttribute('data-qty', qty); //set the amt of quantity to be sent to cart in button addtobag
    } else {
        qty = parseInt(qtyStr.parentNode.parentNode.nextElementSibling.value);
        if (qty > 0) {
            qty -= 1;
            qtyStr.parentNode.parentNode.nextElementSibling.value = qty;
        }

    }


}


function quickView(ind) {

    $('.quickViewBox').empty();
    // console.log(ind);
    document.querySelector('.quickViewBox').style.display = 'block'; //to show the box





    // get data to display in box

    $.getJSON('https://curlmix.com/collections/all?view=products.json', function (data) {

        var sid = data[ind].id;
        var sprice = data[ind].price;
        var stitle = data[ind].title;
        var images = data[ind].images;


        setTimeout(function () { //slower loading of flickity for ajax data

            $('.product-carousel').flickity({
                // options

                adaptiveHeight: true,
                percentPosition: false,
                imagesLoaded: true,
                wrapAround: false,
                contain: true,
                freeScroll: false,
                prevNextButtons: false,
                pageDots: false,
                lazyLoad: true,
                dragThreshold: 20,

            });

            $('.scroller-carousel').flickity({
                // options

                asNavFor: ".product-carousel",
                draggable: true,
                percentPosition: false,
                cellAlign: 'left',
                groupCells: true,
                prevNextButtons: true,
                contain: true,
                pageDots: false,
                verticalCells: true,
                arrowShape: {
                    x0: 10,
                    x1: 60,
                    y1: 50,
                    x2: 70,
                    y2: 45,
                    x3: 25
                }


            });


        }, 10);


        //slider html

        const sliderMarkup = `
            <div class="row">
                <i class="close ion-close-round"></i>
            <div class="col-lg-5">
                <div class="row ">
                    <div class="col-12 col-lg-10 col-md-10 order-md-2">
                        <div class="product-carousel mt-5 js-flickity gallery-cell" >
                        
                                <img class="  img-fluid w-100" src="https:${images[0]}">
                                <img class=" img-fluid w-100" src="https:${images[1]}">
                                <img class="img-fluid w-100" src="https:${images[2]}">
                                <img class=" img-fluid w-100" src="https:${images[0]}">
                                <img class=" img-fluid w-100" src="https:${images[1]}">
                                <img class=" img-fluid w-100" src="https:${images[2]}">
                                <img class=" img-fluid w-100" src="https:${images[0]}">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 order-md-1 mt-md-0 mt-3">
                        <div class="scroller-carousel mt-5 js-flickity " > 
                            <img src="https:${images[0]}" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 0px;" aria-hidden="true">
                            <img src="https:${images[1]}" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 80px;" aria-hidden="true">
                            <img src="https:${images[2]}" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 160px;" aria-hidden="true">
                            <img src="https:${images[0]}" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" aria-hidden="true" style="position: absolute; left: 240px;">
                            <img src="https:${images[1]}" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 320px;" aria-hidden="true">
                            <img src="https:${images[2]}" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" aria-hidden="true" style="position: absolute; left: 400px;">
                            <img src="https:${images[0]}" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 160px;" aria-hidden="true">
                        
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="pro-details text-secondary letter-space-1 mt-5 mt-lg-0 pl-xl-9 pl-lg-7">
                    <h6 class="mb-3">
                        <span class="my-0 letter-space-1 text-uppercase text-bread-color">STEP 4 OF WASH + GO SYSTEM</span>
                    </h6>
                    <h4 data-id="${sid}" class="mb-2 text-secondary font-secondry">${stitle}</h4>
                    <div class="price-review mb-2 align-items-center row">
                        <div class="price-bottle d-flex align-items-center col-sm-7">
                            <div class="price">
                                <span class=" font-weight-normal text-secondary letter-space-1 actual-price mr-1">$${sprice}</span>
                            </div>
                            <div class="bottle-size ml-4">
                                <p class="font-size-small text-old-price letter-space-1 mb-0">8 oz bottle</p>
                            </div>
                        </div>
                        <div class="review-bar col-sm-5 d-flex justify-content-sm-end my-sm-0 my-3">
                            <a href="#" class="d-block text-decoration-none">
                                <div  class="loox-rating">
                                    <i class=" h4 ion-android-star text-review-star "></i>
                                    <i class="h4 ion-android-star text-review-star"></i>
                                    <i class="h4 ion-android-star text-review-star"></i>
                                    <i class="h4 ion-android-star text-review-star"></i>
                                    <i class="h4 ion-android-star text-review-star"></i>
                                    <span class="text-secondary font-size-small letter-space-1">43 Reviews</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <form class="mt-3">
                        <div class="subscribe row mb-4">
                            <div class="col-12">
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="clearfix">
                                            <div class="qty mr-2 mr-sm-3 float-left qty-wrapper">
                                                <div class="input-group input-group-sm">
                                                    <div class="input-group-prepend">
                                                        <a href="#" rel="nofollow" aria-label="Decrease" title="Decrease" data-qty-decrease="" class=" input-group-text bg-transparent border-right-0 border-secondary px-3">
                                                            <i class="dec-qty ion-android-remove ml-1"></i>
                                                        </a>
                                                    </div> 
                                                    <input type="number" name="quantity" aria-label="quantity" value="1" step="1" min="1" inputmode="numeric" data-id="${sid}" data-qty-input="" readonly="readonly" class="outline-none h-100 input-group-text form-control border-secondary font-weight-bold text-center border-left-0 border-right-0 bg-transparent font-size-base"> 
                                                    <div class="input-group-append">
                                                        <a href="#" rel="nofollow" aria-label="Increase" title="Increase" data-qty-increase="" class=" input-group-text bg-transparent border-left-0 border-secondary px-3">
                                                            <i class="inc-qty ion-android-add"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <button  data-qty="1" data-id="${ind}" class="btn btn-primary text-white text-uppercase letter-space-1 rounded-0 float-left align-items-center justify-content-center px-lg-9 px-md-7 px-5 Shop Now">
                                                <a class="text-uppercase text-white text-decoration-none add-to-bag" href="javaScript:void(0);" > add to bag</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>

            `;



        document.querySelector('.quickViewBox').insertAdjacentHTML('beforeend', sliderMarkup); //append in quickview box 

        document.querySelector('.quickViewBox').addEventListener('click', e => { //event delegation for quickbox
            e.stopPropagation();
            if (e.target.matches('.close')) {
                // console.log(e.target);
                document.querySelector('.quickViewBox').style.display = 'none';
            } else if (e.target.matches('.add-to-bag')) {
                e.preventDefault();
                e.stopPropagation();

                document.querySelector('.cart-section').style.display = 'block';
                document.querySelector('.dark-wrapper').classList.add('dark');
                document.querySelector('.quickViewBox').style.display = 'none';

                var cid = e.target.parentNode.getAttribute('data-id');
                var cqty = e.target.parentNode.getAttribute('data-qty');
                addToCart(cid, cqty);


            } else if (e.target.matches('.inc-qty,.dec-qty')) {
                e.preventDefault();
                e.stopPropagation();
                if (e.target.matches('.inc-qty')) {
                    var id = e.target.parentNode.parentNode.previousElementSibling.getAttribute('data-id');
                } else {
                    var id = e.target.parentNode.parentNode.nextElementSibling.getAttribute('data-id');
                }

                console.log(id);
                incDecQty(e.target, id);
            }

        });

        function addToCart(id, qty) {

            if (checkCart(data[id].id)) {
                var cid = data[id].id;
                var cprice = data[id].price;
                var ctitle = data[id].title;
                var cimage = data[id].images[0];




                const cmarkup = `
                    <li class="p-3 cart-product">
                        <div class="row align-items-center">
                        <div class="col-3">
                            <div class="product-img-small">
                                <a href="#"><img class="w-100" src="http:${cimage}"></a>
                            </div>
                        </div>
                        <div class="col-9">
                        <div data-id="${cid}" class="product-details d-flex justify-content-between align-items-center">
                            <a href="javascript:void(0);" class="letter-space-1 font-primary font-weight-normal text-secondary link-decoration-none text-hover-primary">${ctitle}</a>
                            <a href="javascript:void(0);" class=" text-danger"><i class="remove-product ion-close-round"></i></a>
                            </div>
                            <ul class="cart-action list-none m-0 p-0 mt-3 d-flex justify-content-between">
                                <li class="cart-quantity">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <a href="#" rel="nofollow" aria-label="Decrease" id="decrease" title="Decrease" data-qty-decrease="" class="input-group-text bg-transparent border-right-0 border-secondary px-3">
                                                <i class="dec-qty ion-android-remove ml-1"></i>
                                            </a>
                                        </div> 
                                        <input type="number" name="quantity" aria-label="quantity" value="${qty}" step="1" min="1" inputmode="numeric" data-qty-input=""  data-id=${cid} readonly="readonly" class="quantity outline-none h-100 input-group-text form-control border-secondary font-weight-bold text-center border-left-0 border-right-0 bg-transparent font-size-base"> 
                                        <div class="input-group-append">
                                            <a href="#" rel="nofollow" aria-label="Increase" id="increase" title="Increase" data-qty-increase="" class="input-group-text bg-transparent border-left-0 border-secondary px-3">
                                                <i class="inc-qty ion-android-add"></i>
                                            </a>
                                        </div>
                                    </div>                       
                                </li>
                                <li class="prouct-price">$${cprice}</li>
                            </ul>
                        </div>
                    </div>
                    </li>
                
                
                
                `;

                document.querySelector('.cart-items').insertAdjacentHTML('beforeend', cmarkup);
            } else {
                searchCartitem(data[id].id);
            }



        }




    });




};