import { Types } from 'mongoose';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB-' | 'AB+' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
