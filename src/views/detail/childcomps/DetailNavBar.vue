<template>
  <div class="detail-nav">
    <!--导航-->
    <nav-bar>
      <template v-slot:left>
        <div class="back-img" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles" :key="item" class="title-item" :class="{active:index===currentIndex}"
               @click="titleClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {NavBar},
    props:{
      currentIndex:{
        type:Number,
        default(){
          return 0
        }
      }
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐']
      }
    },
    methods: {
      titleClick(index) {
        // this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    background-color: #fff;
    font-weight: normal;
    z-index: 1;
    position: relative;
  }
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back-img img {
    margin-top: 12px;
  }
</style>
