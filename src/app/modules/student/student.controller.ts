import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentValidationSchema } from './student.validation.zod';
// import { studentValidationSchema } from './student.validation.Joi';

const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;
  console.log(studentData);
  const zodParsedData = studentValidationSchema.parse(studentData);
  // const { error, value } = studentValidationSchema.validate(studentData);

  try {
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something want wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'all students retrieve successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something want wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student retrieve successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something want wrong',
      error: err,
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const updateData = req.body;
    const result = await StudentServices.updateSingleStudentFromDB(studentId,updateData);
    res.status(200).send({
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
