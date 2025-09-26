
export const users = [
  {
    id: 1,
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://picsum.photos/seed/101/100/100',
  },
  {
    id: 2,
    name: 'Dr. Evelyn Reed',
    role: 'faculty',
    avatar: 'https://picsum.photos/seed/102/100/100',
  },
];

export const notifications = [
  {
    id: 1,
    title: 'New Class Assigned',
    description: 'CS101 has been assigned to you on Mon at 9 AM.',
    read: false,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'Timetable Change Approved',
    description: 'Your request to swap PHYS202 has been approved.',
    read: false,
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    title: 'Weekly Report Ready',
    description: 'Your weekly summary is available for download.',
    read: true,
    timestamp: '1 day ago',
  },
];

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
    { id: 'F001', name: 'Dr. Alan Grant' },
    { id: 'F002', name: 'Dr. Evelyn Reed' },
    { id: 'F003', name: 'Prof. Ian Malcolm' },
    { id: 'F004', name: 'Dr. Ellie Sattler' },
]

export const facultyTimetable = {
  Monday: [
    { time: '09:00 - 10:00', subject: 'Intro to CS', batch: '2025 CS', room: 'C101' },
    null,
    { time: '11:00 - 12:00', subject: 'Data Structures', batch: '2024 CS', room: 'C102' },
    null,
    null,
  ],
  Tuesday: [
    null,
    { time: '10:00 - 11:00', subject: 'Intro to CS', batch: '2025 CS', room: 'C101' },
    null,
    null,
    null,
  ],
  Wednesday: [
    { time: '09:00 - 10:00', subject: 'Data Structures', batch: '2024 CS', room: 'C102' },
    null,
    { time: '11:00 - 12:00', subject: 'Algorithms', batch: '2024 CS', room: 'Lab 201' },
    null,
    null,
  ],
  Thursday: [
    { time: '09:00 - 10:00', subject: 'Intro to CS', batch: '2025 CS', room: 'C101' },
    null,
    null,
    null,
    null,
  ],
  Friday: [
    null,
    { time: '10:00 - 11:00', subject: 'Data Structures', batch: '2024 CS', room: 'C102' },
    { time: '11:00 - 12:00', subject: 'Algorithms', batch: '2024 CS', room: 'Lab 201' },
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
  { id: 'S001', name: 'John Doe', batch: '2025 Computer Science' },
  { id: 'S002', name: 'Jane Smith', batch: '2025 Computer Science' },
  { id: 'S003', name: 'Peter Jones', batch: '2025 Computer Science' },
  { id: 'S004', name: 'Mary Williams', batch: '2025 Computer Science' },
  { id: 'S005', name: 'David Brown', batch: '2025 Computer Science' },
  { id: 'S006', name: 'Sarah Taylor', batch: '2025 Computer Science' },
]
