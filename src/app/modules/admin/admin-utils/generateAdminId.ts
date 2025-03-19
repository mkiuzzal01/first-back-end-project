import { User } from "../../user/user.model";

// Step 1: Find the last faculty ID from the database
const findLastAdmin = async (): Promise<number> => {
  const lastAdmin = await User.findOne(
    { role: 'admin' }, 
    { id: 1, _id: 0 }   
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? parseInt(lastAdmin.id.split('-')[1]) : 0;
};

// Step 3: Generate a new unique faculty ID
export const generateAdmin = async (): Promise<string> => {
  const lastAdminId = await findLastAdmin();

  const newIdNumber = (lastAdminId + 1).toString().padStart(4, '0'); 

  return `A-${newIdNumber}`;
};
