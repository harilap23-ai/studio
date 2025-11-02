interface UploadedMaterial {
  id: number;
  fileName: string;
  subject: string;
  faculty: string;
  timestamp: Date;
}

export const users = [
  {
    id: 1,
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/016/273/514/small/personal-icon-free-vector.jpg'
  },
  {
    id: 2,
    name: 'suresh kumar',
    role: 'faculty',
  },
];

let uploadedMaterials: UploadedMaterial[] = [
  {
    id: 1,
    fileName: 'CS101_Lecture_1.pdf',
    subject: 'Intro to Computer Science',
    faculty: 'suresh kumar',
    timestamp: new Date(),
  },
];

export const getUploadedMaterials = () => uploadedMaterials;

export const addUploadedMaterial = (material: Omit<UploadedMaterial, 'id' | 'timestamp'>) => {
  uploadedMaterials.unshift({
    ...material,
    id: uploadedMaterials.length + 1,
    timestamp: new Date(),
  });
};

export const classrooms = [
  { id: 'C101', name: 'Room 101', capacity: 60 },
  { id: 'C102', name: 'Room 102', capacity: 75 },
  { id: 'L201', name: 'Lab 201', capacity: 40 },
  { id: 'H301', name: 'Hall 301', capacity: 150 },
];

export const subjects = [
  { id: 'CS101', name: 'Intro to Computer Science', credits: 3 },
  { id: 'MA203', name: 'Linear Algebra', credits: 4 },
  { id: 'PY101', name: 'Physics I', credits: 4 },
  { id: 'EN102', name: 'English Composition', credits: 3 },
];

export const batches = [
  { id: 'B2025_CS', name: '2025 Computer Science', studentCount: 55 },
  { id: 'B2026_ME', name: '2026 Mechanical Eng.', studentCount: 70 },
  { id: 'B2025_EE', name: '2025 Electrical Eng.', studentCount: 50 },
];

export const faculties = [
    { id: 'F001', name: 'suresh kumar', subjects: ['Intro to Computer Science', 'Linear Algebra'] },
    { id: 'F002', name: 'Bharath', subjects: ['Physics I'] },
    { id: 'F003', name: 'Akash jee', subjects: ['English Composition'] },
    { id: 'F004', name: 'Bala Murugan', subjects: ['Intro to Computer Science'] },
]

export const facultyTimetable = {
  Monday: [
    { time: '09:00 - 10:00', subject: 'CS101', batch: 'B2025_CS', room: 'C101' },
    null,
    { time: '11:00 - 12:00', subject: 'MA203', batch: 'B2026_ME', room: 'C102' },
    null,
    null,
  ],
  Tuesday: [
    null,
    { time: '10:00 - 11:00', subject: 'CS101', batch: 'B2025_CS', room: 'C101' },
    null,
    null,
    null,
  ],
  Wednesday: [
    { time: '09:00 - 10:00', subject: 'MA203', batch: 'B2026_ME', room: 'C102' },
    null,
    { time: '11:00 - 12:00', subject: 'PY101', batch: 'B2025_CS', room: 'L201' },
    null,
    null,
  ],
  Thursday: [
    { time: '09:00 - 10:00', subject: 'CS101', batch: 'B2025_CS', room: 'C101' },
    null,
    null,
    null,
    null,
  ],
  Friday: [
    null,
    { time: '10:00 - 11:00', subject: 'MA203', batch: 'B2026_ME', room: 'C102' },
    { time: '11:00 - 12:00', subject: 'PY101', batch: 'B2025_CS', room: 'L201' },
    null,
    null,
  ],
};

export const timeSlots = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '02:00 - 03:00'];
export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const fullTimetable = [
    { day: 'Monday', time: '09:00 - 10:00', subject: 'CS101', faculty: 'F001', room: 'C101', batch: 'B2025_CS'},
    { day: 'Monday', time: '10:00 - 11:00', subject: 'MA203', faculty: 'F002', room: 'C102', batch: 'B2026_ME'},
    { day: 'Tuesday', time: '11:00 - 12:00', subject: 'PY101', faculty: 'F003', room: 'L201', batch: 'B2025_CS'},
    { day: 'Wednesday', time: '09:00 - 10:00', subject: 'EN102', faculty: 'F004', room: 'H301', batch: 'B2025_EE'},
]

export const students = [
  { id: 'S001', name: 'Aswin', batch: '2025 Computer Science', avatar: 'https://img.freepik.com/free-vector/young-man-glasses-hoodie_1308-174658.jpg' },
  { id: 'S002', name: 'Hariharan D', batch: '2025 Computer Science', avatar: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg' },
  { id: 'S003', name: 'Jeeva B', batch: '2025 Computer Science', avatar: 'https://img.freepik.com/premium-vector/school-boy-vector-illustration_38694-902.jpg' },
  { id: 'S004', name: 'Deepak A', batch: '2025 Computer Science', avatar: 'https://img.freepik.com/premium-vector/round-avatar-portrait-icon-elementary-student-boy-with-backpack-flat-style_768258-3401.jpg' },
  { id: 'S005', name: 'Kavishri S', batch: '2025 Computer Science', avatar: 'https://img.freepik.com/free-vector/smiling-woman-with-glasses_1308-177859.jpg' },
  { id: 'S006', name: 'Harinipriya K L', batch: '2025 Computer Science', avatar: 'https://thumbs.dreamstime.com/b/smiling-teen-female-student-portrait-avatar-vector-illustration-image-generated-using-ai-tool-405958685.jpg' },
]
