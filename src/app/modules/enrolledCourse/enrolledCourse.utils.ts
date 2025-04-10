export const calculateGradeAndPoint = (totalMarks: number) => {
    
    if (totalMarks < 0 || totalMarks > 100) {
      return {
        grade: 'NA',
        gradePoints: 0.0,
      };
    }
  


    if (totalMarks <= 19) {
      return {
        grade: 'F',
        gradePoints: 0.0,
      };
    } else if (totalMarks <= 39) {
      return {
        grade: 'D',
        gradePoints: 2.0,
      };
    } else if (totalMarks <= 49) {
      return {
        grade: 'C',
        gradePoints: 2.5,
      };
    } else if (totalMarks <= 59) {
      return {
        grade: 'B',
        gradePoints: 3.0,
      };
    } else if (totalMarks <= 69) {
      return {
        grade: 'A-',
        gradePoints: 3.5,
      };
    } else if (totalMarks <= 79) {
      return {
        grade: 'A',
        gradePoints: 3.75,
      };
    } else {
      return {
        grade: 'A+',
        gradePoints: 4.0,
      };
    }
  };
  