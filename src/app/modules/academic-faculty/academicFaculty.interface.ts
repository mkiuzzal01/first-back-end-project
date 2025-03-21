import mongoose from 'mongoose';

export type TAcademicFaculty = {
  id: string;
  user: mongoose.Types.ObjectId;
  name: String;
  isDeleted: boolean;
};
