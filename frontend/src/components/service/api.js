import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// User APIs
export const patientRegister = (data) => apiClient.post('/auth/register', data);
export const patientLogin = (data) => apiClient.post('/auth/login', data);

// Appointment APIs
export const bookAppointment = (data) => apiClient.post('/appointment/book', data);
export const viewPatientAppointments = () => apiClient.get('/appointment/patient/view');
export const viewDoctorAppointments = () => apiClient.get('/appointment/doctor/view');
export const updateStatus = (data) => apiClient.post('/appointment/updateStatus', data);
export const cancelAppointment = (data) => apiClient.post('/appointment/cancel', data);
// Admin APIs
export const addDoctor = (data) => apiClient.post('/admin/add-doctor', data);
export const viewAllAppointments = () => apiClient.get('/admin/appointments');

export default apiClient;