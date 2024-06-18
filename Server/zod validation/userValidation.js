const zod = require("zod");

const userZodSchemaRegister = zod.object({
  username: zod.string().min(1, { message: "Username Required" }),
  email: zod.string().min(1, { message: "Email Required !!" }),
  password: zod.string().min(1, { message: "Password Required" }),
});
const userZodSchemaLogin = zod.object({
  email: zod.string().min(1, { message: "Email Required !!" }),
  password: zod.string().min(1, { message: "Password Required" }),
});

module.exports = { userZodSchemaRegister, userZodSchemaLogin };
