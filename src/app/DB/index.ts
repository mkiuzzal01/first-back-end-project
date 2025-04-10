import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: 'S-0001',
  email: 'superadmin123@gmail.com',
  password: config.super_admin_pass,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
