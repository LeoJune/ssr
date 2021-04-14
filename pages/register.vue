<template>
  <div class="register">
    <h2 class="title">用户注册</h2>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      labelWidth="105px"
      class="myform"
    >
      <el-form-item
        label="公司名称："
        prop="corporateName"
      >
        <el-input
          v-model="registerForm.corporateName"
          placeholder="请填写公司全称"
          type="text"
          maxlength="50"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="公司类型："
        prop="companyType"
      >
        <el-input
          v-model="registerForm.companyType"
          placeholder="请填写公司类型"
          type="text"
          maxlength="50"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="兴趣爱好："
        prop="interest"
      >
        <el-input
          v-model="registerForm.interest"
          placeholder="请选择"
          type="text"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号："
        prop="phone"
      >
        <el-input
          v-model="registerForm.phone"
          placeholder="请填写手机号"
          type="text"
          maxlength="11"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="验证码："
        prop="authCode"
      >
        <el-input
          v-model="registerForm.authCode"
          type="text"
          maxlength="6"
          class="input-width code-input"
        ></el-input>
        <div
          class="getCode"
          :class="hasGet ? '' : 'canClick'"
          @click="toGetCode"
        >
          {{ hasGet ? countDown : "发送验证码" }}
        </div>
      </el-form-item>
      <el-form-item
        label="密码："
        prop="password"
      >
        <el-input
          v-model="registerForm.password"
          placeholder="密码程度为6至16位"
          type="password"
          maxlength="16"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码："
        prop="confirmPassword"
      >
        <el-input
          v-model="registerForm.confirmPassword"
          placeholder="请再次输入密码"
          type="password"
          maxlength="16"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        class="mybutton"
        @click="handleRegister"
      >
        立即注册
      </el-button>
      <div class="flex">
        <el-checkbox v-model="checked">我已阅读用户协议并同意</el-checkbox>
        <p
          class="agreement"
          @click="toUserAgreement"
        >
          查看《用户协议》
        </p>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { register, getCode } from '@/api/login'
import { isPhone } from '@/utils/validate'
const myCountDown = 10
export default {
  // name: 'register',
  layout: 'logLayout',
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      registerForm: {
        corporateName: '',
        companyType: '',
        username: '',
        phone: '',
        interest: '',
        authCode: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        // corporateName: [{ required: true, trigger: 'blur', message: '请公司名称' }],
        interest: [{ required: true, trigger: 'blur', message: '请输入兴趣爱好' }],
        phone: [{ required: true, trigger: 'blur', validator: isPhone }],
        authCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
        password: [
          { required: true, trigger: 'blur', message: '请填写密码' },
          { min: 6, max: 16, message: '密码程度为6至16位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', message: '请确认密码' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      checked: false,
      hasGet: false,
      countDown: myCountDown
    }
  },
  create () {

  },
  methods: {
    toGetCode () {
      const reg = /^1[34578][0-9]\d{8}$/
      if (!reg.test(this.registerForm.phone)) {
        this.$message.error('请输入正确的手机号')
        return
      }
      if (this.hasGet) {
        return
      }
      const that = this
      this.hasGet = true
      this.$api.getCode({ phone: this.registerForm.phone }).then(res => {
        // this.registerForm.authCode = res.data
      })

      const codeCount = setInterval(() => {
        that.countDown--
        if (that.countDown < 0) {
          that.countDown = myCountDown
          that.hasGet = false
          clearInterval(codeCount)
        }
      }, 1000)
    },
    handleRegister () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if (!this.checked) {
            this.$message({
              message: '请先阅读用户协议并同意',
              type: 'error',
              duration: 1000
            })
            return false
          }
          this.registerForm.username = this.registerForm.phone
          this.$api.register(this.registerForm).then(res => {
            this.$message({
              message: '注册成功',
              type: 'success',
              duration: 1000
            })
            this.$router.push('/')
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    toUserAgreement () {
      this.$router.push('/userAgreement')
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  width: 1280px;
  margin: 0 auto;
  color: #666666;
  font-size: 16px;
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
    margin: 60px auto 0;
    // transform: translateX(-50px);
  }
  .input-width {
    width: 400px;
    height: 40px;
    line-height: 40px !important;
    &.code-input {
      width: 254px;
    }
  }
  /deep/.el-form-item__content {
    display: flex;
    justify-content: space-between;
  }
  .getCode {
    width: 120px;
    height: 38px;
    line-height: 40px;
    color: #666666;
    text-align: center;
    display: inline-block;
    border: 1px solid #666666;
    border-radius: 5px;
    margin-left: 10px;
    &.canClick {
      color: #0093e6;
      border: 1px solid #0093e6;
      cursor: pointer;
    }
  }
  .mybutton {
    width: 490px;
    height: 48px;
    font-size: 16px;
    margin: 5px 0 10px;
    transform: translateX(10px);
  }
  .flex {
    padding-left: 10px;
    margin-bottom: 45px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .agreement {
    cursor: pointer;
    color: #0093e6;
  }
}
</style>
