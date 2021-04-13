<template>
  <div class="loginIndex">
    <h2 class="title">用户登陆</h2>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      labelWidth="105px"
      class="myform"
    >
      <el-form-item
        label="用户名："
        prop="phone"
      >
        <el-input
          v-model="loginForm.phone"
          placeholder="请填写手机号"
          type="text"
          maxlength="11"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码："
        prop="password"
      >
        <el-input
          v-model="loginForm.password"
          placeholder="密码程度为6至16位"
          type="password"
          maxlength="16"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        class="mybutton"
        @click="handleLogin"
      >
        登陆
      </el-button>
      <div class="flex">
        <p @click="handleRegister">免费注册</p>
        <p @click="handleForget">忘记密码</p>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { login } from '@/api/login'
import { isPhone } from '@/utils/validate'
export default {
  // name: 'loginIndex',
  layout: 'logLayout',
  data () {
    return {
      loading: false,
      loginForm: {
        phone: '',
        password: '',
        username: ''
      },
      rules: {
        phone: [{ required: true, validator: isPhone, trigger: 'blur' }],
        password: [
          { required: true, trigger: 'blur', message: '请填写密码' },
          { min: 6, max: 16, message: '密码程度为6至16位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginForm.username = this.loginForm.phone

          this.loading = true

          this.$store.dispatch('user/Login', this.loginForm).then(res => {
            this.loading = false
            this.$router.back(-1)
            this.$store.dispatch('user/GetInfo')
            this.$store.dispatch('cart/GetCartInfo')
          }).catch(err => {
            console.log(err)
            this.loading = false
          })

          // login(this.loginForm).then(res => {
          //   this.loading = false
          //   this.$message({
          //     message: '登陆成功',
          //     type: 'success',
          //     duration: 1000
          //   })
          //   this.$router.back(-1)
          // })
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    handleRegister () {
      this.$router.push('/register')
    },
    handleForget () {
      this.$router.push('/forgetPassword')
    }
  }
}
</script>

<style lang="less" scoped>
.loginIndex {
  width: 1280px;
  margin: 0 auto;
  background-color: rgba(251, 251, 251, 1);
  border: 1px solid rgba(255, 255, 255, 1);
  .title {
    font-size: 24px;
    font-weight: 400;
    padding-left: 20px;
    padding-top: 40px;
    padding-bottom: 29px;
    border-bottom: 1px solid #dadada;
  }
  .myform {
    width: 500px;
    margin: 60px auto 80px;
    // transform: translateX(-50px);
  }
  .mybutton {
    width: 490px;
    height: 48px;
    font-size: 16px;
    margin: 5px 0 10px;
    transform: translateX(10px);
  }
  .flex {
    display: flex;
    justify-content: space-between;
    width: 490px;
    transform: translateX(10px);
    padding: 10px 0 10px 8px;
    box-sizing: border-box;
    p {
      color: #606266;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
