import {debounce} from "./utils";

export const itemListenerMixin={
  mounted(){
    let newRefresh=debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener=()=>{
      newRefresh()
    }
    this.$emitter.on('imgLoad', this.itemImgListener)
    console.log("这是混入中的内容");
  }
}
