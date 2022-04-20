<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { cardGetById } from '../../http/api';

const store = useStore();

const cardList = ref();
const username = computed(() => store.state.userName);
onMounted(() => {
  cardGetById(username.value).then((res) => {
    cardList.value = res;
  });
});

</script>

<template>
  <el-card>
    <div class="card-message-box">
      <div class="card-info-box">
        <div class="message-info" v-for="(item) in cardList" :key='item.index' >
          <svg-icon class="message-info-icon" name="user"/>
          <p>{{item.name}}</p>
          <p>ID: {{item.cardid}}</p>
          <p>余额: {{Number(item.balance.$numberDecimal).toFixed(2)}} 元</p>
          <p>累计用量: {{item.cumulative}} 立方</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.card-info-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.message-info{
  background-color: #FE6470;
  width: 300px;
  height: 160px;
  border-radius: 5px;
  margin-block: 10px;
  margin-inline: 14px;
}
.message-info-icon{
  padding: 7px;
  width: 50px;
  height: 50px;
  color: rgb(231, 233, 94);
}
.message-info>:nth-child(2){
  font-size: 1.7em;
  margin-block-start: -60px;
  margin-inline-end: 5px;
}
.message-info>p{
  display: flex;
  color: aliceblue;
  justify-content: end;
  margin-inline-end: 7px;
}
</style>
