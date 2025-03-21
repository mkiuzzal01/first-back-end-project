import {
  TAcademicSemesterCodeMapper,
  TAcademicSemesterCodes,
  TAcademicSemesterNames,
  TMonth,
} from './academicSemester.interface';

export const AcademicSemesterName: TAcademicSemesterNames[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemesterCode: TAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterMapper: TAcademicSemesterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
