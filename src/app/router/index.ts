import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/academic-semester/academicSemester.route';
import { AcademicSemesterRouters } from '../modules/academic-faculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academic-department/academicDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { CourseRoutes } from '../modules/course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semester-registration/semesterRegistration.route';
import { OfferCourseRouter } from '../modules/offer-course/offerCourse.route';
import { FacultyRoutes } from '../modules/faculties/faculties.route';
import path from 'path';
import { AuthRoute } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicSemesterRouters,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferCourseRouter,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
