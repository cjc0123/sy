<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(item, index) of banners" :key="index">
        <img :src="item" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-prev"></div>
    </swiper>
    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title-icon"><a href="#" class="more">More</a>产品分类</h2>
        <ul class="clearfloat product-ul">
          <li v-for="(item,index) of categories" :key="index">
            <a href="#" class="link">
              <img :src="item.pic" alt=""/>
            </a>
            <p style="">{{item.cateName}}</p>
            <div class="child-category" style="display:flex;">
              
              <div v-for="(item1,index1) of item.children" :key="index1">
                <!-- <div style="width:30px;height:30px;"><img :src="item1.pic" alt=""></div> -->
                <a>
                  <span style="">{{item1.cateName}}</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper' // js 模块
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
Swiper.use([Pagination, Navigation, Autoplay]);
import { getCategory } from "@/api/yxStoreProduct";
export default {
  data() {
    return {
      swiperOptions: {
        autoplay: {
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      banners: [
        require("../../assets/images/banner-1.jpg"),
        require("../../assets/images/banner-2.jpg"),
        require("../../assets/images/banner-3.jpg"),
        require("../../assets/images/banner-4.jpg"),
      ],
      categories:[],
      // childCategories:[],
    };
  },
  mounted() {
    this.getCategory();
    this.timer = setInterval(() => {
      this.next();
    }, 8000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    next() {
      this.banner_cur = (this.banner_cur + 1) % this.banners.length;
    },
    prev() {
      this.banner_cur =
        this.banner_cur - 1 < 0 ? this.banners.length - 1 : this.banner_cur - 1;
    },
    getCategory(){
      getCategory().then(res=>{
        console.log(res);
        this.categories = res.data;
        
      })
    },
    
   
  },
  
}
</script>

<style scope>
.child-category{
  width: 100%;
  justify-content:space-around;
}
.product-ul>li{
  width: 280px !important;
  height: 280px !important;
  margin: 0 20px !important;
}
</style>