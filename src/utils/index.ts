// 表单的接口

export interface FormData {
  userName: string;
  password: string;
}

export interface Rules {
  required?: boolean;
  message: string;
  trigger?: string;
  pattern?: RegExp;
  type?: string;
  validator?: (rule: unknown, value: string, callback: any) => void;
}
