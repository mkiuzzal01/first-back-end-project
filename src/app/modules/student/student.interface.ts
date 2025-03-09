import { Model } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  relationShip: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  password: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo:string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB-' | 'AB+' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};

export type StudentMethod = {
  isUserExist(id:string):Promise<TStudent | null>;
};

export type StudentModel = Model<TStudent, {}, StudentMethod>;

