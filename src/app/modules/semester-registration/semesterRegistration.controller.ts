import { RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import { semesterRegistrationService } from './semesterRegistration.services';

const createSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const data = req.body;
    const result =
      await semesterRegistrationService.createSemesterRegistrationIntoBD(data);
    data;

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration created successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result =
      await semesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        data,
      );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester Registration updated successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await semesterRegistrationService.getAllSemesterRegistrationFromDB();
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: true,
      message: 'All Semester Registrations fetched successfully',
      data: result,
    });
  },
);

const getSingleSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester Registration fetched successfully',
      data: result,
    });
  },
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  updateSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistration,
};
