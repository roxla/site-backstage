<template>
  <div id="Menu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#393D49"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          style="height: 100vh;">
          <el-menu-item index="1" @click="go('/sitemain/siteindex')">
            <i class="el-icon-info"></i>
            <span slot="title">开柜申请</span>
          </el-menu-item>
          <el-menu-item index="2" @click="go('/sitemain/sitestatistics')">
            <i class="el-icon-info"></i>
            <span slot="title">统计</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    go(url) {
      this.$router.push({path: url});
    },
  }
}
</script>

<style scoped>
#Menu{
  text-align: left;
}
</style>