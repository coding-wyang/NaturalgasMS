<script setup>

</script>

<template>
  <div class='success-box'>
    <div class='icon-right-box'>
        <svg-icon class="right-icon" name="rightgreen"/>
    </div>
    <span>缴费成功！</span>
  </div>
</template>

<style scoped>
.success-box{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.icon-right-box{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45%;
  width: 140px;
  height: 140px;
  background: rgb(37, 223, 0);
  border-radius: 70px;
}
.right-icon{
  color: aliceblue;
  transform: scale(4.5);
}
.success-box>span{
  margin-top: 30px;
  font-size: 25px;
  font-weight: 600;
}
</style>
