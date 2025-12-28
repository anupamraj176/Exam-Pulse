// Exam Categories
export const EXAM_CATEGORIES = [
  {
    id: 'ssc',
    name: 'SSC',
    fullName: 'Staff Selection Commission',
    icon: '📋',
    color: 'bg-blue-500',
    exams: ['CGL', 'CHSL', 'MTS', 'CPO', 'GD', 'JE', 'Steno']
  },
  {
    id: 'banking',
    name: 'Banking',
    fullName: 'Bank & Insurance Exams',
    icon: '🏦',
    color: 'bg-green-500',
    exams: ['SBI PO', 'SBI Clerk', 'IBPS PO', 'IBPS Clerk', 'RBI', 'NABARD']
  },
  {
    id: 'railways',
    name: 'Railways',
    fullName: 'Railway Recruitment Board',
    icon: '🚂',
    color: 'bg-red-500',
    exams: ['RRB NTPC', 'RRB Group D', 'RRB JE', 'RRB ALP']
  },
  {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission',
    icon: '🎯',
    color: 'bg-purple-500',
    exams: ['IAS', 'IPS', 'IFS', 'CDS', 'CAPF', 'NDA']
  },
  {
    id: 'state-psc',
    name: 'State PSC',
    fullName: 'State Public Service Commission',
    icon: '🏛️',
    color: 'bg-orange-500',
    exams: ['BPSC', 'UPPSC', 'MPPSC', 'RPSC', 'WBPSC']
  },
  {
    id: 'defence',
    name: 'Defence',
    fullName: 'Defence & Paramilitary',
    icon: '⚔️',
    color: 'bg-indigo-500',
    exams: ['CDS', 'NDA', 'AFCAT', 'Indian Navy', 'Indian Army']
  }
];

// Subject Categories
export const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '🔢' },
  { id: 'reasoning', name: 'Reasoning', icon: '🧠' },
  { id: 'english', name: 'English', icon: '📚' },
  { id: 'gk', name: 'General Knowledge', icon: '🌍' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'polity', name: 'Indian Polity', icon: '⚖️' },
  { id: 'history', name: 'History', icon: '📜' },
  { id: 'geography', name: 'Geography', icon: '🗺️' },
  { id: 'economy', name: 'Economy', icon: '💰' },
];

// Resource Types
export const RESOURCE_TYPES = [
  { id: 'notes', name: 'Notes', icon: '📝' },
  { id: 'pyq', name: 'Previous Year Questions', icon: '📋' },
  { id: 'mock', name: 'Mock Tests', icon: '✍️' },
  { id: 'video', name: 'Video Lectures', icon: '🎥' },
  { id: 'book', name: 'Books', icon: '📖' },
];

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
  },
  RESOURCES: {
    GET_ALL: '/resources',
    GET_BY_ID: '/resources/:id',
    SEARCH: '/resources/search',
    FILTER: '/resources/filter',
  },
  EXAMS: {
    GET_ALL: '/exams',
    GET_NOTIFICATIONS: '/exams/notifications',
    GET_CALENDAR: '/exams/calendar',
  },
  USER: {
    PROFILE: '/user/profile',
    BOOKMARKS: '/user/bookmarks',
    PROGRESS: '/user/progress',
  },
};

// WebSocket Events
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  USER_COUNT: 'user_count',
  ROOM_COUNT: 'room_count',
  NEW_NOTIFICATION: 'new_notification',
  NEW_RESOURCE: 'new_resource',
  CHAT_MESSAGE: 'chat_message',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'sarkariflow_token',
  USER_DATA: 'sarkariflow_user',
  BOOKMARKS: 'sarkariflow_bookmarks',
  THEME: 'sarkariflow_theme',
};