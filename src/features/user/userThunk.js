import customFetch, {checkForUnauthorizedResponse} from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";



export const registerUserThunk = async (user, thunkAPI) => {
    try {
        // Axios sẽ tự động gửi một yêu cầu GET đến 'https://jobify-prod.herokuapp.com/api/v1/toolkit/endpoint' khi customFetch.get('/endpoint') được gọi.
        const resp = await customFetch.post('/auth/register',user);
        return resp.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const loginUserThunk = async (user, thunkAPI) => {
    try {
        const resp = await customFetch.post('/auth/login',user);
        return resp.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const updateUserThunk = async (user, thunkAPI) => {
    try {
        const resp = await customFetch.patch('/auth/updateUser', user);
        return resp.data;
    } catch (error) {
        // Khi authorization truyền lên không chính xác
        console.log(error.response);
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const clearStoreThunk = async (message , thunkAPI) => {
    try {
        // thunkAPI.dispatch để gửi một action tới Redux store
        thunkAPI.dispatch(logoutUser(message));
        thunkAPI.dispatch(clearAllJobsState());
        thunkAPI.dispatch(clearValues());
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}