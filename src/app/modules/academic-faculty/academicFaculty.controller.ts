import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.service';
import { Request, RequestHandler, Response } from 'express';

const getAllAcademicFaculties: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { query } = req;
    const result =
      await AcademicFacultyServices.getAllAcademicFacultiesFromDB(query);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'All academic faculties fetched successfully',
      data: result,
    });
  },
);

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Single academic faculty fetched successfully',
      data: result,
    });
  },
);

const createAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    
    const { academicFaculty } = req.body;

    const result =
      await AcademicFacultyServices.createAcademicFacultyIntoDB(
        academicFaculty,
      );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic faculty created successfully',
      data: result,
    });
  },
);

const updateAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body.faculty;

    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
      id,
      updateData,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic faculty updated successfully',
      data: result,
    });
  },
);

const deleteAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await AcademicFacultyServices.deleteAcademicFacultyFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic faculty deleted successfully',
      data: result,
    });
  },
);

export const AcademicFacultyControllers = {
  getSingleAcademicFaculty,
  getAllAcademicFaculties,
  createAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
