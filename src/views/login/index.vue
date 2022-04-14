<template>
  <div class="login">
    <div class="login-entry">
      <el-tabs
        type="border-card"
        v-model="data.value"
        :stretch="true"
        style="height: 100%"
      >
        <el-tab-pane name="accountLogin">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon style="margin-right: 5px"><UserFilled /></el-icon>
              <span>用户名登录</span>
            </span>
          </template>
          <component :is="data.value"></component>
        </el-tab-pane>
        <el-tab-pane name="phoneLogin">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon style="margin-right: 5px"><Iphone /></el-icon>
              <span>手机号登录</span>
            </span>
          </template>
          <component :is="data.value"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Iphone, UserFilled } from '@element-plus/icons-vue';
import { defineComponent, reactive } from 'vue';
import accountLogin from './components/account-login.vue';
import phoneLogin from './components/phone-login.vue';

export default defineComponent({
  name: 'Lgoin',
  components: { Iphone, UserFilled, accountLogin, phoneLogin },
  setup() {
    const data = reactive({
      value: 'accountLogin'
    });
    return { data };
  }
});
</script>

<style scoped>
.login {
  background: url('@/assets/img/login-bg.svg');
  width: 100%;
  height: 100vh;
  transform-style: preserve-3d;
}
.login-entry {
  width: 350px;
  height: 280px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate3d(-50%, -50%, 0);
  perspective: 1200px;
  box-shadow: 0 0 10px rgb(0 0 0 / 15%);
}
</style>
