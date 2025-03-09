import { TStudent } from './student.interface';
import { Student } from './student.model';


const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateSingleStudentFromDB = async (id: string, updateData: TStudent) => {
  if ('_id' in updateData) {
    delete updateData._id;
  }

  const result = await Student.findOneAndUpdate(
    { id: id },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteStudentFromDB,
};
