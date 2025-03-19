import { User } from "../user.model";

// Step 1: Find the last faculty ID from the database
const findLastFaculty = async (): Promise<number> => {
  const lastFaculty = await User.findOne(
    { role: 'faculty' }, 
    { id: 1, _id: 0 }   
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? parseInt(lastFaculty.id.split('-')[1]) : 0;
};

// Step 3: Generate a new unique faculty ID
export const generateFacultyId = async (): Promise<string> => {
  const lastFacultyId = await findLastFaculty();

  const newIdNumber = (lastFacultyId + 1).toString().padStart(4, '0'); 

  return `F-${newIdNumber}`;
};
