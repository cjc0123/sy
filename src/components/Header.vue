<template>
  <div>
    <header class="header container">
      <h1 class="logo">
        <router-link to="/dashboard/content" class="link"></router-link>
      </h1>
      <div class="h_con">
        <i class="el-icon-phone-outline" style="font-size:28px"></i>
        <p class="phone">400-006-5916</p>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li>
              <router-link to="/dashboard/content"
                ><span class="icon_home"></span>首页</router-link
              >
            </li>
            <li>
              <router-link to="/dashboard/applyJxs"
                >经销商</router-link
              >
            </li>
            <li>
              <router-link to="/dashboard/orderDetail">订单管理</router-link>
            </li>
            <!-- <li>
              <router-link
                to="/dashboard/dynamic"
                :class="{
                  'router-link-exact-active': $route.name === 'newsDetail',
                }"
                >双宇动态</router-link
              >
            </li> -->
            <li class="nav_pd">
              <router-link
                to="/dashboard/buy"
                :class="{
                  'router-link-exact-active':
                    $route.name === 'buy' || $route.name === 'product_detail',
                }"
                >订购中心
                <!-- <span class="icon_pd"></span> -->
                </router-link>
              <!-- <div class="pd_dropdown">
                <router-link to="/">净美仕净化器</router-link>
                <router-link to="/">净美仕滤网</router-link>
              </div> -->
            </li>
            <li><router-link to="/dashboard/finance">财务中心</router-link></li>
            <li><router-link to="/dashboard/contactUs">联系我们</router-link></li>
          </ul>
        </div>
        <!-- <div class="s_cart" > -->
        <!-- <router-link to="/shop_cart" v-if="data">
            <span class="icon_cart"></span>购物车(<strong id="cart_sum"
              >{{data.products.length}}</strong
            >)<span class="icon_sj"></span>
          </router-link> -->
        <!-- <div class="cart_dropdown"> -->
        <!--<h3>您的购物车为空~</h3>-->
        <!-- <ul> -->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div>-->
        <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
        <!--</div>-->
        <!--<strong>¥1599.00</strong>-->
        <!--<em></em>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div>-->
        <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
        <!--</div>-->
        <!--<strong>¥1599.00</strong>-->
        <!--<em></em>-->
        <!--</li>-->
        <!-- </ul> -->
        <!-- <div class="cd_js clearfloat">
              <span>共计：<strong>0.00</strong></span>
              <a href="#">结算</a>
            </div> -->
        <!-- </div> -->
        <!-- </div> -->
      </div>
    </nav>
  </div>
</template>

<script>
// import { mapActions, mapState } from "vuex";
export default {
  mounted() {
    // this.getData();
  },
  computed: {
    // ...mapState(["uname", "uid",'data']),
  },
  methods: {
    // logout() {
    //   sessionStorage.clear();
    //   this.$store.commit("updateUser");
    // },
    //   getData(){
    //     this.getUserShopData()
    //   },
    //   ...mapActions(['getUserShopData']),
  },
};
</script>

<style scoped>
.nav .router-link-exact-active {
  background: orange;
}
.nav .router-link-exact-active:hover {
  background: orange;
}
</style>

