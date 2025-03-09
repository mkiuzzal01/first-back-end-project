import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;

  try {
    const result = await UserServices.createStudentIntoDB(password, studentData);
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

export const UserControllers = {
  createStudent,
};
