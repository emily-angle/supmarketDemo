<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @refresh="refreshScroll"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import DetailNavBar from "./childcomps/DetailNavBar";
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailBaseInfo from "./childcomps/DetailBaseInfo";
  import DetailShopInfo from "./childcomps/DetailShopInfo";
  import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
  import DetailParamInfo from "./childcomps/DetailParamInfo";
  import DetailCommentInfo from "./childcomps/DetailCommentInfo";
  import DetailRecommendInfo from "./childcomps/DetailRecommendInfo";

  import {getDetail,getRecommend, GoodsInfo, Shop,GoodsParam} from "network/detail";
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll, DetailGoodsInfo,DetailParamInfo,DetailCommentInfo,DetailRecommendInfo},
    data() {
      return {
        topImages: [],
        goodInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo:{},
        commentInfo:{},
        recommendList:[]
      }
    },
    created() {
      this._getDetailData()
      this._getRecommend()
    },
    mixins:[itemListenerMixin],
    methods: {
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
      refreshScroll() {
        this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
  }
</style>
