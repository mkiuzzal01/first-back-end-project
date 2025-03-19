import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.service';

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const { query } = req;
  const result =
    await AcademicFacultyServices.getAllAcademicFacultiesFromDB(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All academic faculties fetched successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Single academic faculty fetched successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
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
});

const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.deleteAcademicFacultyFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  getSingleAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
