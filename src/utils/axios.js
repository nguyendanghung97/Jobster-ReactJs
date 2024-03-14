import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { clearStore } from '../features/user/userSlice';

const customFetch = axios.create({
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

// Axios Interceptors để tự động thêm tiêu đề Authorization vào mỗi yêu cầu mà bạn gửi từ ứng dụng ReactJS
customFetch.interceptors.request.use(
    (config) => {
        const user = getUserFromLocalStorage();
        if (user) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// Kiểm tra xem authorization truyền lên có chính xác hay không
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
    if (error.response.status === 401) {
        thunkAPI.dispatch(clearStore());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
};
  
export default customFetch;
