import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  res.status(200).json({
    success: true,
    message: 'Single academic faculty fetched successfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All academic faculties fetched successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const updateData = req.body;

  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    updateData,
  );

  console.log(result);
  
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
};
