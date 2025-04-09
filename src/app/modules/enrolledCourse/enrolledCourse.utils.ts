const calculateGradeAndPoint = (totalMarks: number): { grade: string; gradePoints: number } => {
    
    if (totalMarks < 0 || totalMarks > 100) {
      return {
        grade: 'Invalid',
        gradePoints: 0,
      };
    }
  
    if (totalMarks <= 39) {
      return {
        grade: 'F',
        gradePoints: 0.0,
      };
    } else if (totalMarks <= 49) {
      return {
        grade: 'D',
        gradePoints: 2.0,
      };
    } else if (totalMarks <= 59) {
      return {
        grade: 'C',
        gradePoints: 2.5,
      };
    } else if (totalMarks <= 69) {
      return {
        grade: 'B',
        gradePoints: 3.0,
      };
    } else if (totalMarks <= 79) {
      return {
        grade: 'A-',
        gradePoints: 3.5,
      };
    } else if (totalMarks <= 89) {
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
  