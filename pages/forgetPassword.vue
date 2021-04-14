<template>
  <div class="forgetPassword">
    <h2 class="title">密码找回</h2>
    <el-form
      ref="resetPasswordForm"
      :model="resetPasswordForm"
      :rules="rules"
      labelWidth="105px"
      class="myform"
    >
      <el-form-item
        label="用户名："
        prop="phone"
      >
        <el-input
          v-model="resetPasswordForm.phone"
          placeholder="请输入手机号"
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
          v-model="resetPasswordForm.authCode"
          type="text"
          maxlength="6"
          class="input-width code-input"
        ></el-input>
        <div
          class="getCode"
          :class="hasGet?'':'canClick'"
          @click="toGetCode"
        >
          {{ hasGet?countDown:'发送验证码' }}
        </div>
      </el-form-item>
      <el-form-item
        label="输入密码："
        prop="password"
      >
        <el-input
          v-model="resetPasswordForm.password"
          type="password"
          placeholder="密码程度为6至16位"
          maxlength="16"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码："
        prop="confirmPassword"
      >
        <el-input
          v-model="resetPasswordForm.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          maxlength="16"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        class="mybutton"
        @click="handleReset"
      >
        重置密码
      </el-button>
    </el-form>
  </div>
</template>

<script>
// import { updatePassword, getCode } from '@/api/login'
import { isPhone } from '@/utils/validate'
const myCountDown = 10
export default {
  // name: 'forgetPassword',
  layout: 'logLayout',
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetPasswordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      resetPasswordForm: {
        username: '',
        phone: '',
        authCode: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
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
      hasGet: false,
      countDown: myCountDown
    }
  },
  create () {
  },
  methods: {
    toGetCode () {
      const reg = /^1[34578][0-9]\d{8}$/
      if (!reg.test(this.resetPasswordForm.phone)) {
        this.$message.error('请输入正确的手机号')
        return
      }
      if (this.hasGet) {
        return
      }

      const that = this
      this.hasGet = true
      this.$api.getCode({ phone: this.resetPasswordForm.phone }).then(res => {
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
    handleReset () {
      this.$refs.resetPasswordForm.validate((valid) => {
        if (valid) {
          this.resetPasswordForm.username = this.resetPasswordForm.phone // username 和 phone 相同,后台要求
          this.loading = true
          this.$api.updatePassword(this.resetPasswordForm).then(res => {
            this.loading = false
            this.$message({
              message: '重置成功',
              type: 'success',
              duration: 1000
            })
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'warning',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.forgetPassword {
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
    margin: 5px 0 76px;
    transform: translateX(10px);
  }
}
</style>
