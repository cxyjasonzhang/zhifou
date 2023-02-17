<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center align-items-center mb-5">
      <img src="../assets/image/callout.svg" width="350" height="300" alt="">
      <h2 class="mb-3">随心写作，自由表达</h2>
      <button type="button" class="btn btn-primary"><router-link to="/create" style="color: #fff;">开始写文章</router-link></button>
    </div>
    <div class="row">
      <div class="col-4 mb-4" v-for="item in columnList" :key="item._id">
        <div class="card" style="min-height: 312px">
          <div style="text-align: center;" v-if="item.avatar">
            <img :src="item.avatar.url" class="rounded-circle" style="width: 80px;height:80px;" :alt="item.title">
          </div>
          <div class="card-body" style="text-align: center;">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text card-text-style">{{item.description}}</p>
            <!-- <router-link :to="{name:'column',params:{id:item.id}}" class="btn btn-outline-primary">进入专栏</router-link> -->
            <!-- <router-link :to="`/column/${item._id}`" class="btn btn-outline-primary">进入专栏</router-link> -->
            <router-link :to="`/column/${item._id}`">
              <button type="button" class="btn btn-outline-primary">进入专栏</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import defaultImg from '../assets/image/defaultImg.png'
import { defineComponent, PropType, computed } from 'vue';
import { ColumnProps } from '../store/type'
// import { storeToRefs } from 'pinia';
// import { ImageProps } from '../test';
// export interface ColumnProps {
//   _id: number;
//   title: string;
//   avatar?: ImageProps;
//   description: string
// }
export default defineComponent({
  name:"ColumnList",
  props: {
    // PropType 在vue3中用于对props的复杂类型进行验证
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map((item) => {
        if(item.avatar) {
          if(!item.avatar?.url) {
            item.avatar.url = defaultImg
          }
        }
        return item
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-text-style {
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>