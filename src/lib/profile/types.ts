// src/lib/profile/types.ts

export interface GeneralUserProfile {
  name?: string;
  preferredTone?: string;
}

export interface StudentProfile {
  age?: string;
  classLevel?: string;
  department?: string;
  subjects?: string[];
  targetExam?: string;
  schoolType?: string;
}

export interface CareerProfile {
  age?: string;
  classLevel?: string;
  department?: string;
  desiredCourse?: string;
  careerInterest?: string;
  currentSkills?: string[];
}

export interface NiraUserProfile {
  general: GeneralUserProfile;
  study: StudentProfile;
  career: CareerProfile;
}
