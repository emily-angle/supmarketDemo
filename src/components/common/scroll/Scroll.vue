<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈',
        timer: null
      }
    },
    mounted() {
      this.initScroll()
    },
    methods: {
      initScroll() {
        // 1.创建BScroll对象
        // this.$nextTick(() => {
        //   if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          pullUpLoad: this.pullUpLoad,
          probeType: this.probeType
        })

        // 2.监听滚动的位置
        if (this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
          })
        }

        // 3.监听上拉事件
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }

        // } else {
        //   this.scroll.refresh()
        // }
        // })
      },
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        if (this.scroll) this.scroll.finishPullUp()
      }, refresh() {
        if (this.scroll) this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
