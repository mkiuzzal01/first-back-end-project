import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  access_token_secret: process.env.ACCESS_TOKEN,
  refresh_token_secret: process.env.REFRESH_TOKEN,
  jwt_access_token_expiration: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_token_expiration: process.env.JWT_REFRESH_EXPIRES_IN,
  client_site_port: process.env.CLIENT_SITE_PORT,
  jwt_forget_password_expiration: process.env.JWT_FORGET_PASSWORD_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret_key: process.env.API_SECRET_KEY,
  super_admin_pass: process.env.SUPER_ADMIN_PASS,
};
