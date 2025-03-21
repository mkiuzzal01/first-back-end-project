import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, 'ID is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, 'User id must be required'],
      ref: 'User',
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
