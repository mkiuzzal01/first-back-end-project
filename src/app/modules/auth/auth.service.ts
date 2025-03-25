import { TUser } from '../user/user.interface';

const loginUser = async (payload: TUser) => {
  console.log(payload);
  return;
};

export const AuthService = {
  loginUser,
};
