import mongoose from 'mongoose';

export type TAdmin = {
  id: string;
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  profileImage?: string;
  isDeleted: boolean;
};
