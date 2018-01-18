

<template>
    <div>
      <button @click="$router.push('/chart')">图表组件</button>
      <router-view></router-view>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      taskList: []
    };
  },
  async created() {
    this.$proxy({ url: "/mock/profile" }).then(res => {
      console.log(res);
    });
    login.call(this);
  },
  mounted() {}
};
async function login() {
  // 登录mig请求
  return await this.$proxy({
    url: "/mig/login",
    method: "post",
    data: {
      username: "datatub",
      password: "82ab2b9931cc341c2bee4f4cbbd1e217",
      _rand: 9501
    }
  });
}
</script>
