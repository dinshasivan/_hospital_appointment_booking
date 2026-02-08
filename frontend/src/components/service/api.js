import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor to handle 401 errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User APIs
export const userRegister = (data) => apiClient.post('/auth/register', data);
export const userLogin = (data) => apiClient.post('/auth/login', data);

export const listDoctors = () => apiClient.get('/doctor/list');

// Appointment APIs
export const bookAppointment = (data) => apiClient.post('/appointments/book', data);
export const viewPatientAppointments = () => apiClient.get('/appointments/patient/view');
export const viewDoctorAppointments = () => apiClient.get('/appointments/doctor/view');
export const updateStatus = (data) => apiClient.patch(`/appointments/updateStatus/${data.appointmentId}`, { status: data.status });
export const cancelAppointment = (data) => apiClient.patch(`/appointments/cancel/${data.appointmentId}`);
// Add this function
export const updateDoctorProfile = (doctorId, data) => apiClient.put('/doctor/profile', data); // doctorId is ignored, using token
// Wait, backend uses req.user.id for PUT /profile. The route is /profile (no id).
// Check backend doctor.js Step 23:
// doctorRouter.put("/profile", ... async (req, res) => { ... await Doctor.findByIdAndUpdate(req.user.id...
// WAIT. req.user.id is the User ID. Doctor model _id is different?
// Step 23: Doctor.findByIdAndUpdate(req.user.id...
// Doctor model: userId ref User.
// If Doctor._id == User._id (manually set?) No.
// This is a BUG in backend doctor.js line 14: Doctor.findByIdAndUpdate(req.user.id...)
// It should be Doctor.findOneAndUpdate({ userId: req.user.id }...)
// I must fix backend PUT /profile too.

// In api.js:
export const getDoctorProfile = () => apiClient.get('/doctor/profile');
export const updateDoctorProfileSelf = (data) => apiClient.put('/doctor/profile', data);

// Admin APIs
export const addDoctor = (data) => apiClient.post('/admin/add-doctor', data);
export const viewAllAppointments = () => apiClient.get('/admin/appointments');

export const getAdminStats = () => apiClient.get('/admin/stats');
export const deleteDoctor = (id) => apiClient.delete(`/admin/delete-doctor/${id}`);

export default apiClient;