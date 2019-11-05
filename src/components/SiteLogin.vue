<template>
  <div id="Login">
    <div id="window">
      <div id="title">
        <h1>登 录</h1>
      </div>
      <div id="border">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          style="width: 90%; margin: auto;"
        >
          <el-form-item prop="user">
            <el-input v-model="ruleForm.user" class="input" placeholder="请输入手机号" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item prop="pw">
            <el-input
              type="password"
              v-model="ruleForm.pw"
              placeholder="请输入密码"
              autocomplete="off"
              @keyup.enter.native="submitForm('ruleForm')"
              >
            </el-input>
          </el-form-item>
          <el-form-item class="el-from-login">
            <el-button type="success" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    let checkUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pw: ""
      },
      rules: {
        user: [{ validator: checkUser, trigger: "blur" }],
        pw: [{ validator: checkPass, trigger: "blur" }]
      },
      dialogVisible: false,
    };
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let port = 'login/spaceCharacterLogin'
          let obj = {
            spaceCharacterMobile: this.ruleForm.user,
            loginPwd: this.ruleForm.pw
          }
          let transferData = this.axios.transferData(port,obj);
          transferData.then(res => {
            if(res.data.status == 200){
              sessionStorage.setItem("SiteId",res.data.data);
              this.$router.push({path: '/sitemain/siteindex'});
            }else{
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
#Login{
  background: linear-gradient(rgb(61, 184, 221), rgb(5, 34, 112));
  height: 100vh;
}
#window {
  min-width: 250px;
  width: 80%;
  height: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#title {
  width: calc(100% + 4px);
  margin: auto;
  margin-bottom: 10px;
  background-color:rgba(255, 255, 255, 0);
  color: white;
}
#title h1 {
  margin: 0px;
}
#border {
  width: 90%;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid white;
  border-radius: 10px;
  background-color: white;
}
</style>