//jQuery
setTimeout(function () {
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
}, 6000);

//Vue.js

Vue.component('sellers', { //template for sellers
    props: {
        info: {
            type: Array,
            required: true
        },
        index:{
            type:Number,
            required:true
        }


    },
    template: `
   
            <div class="card card-body p-0 flex-fill border-0">
                <a href="#"class="shop-image position-relative d-block"><img class="position-absolute card-img-top" :src="info[index].images"></a>
                <div class="card-body p-0">
                    <h6 class="letter-space-1 font-primary font-weight-semi-bold"><a href="#" class="text-secondary font-size-secondary link-decoration-none text-hover-primary line-height-lg overflow-hidden">{{info[index].title}}</a></h6>
                   
                </div>
                <div class="card-footer bg-white border-0 p-0">
                    <p class="price text-secondary mb-3">$ {{(info[index].price)/100}}.00</p>
                    <a @click.prevent="updateIndex(index)" href="#" ><i class="ion-eye" @click.prevent="$emit('quick-open')"></i></a>
                    <a href="#"  class="btn btn-default  rounded-0 letter-space-1 text-uppercase  d-none d-md-block" @click.prevent="$emit('cart-show');updateIndex(index);$emit('add-item')" tabindex="0">Shop Now</a>
                </div>  
            </div>             
       
    `,
    methods: {
        updateIndex(index) {//to get index of element
            this.$emit('item-index', index);
        }
    }
});
Vue.component('box', {
    mounted() {
        document.getElementById('app').focus();
    },
    props: {
        info: {
            type: Array,
            required: true
        },
        dIndex: {
            type: Number,
            required: true
        },
    },
    template: `
        <div class="row">
        <i class="close ion-close-round" @click="$emit('quick-close')"></i>
        <div class="col-lg-5" >
        <div class="row ">
            <div class="col-12 col-lg-10 col-md-10 order-md-2">
                <div class="product-carousel mt-5 js-flickity gallery-cell" >
                
                        <img class="  img-fluid w-100" :src="info[dIndex].images[0]">
                        <img class=" img-fluid w-100" :src="info[dIndex].images[1]">
                        <img class="img-fluid w-100" :src="info[dIndex].images[2]">
                        <img class=" img-fluid w-100" :src="info[dIndex].images[0]">
                        <img class=" img-fluid w-100" :src="info[dIndex].images[1]">
                        <img class=" img-fluid w-100" :src="info[dIndex].images[2]">
                        <img class=" img-fluid w-100" :src="info[dIndex].images[3]">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 order-md-1 mt-md-0 mt-3">
                <div class="scroller-carousel mt-5 js-flickity " > 
                    <img :src="info[dIndex].images[0]" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 0px;" aria-hidden="true">
                    <img :src="info[dIndex].images[1]" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 80px;" aria-hidden="true">
                    <img :src="info[dIndex].images[2]" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 160px;" aria-hidden="true">
                    <img :src="info[dIndex].images[0]" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" aria-hidden="true" style="position: absolute; left: 240px;">
                    <img :src="info[dIndex].images[1]" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 320px;" aria-hidden="true">
                    <img :src="info[dIndex].images[2]" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" aria-hidden="true" style="position: absolute; left: 400px;">
                    <img :src="info[dIndex].images[3]" alt="Lavender Wash + Go System with Organic Jojoba Oil for Moisturizing Hair (Step 1 - 4) - CurlMix" role="treeitem" class="carousel-cell" style="position: absolute; left: 160px;" aria-hidden="true">
                </div>
                
            </div>
        </div>
    </div>
    <div class="col-lg-7" > 
        <div class="pro-details text-secondary letter-space-1 mt-5 mt-lg-0 pl-xl-9 pl-lg-7">
            <h6 class="mb-3">
                <span class="my-0 letter-space-1 text-uppercase text-bread-color">STEP 4 OF WASH + GO SYSTEM</span>
            </h6>
            <h4 data-id="" class="mb-2 text-secondary font-secondry">{{info[dIndex].title}}</h4>
            <div class="price-review mb-2 align-items-center row">
                <div class="price-bottle d-flex align-items-center col-sm-7">
                    <div class="price">
                        <span class=" font-weight-normal text-secondary letter-space-1 actual-price mr-1">$ {{(info[dIndex].price)/100}}.00</span>
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
                                                <a href="#" rel="nofollow" @click.prevent="(info[dIndex].compare_at_price_min)--" aria-label="Decrease" title="Decrease" data-qty-decrease="" class=" input-group-text bg-transparent border-right-0 border-secondary px-3">
                                                    <i class="dec-qty ion-android-remove ml-1"></i>
                                                </a>
                                            </div> 
                                            <input type="number" name="quantity" aria-label="quantity" :value="(info[dIndex].compare_at_price_min)+1" step="1" min="1" inputmode="numeric" data-id="}" data-qty-input="" readonly="readonly" class="outline-none h-100 input-group-text form-control border-secondary font-weight-bold text-center border-left-0 border-right-0 bg-transparent font-size-base"> 
                                            <div class="input-group-append">
                                                <a href="#" rel="nofollow" @click.prevent="(info[dIndex].compare_at_price_min)++" aria-label="Increase" title="Increase" data-qty-increase="" class=" input-group-text bg-transparent border-left-0 border-secondary px-3">
                                                    <i class="inc-qty ion-android-add"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <button  @click.prevent="$emit('cart-show');$emit('quick-close');$emit('add-item')" data-qty="1"  class="btn btn-primary text-white text-uppercase letter-space-1 rounded-0 float-left align-items-center justify-content-center px-lg-9 px-md-7 px-5 Shop Now">
                                        <a  class="text-uppercase text-white text-decoration-none add-to-bag" href="javaScript:void(0);" > add to bag</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div> -->
    </div>
    
    `,
});


Vue.component('cart', {
  
    props: {
        info: {
            type: Array,
            required: true
        },
        dIndex: {
            type: Number,
            required: true
        },
        cartItems: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            counter: 1,
        }
    },
    methods: {
        removeItem(index) {
            this.$emit('remove-item', index);
        },

    },
    template: `

        <ul class="cart-items list-none m-0 p-0">
                                    
        <li class="p-3" v-for="(item, index) in cartItems" :key="index">
        <div class="row align-items-center " >
            <div class="col-3">
                <div class="product-img-small">
                    <a href="#"><img class="w-100" :src="item.images[0]"></a>
                </div>
            </div>
            <div class="col-9">
            <div class="product-details d-flex justify-content-between align-items-center">
                <a href="#" class="letter-space-1 font-primary font-weight-normal text-secondary link-decoration-none text-hover-primary">{{item.title}}</a>
                <a href="#" class="remove-product text-danger"><i class="ion-close-round" @click.prevent="removeItem(index)"></i></a>
                </div>
                <ul class="cart-action list-none m-0 p-0 mt-3 d-flex justify-content-between">
                    <li class="cart-quantity">
                        <div class="input-group input-group-sm">
                            <div class="input-group-prepend">
                                <a href="#" rel="nofollow" aria-label="Decrease" @click.prevent="(item.compare_at_price_min)--" id="decrease" title="Decrease" data-qty-decrease="" class="input-group-text bg-transparent border-right-0 border-secondary px-3">
                                    <i class="ion-android-remove ml-1"></i>
                                </a>
                            </div> 
                            <input type="number" name="quantity" aria-label="quantity" :value="item.compare_at_price_min+1" step="1" min="1" inputmode="numeric" data-qty-input="" readonly="readonly" class="quantity outline-none h-100 input-group-text form-control border-secondary font-weight-bold text-center border-left-0 border-right-0 bg-transparent font-size-base"> 
                            <div class="input-group-append">
                                <a href="#" rel="nofollow" aria-label="Increase"  @click.prevent="(item.compare_at_price_min)++" id="increase" title="Increase" data-qty-increase="" class="input-group-text bg-transparent border-left-0 border-secondary px-3">
                                    <i class="ion-android-add"></i>
                                </a>
                            </div>
                        </div>                       
                    </li>
                    <li class="prouct-price">$ {{((item.price)*(item.compare_at_price_min+1))/100}}</li>
                </ul>
            </div>
        </div>
    </li>                       
                                        
        </ul>
        
    `,

});

var app = new Vue({ //new vue instance
    el: '#app', //to connect to app element of html
   
    data: {
            info: [],
            cartItem: 0,
            active: 0,
            quickActive: 0,
            dIndex: -1,
            cartItems: [],
            qty: 0
    },
    mounted() {
        axios
            .get('https://curlmix.com/collections/all?view=products.json')
            .then(response => {
                this.info = response.data;
            });
    },
    methods: {
        cartShow() {
            this.active = 1
        },
        cartClose() {
            this.active = 0
        },
        quickOpen() {
            this.quickActive = 1;
        },
        quickClose() {
            this.quickActive = 0;
        },
        getIndex(index) {
            // console.log(index);
            this.dIndex = index;
        },
        Close() {
            if (this.quickActive === 1) {
                this.quickClose();
            } else if (this.active === 1) {
                this.cartClose();
            }

        },
        addItem() {
            let sid = this.info[this.dIndex].id; //fetch id of incoming item
            let flag = 0;
            const s = this.cartItems;
            // console.log(s.length);
            if (s.length != 0) {
                for (let i = 0; i < s.length; i++) {
                    if (sid === s[i].id) { //check if id exists in cart
                        //increase qty
                        this.info[this.dIndex].compare_at_price_min++;
                        flag = 1;
                    }

                }
                if (flag === 0) {
                    s.push(this.info[this.dIndex]); //else push the item
                    this.cartItem++;
                }
            } else {
                s.push(this.info[this.dIndex]); //push if no item in array
                this.cartItem++;
            }
        },
        removeItem(ind) {
            this.cartItem--;
            this.cartItems.splice(ind, 1);
            this.info[this.ind].compare_at_price_min = 0;
        },

        addprice(){//subtotal price increase and decrease
            let sum=0;
            for(let p=0;p<this.cartItems.length;p++){
              console.log(((this.cartItems[p].compare_at_price_min)+1) * (this.cartItems[p].price)/100);
              sum +=  ((this.cartItems[p].compare_at_price_min)+1) * (this.cartItems[p].price)/100;
              console.log(sum);
            }
              return sum;
            
          },

    },
});