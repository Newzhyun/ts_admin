<template>
  <div class="account-login">
    <el-form
      :model="formData"
      :rules="rules"
      status-icon
      label-position="left"
      ref="ruleFormRef"
    >
      <el-form-item label="用户名" label-width="65px" prop="userName">
        <el-input v-model="formData.userName" />
      </el-form-item>
      <el-form-item label="密码" label-width="65px" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-button
        type="primary"
        class="sbumit-btn"
        @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
    </el-form>
    <div class="remember-password">
      <input type="checkbox" />
      <span>记住密码</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import type { FormInstance } from 'element-plus';
import { FormData } from '@/utils';
export default defineComponent({
  name: 'accountLogin',
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const data = reactive<{ formData: FormData }>({
      formData: {
        userName: '',
        password: ''
      }
    });
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '用户名不能为空'
        },
        {
          message: '格式不正确',
          pattern: /^[A-Z][A-Za-z0-9]{10}$/
        }
      ],
      password: [{ required: true, message: '密码不能为空' }]
    });
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };
    return {
      ...toRefs(data),
      rules,
      submitForm,
      ruleFormRef
    };
  }
});
</script>

<style scoped lang="less">
.sbumit-btn {
  width: 100%;
  margin: 15px 0;
  height: 40px;
}
.remember-password {
  display: flex;
  align-items: center;
  span {
    margin: 0 5px;
    vertical-align: middle;
  }
}
</style>
