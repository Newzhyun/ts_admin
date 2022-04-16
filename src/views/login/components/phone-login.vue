<template>
  <div class="phone-login">
    <el-form
      :model="formData"
      :rules="rules"
      status-icon
      label-position="left"
      ref="ruleFormRef"
    >
      <el-form-item label="手机号码" label-width="80px" prop="phone">
        <el-input v-model="formData.phone" />
      </el-form-item>
      <el-form-item label="验证码" label-width="80px" prop="code">
        <el-input v-model="formData.code" />
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
      <span>记住账号</span>
    </div>
    <div class="code">
      <span v-if="codeinfo.showcode" @click.once="changemsg">验证码</span>
      <span v-else>{{ codeinfo.messageTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
export default defineComponent({
  name: '',
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const formData = reactive({
      phone: '',
      code: ''
    });
    const rules = reactive({
      phone: [
        {
          required: true,
          message: '手机号码不能为空~'
        },
        {
          pattern: /^1[3-9][0-9]{11}$/,
          message: '格式不正确'
        }
      ],
      code: [
        {
          required: true,
          message: '验证码不能为空~'
        },
        {
          pattern: /^[0-9]{6}$/,
          message: '格式不正确'
        }
      ]
    });
    const codeinfo = reactive<{
      showcode: boolean;
      messageTime: number;
      timer: any;
    }>({
      showcode: true,
      messageTime: 60,
      timer: null
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
    function changemsg(): void {
      codeinfo.showcode = false;
      codeinfo.timer = setInterval(() => {
        codeinfo.messageTime -= 1;
        if (codeinfo.messageTime <= 0) {
          clearInterval(codeinfo.timer);
          codeinfo.messageTime = 60;
          codeinfo.showcode = true;
        }
      }, 1000);
    }
    return {
      formData,
      rules,
      ruleFormRef,
      submitForm,
      codeinfo,
      changemsg
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
.phone-login {
  position: relative;
  .code {
    position: absolute;
    top: 53px;
    right: 4px;
    width: 60px;
    height: 25px;
    background-color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      cursor: pointer;
    }
  }
}
</style>
