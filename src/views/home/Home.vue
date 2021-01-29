<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" v-show="isTabFixed"
                 ref="tabControl1"
    ></tab-control>
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll" @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :bannners="bannners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recomends="recomends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"
      ></tab-control>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodList from "components/content/goods/GoodsList";
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from "components/content/backTop/BackTop";


  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {itemListenerMixin} from "common/mixin";
  export default {
    name: "Home",
    components: {Scroll, GoodList, NavBar, HomeSwiper, RecommendView, FeatureView, TabControl, BackTop},
    data() {
      return {
        bannners: null,
        recomends: null,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }, currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mixins:[itemListenerMixin],
    created() {
      //1.请求多个数据
      this.promiseAll([this.getHomeMultidata(), this.getHomeGoods('pop'), this.getHomeGoods('new'), this.getHomeGoods('sell')])
    },
    mounted() {
    },
    methods: {
      /**
       * 网络请求相关方法
       * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.bannners = res.banner.list;
          this.recomends = res.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].page = page
          this.goods[type].list.push(...res.list)
        })
      },
      promiseAll(promises) {
        Promise.all(promises).then(() => {
        }).catch(e => {
          console.log(e)
        })
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },

      /**
       * 事件监听相关方法
       * */
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y > 1000) ? true : false
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 99;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
