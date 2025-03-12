import { Schema, model } from 'mongoose';
import validator from 'validator';
import { StudentModel, TStudent, TUserName } from './student.interface';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'First name can not more then 20 characters'],
    validate: {
      validator: function (value) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const GuardianSchema = new Schema({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const LocalGuardianSchema = new Schema({
  name: { type: String, required: true },
  relationShip: { type: String, required: true },
  occupation: { type: String, require: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, 'ID is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, 'user id must be required'],
      ref: 'User',
    },
    name: {
      type: UserNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: `{VALUES} is not valid`,
      },
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid',
      },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB-', 'AB+', 'O+', 'O-'],
        message: `{VALUES} is not valid`,
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: GuardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: true,
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
StudentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// query middleware
StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//check student exist:
StudentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
