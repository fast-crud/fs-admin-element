<template>
  <div class="main">
    <el-form
      ref="formRef"
      class="user-layout-login"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      v-bind="layout"
    >
      <!--      <div class="login-title">登录</div>-->
      <el-tabs :active-key="formState.loginType" :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }">
        <el-tab-pane key="password" tab="用户名密码登录">
          <el-alert v-if="isLoginError" type="error" show-icon style="margin-bottom: 24px" message="用户名或密码错误" />

          <!--      <div class="login-title">登录</div>-->
          <el-form-item required has-feedback name="username">
            <el-input v-model="formState.username" placeholder="请输入用户名" size="large" autocomplete="off">
              <template #prefix>
                <span class="iconify" data-icon="ion:phone-portrait-outline" data-inline="false"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item has-feedback name="password">
            <el-input
              v-model="formState.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              autocomplete="off"
            >
              <template #prefix>
                <span class="iconify" data-icon="ion:lock-closed-outline" data-inline="false"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item has-feedback name="imgCode">
            <el-row :gutter="16">
              <el-col class="gutter-row" :span="16">
                <el-input v-model="formState.imgCode" placeholder="请输入图片验证码" size="large" autocomplete="off">
                  <template #prefix>
                    <span class="iconify" data-icon="ion:image-outline" data-inline="false"></span>
                  </template>
                </el-input>
              </el-col>
              <el-col class="gutter-row" :span="8">
                <img class="image-code" :src="imageCodeUrl" @click="resetImageCode" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane key="smsCode" tab="短信验证码登录" :disabled="true" title="暂不支持">
          <el-form-item required has-feedback name="mobile">
            <el-input v-model="formState.mobile" placeholder="请输入手机号" size="large" autocomplete="off">
              <template #prefix>
                <span class="iconify" data-icon="ion:phone-portrait-outline" data-inline="false"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item has-feedback name="imgCode">
            <el-row :gutter="16">
              <el-col class="gutter-row" :span="16">
                <el-input v-model="formState.imgCode" placeholder="请输入图片验证码" size="large" autocomplete="off">
                  <template #prefix>
                    <span class="iconify" data-icon="ion:image-outline" data-inline="false"></span>
                  </template>
                </el-input>
              </el-col>
              <el-col class="gutter-row" :span="8">
                <img class="image-code" :src="imageCodeUrl" @click="resetImageCode" />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item name="smsCode">
            <el-row :gutter="16">
              <el-col class="gutter-row" :span="16">
                <el-input v-model="formState.smsCode" size="large" placeholder="短信验证码">
                  <template #prefix>
                    <span class="iconify" data-icon="ion:mail-outline" data-inline="false"></span>
                  </template>
                </el-input>
              </el-col>
              <el-col class="gutter-row" :span="8">
                <el-button
                  class="getCaptcha"
                  tabindex="-1"
                  :disabled="smsSendBtnDisabled"
                  @click="sendSmsCode"
                  v-text="smsTime <= 0 ? '发送' : smsTime + ' s'"
                ></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" size="large" :loading="loading" class="login-button" @click="handleFinish"
          >登录</el-button
        >
      </el-form-item>

      <el-form-item class="user-login-other">
        <!--        <router-link class="register" :to="{ name: 'index' }"> 注册 </router-link>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRaw, computed } from "vue";
import { useUserStore } from "/src/store/modules/user";
export default defineComponent({
  name: "Login",
  setup() {
    const loading = ref(false);
    const userStore = useUserStore();
    const formRef = ref();
    const formState = reactive({
      username: "admin",
      mobile: "",
      password: "123456",
      loginType: "password", //password
      imgCode: "",
      smsCode: ""
    });

    const rules = {
      mobile: [
        {
          required: true,
          trigger: "change",
          message: "请输入登录手机号"
        }
      ],
      username: [
        {
          required: true,
          trigger: "change",
          message: "请输入用户名"
        }
      ],
      password: [
        {
          required: true,
          trigger: "change",
          message: "请输入登录密码"
        }
      ],
      smsCode: [
        {
          required: true,
          trigger: "change",
          message: "请输入短信验证码"
        }
      ]
    };
    const layout = {
      labelCol: {
        span: 0
      },
      wrapperCol: {
        span: 24
      }
    };

    const handleFinish = async (values) => {
      console.log(values, formState);
      loading.value = true;
      try {
        const userInfo = await userStore.login(toRaw(formState));
      } finally {
        loading.value = false;
      }
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const isLoginError = ref();

    const imageCodeUrl = ref();
    function resetImageCode() {
      let url = "/images/code.jpg";
      imageCodeUrl.value = url + "?t=" + new Date().getTime();
    }
    resetImageCode();

    const smsTime = ref(0);
    const smsSendBtnDisabled = computed(() => {
      if (smsTime.value === 0) {
        return false;
      }
      return !!formState.smsCode;
    });
    function sendSmsCode() {
      //api.sendSmsCode();
    }
    return {
      loading,
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      isLoginError,
      imageCodeUrl,
      resetImageCode,
      smsTime,
      smsSendBtnDisabled,
      sendSmsCode
    };
  }
});
</script>

<style lang="less">
.user-layout-login {
  label {
    font-size: 14px;
  }

  .login-title {
    color: @primary-color;
    font-size: 18px;
    text-align: center;
    margin: 20px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 30px;
    margin-bottom: 30px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }

    .register {
      float: right;
    }
  }
  .iconify {
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
