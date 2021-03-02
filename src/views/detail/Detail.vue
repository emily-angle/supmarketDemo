<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" ref="base"></detail-swiper>
      <detail-base-info :goods="goodInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @refreshImgLoad="refreshImg"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-recommend-info :recommend-list="recommendList" ref="recommend"></detail-recommend-info>
    </scroll>
    <back-top @click="backTop" v-show="showBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
    <toast ref="toast" />
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  // import Toast from "components/common/toast/Toast";
  import BackTop from "components/content/backTop/BackTop";
  import DetailNavBar from "./childcomps/DetailNavBar";
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailBaseInfo from "./childcomps/DetailBaseInfo";
  import DetailShopInfo from "./childcomps/DetailShopInfo";
  import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
  import DetailParamInfo from "./childcomps/DetailParamInfo";
  import DetailCommentInfo from "./childcomps/DetailCommentInfo";
  import DetailRecommendInfo from "./childcomps/DetailRecommendInfo";
  import DetailBottomBar from "./childcomps/DetailBottomBar";


  import {getDetail, getRecommend, GoodsInfo, Shop, GoodsParam} from "network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";
  import {BACKTOP_DISTANCE} from 'common/const'
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      // Toast,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar, BackTop
    },
    data() {
      return {
        message: '加入购物车成功',
        iid: null,
        topImages: [],
        goodInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      this._getDetailData()
      this._getRecommend()
      this.getThemeTopY = debounce(this._getOffsetTops, 100)
    },
    mixins: [itemListenerMixin, backTopMixin],
    beforeUnmount() {
      this.$emitter.off('imgLoad', this.itemImgListener)
    },
    mounted() {
      console.log('详情页')
    },
    methods: {
      ...mapActions(['addCart']),
      refreshImg() {
        this.itemImgListener()
        this.getThemeTopY()
      },
      _getDetailData() {
        const iid = this.$route.params.id
        this.iid = iid
        // 2.请求数据
        getDetail(iid).then(res => {
          // 2.1.获取结果
          const data = res.result
          // 2.2.获取顶部信息
          this.topImages = data.itemInfo.topImages
          // 2.3.获取商品信息
          this.goodInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
          // 2.4.获取店铺信息
          this.shop = new Shop(data.shopInfo)
          // 2.5.获取商品信息
          this.detailInfo = data.detailInfo
          // 2.6.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
          // 2.7.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })

      },
      _getRecommend() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.list
        })
      },
      _getOffsetTops() {
        if (this.$route.name === 'detail') {
          this.themeTopYs = []
          this.themeTopYs.push(this.$refs.base.$el.offsetTop)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
        }
      },
      titleClick(index) {
        // this.getThemeTopY()
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      addToCart() {
        //获取购物车需要展示的内容
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goodInfo.title;
        product.desc = this.goodInfo.desc;
        product.price = this.goodInfo.nowPrice;
        product.iid = this.iid;
        product.checked = true;
        product.count = 1;
        let _this=this
        this.addCart(product).then(() => {
         // this.$toast
          _this.$refs.toast.show('添加成功',2000)
        })
      },
      contentScroll(position) {
        this.showBackTop = position.y < -BACKTOP_DISTANCE
        const scrollY = -position.y
        let length = this.themeTopYs.length

        for (let i = 0; i < length - 1; i++) {
          if (scrollY >= this.themeTopYs[i] && scrollY < this.themeTopYs[i + 1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i
            }
            break;
          }
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
