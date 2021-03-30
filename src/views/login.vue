<template>
  <div class="login">
    <el-form
      v-show="ifLogin"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
      style="margin-left:-900px;"
    >
      <h3 class="title">经销商后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        记住我
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <a href="#" @click="regis(1)">注册</a>
      </el-form-item>
    </el-form>
    <!-- 注册 -->
    <el-form
      v-show="!ifLogin"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">经销商注册</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
        </el-input> -->
      <!-- <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div> -->
      <!-- </el-form-item> -->
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        记住我
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin(1)"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <a href="#" @click="regis(0)">登录</a>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{
        $store.state.settings.caseNumber
      }}</a>
    </div>
  </div>
</template>

<script>
import { encrypt } from "@/utils/rsaEncrypt";
import Config from "@/settings";
import { getCodeImg, register } from "@/api/login";
import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      ifLogin: true, //是否是登录
      codeUrl: "",
      cookiePass: "",
      loginForm: {
        username: "",//admin
        password: "",//admin123
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    //!切换注册或登录
    regis(type) {
      if (type == 1) {
        this.ifLogin = false;
      } else {
        this.ifLogin = true;
      }
    },
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? "" : password;
      password = password === undefined ? this.loginForm.password : password;
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: "",
      };
    },
    handleLogin(type) {
      if (type == 1) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let val = {
              username: this.loginForm.username,
              password: this.loginForm.password,
            };
            register(val)
              .then((res) => {
                console.log(res);
                this.loading = true;
                this.$message.success("注册成功!请前往登录");
                this.loading = false;
                this.ifLogin = true;
              })
              .catch((err) => {
                this.$message.error('用户已存在');
                this.loading = false;
              });
          }
        });
      } else {
        this.$refs.loginForm.validate((valid) => {
          const user = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            rememberMe: this.loginForm.rememberMe,
            code: this.loginForm.code,
            uuid: this.loginForm.uuid,
          };
          if (valid) {
            this.loading = true;
            if (user.rememberMe) {
              Cookies.set("username", user.username, {
                expires: Config.passCookieExpires,
              });
              Cookies.set("password", user.password, {
                expires: Config.passCookieExpires,
              });
              Cookies.set("rememberMe", user.rememberMe, {
                expires: Config.passCookieExpires,
              });
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove("rememberMe");
            }
            this.$store
              .dispatch("Login", user)
              .then(() => {
                this.loading = false;
                this.$router.push("/dashboard/content");
              })
              .catch(() => {
                this.loading = false;
                this.getCode();
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/BJ.jpg");
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
