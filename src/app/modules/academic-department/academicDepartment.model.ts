import status from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import { model, Schema } from 'mongoose';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// check department is existing check:
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartment = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartment) {
    throw new AppError(
      status.BAD_REQUEST,
      'Academic department already exists',
    );
  }
  next();
});

//check department exists or not existing:
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartment = await AcademicDepartment.findOne({ query });

  if (!isDepartment) {
    throw new AppError(status.NOT_FOUND, 'Academic department not found');
  }
  next();
});

// create department model
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
