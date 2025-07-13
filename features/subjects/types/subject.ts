export type Subject = {
  id: string;
  name: string;
  totalRequiredLessons: number;
  courses: Course[];
};

export type Course = {
  id: string;
  subjectId: string;
  name: string;
  requiredLessons: number;
  order: number;
};
