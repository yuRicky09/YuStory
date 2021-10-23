import { extend } from "vee-validate";
import { required, email, min, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_}欄位為必填",
});

extend("email", {
  ...email,
  message: "{_field_}欄位格式不符合",
});

extend("min", {
  ...min,
  message: "{_field_}欄位最少須{length}碼",
});

extend("confirmed", {
  ...confirmed,
  message: "與確認密碼不一致",
});

extend("minmax", {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ["min", "max"],
  message: "{_field_}欄位需介於{min}到{max}字符之間",
});
