

<template>
    <div>
      <button @click="$router.push('/chart')">图表组件</button>
      <router-view></router-view>
    </div>
</template>
<script>
  import axios from "axios";
  export default {
    mounted() {
      // axios.post("/account/checkLogin").then(res => {
      //   console.log(res);
      // });
      // axios.get("/mock/profile").then(res => {
      //   console.log(res);
      // });
      let res = this.$proxy({ url: "/account/checkLogin", method: "post" });
      console.log(
        res.then(data => {
          console.log(data);
        })
      );
    }
  };
</script>
