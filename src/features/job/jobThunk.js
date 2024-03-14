import customFetch, {checkForUnauthorizedResponse} from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
    try {
        const resp = await customFetch.post('/jobs', job);
        // Clear value sau khi submit
        thunkAPI.dispatch(clearValues())
        return resp.data;
    } catch (error) {
        // Khi authorization truyền lên không chính xác
        console.log(error.response);
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
};

export const editJobThunk = async ({jobId, job}, thunkAPI) => {
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job);
        // Tải lại list sau khi xóa
        thunkAPI.dispatch(clearValues());
        return resp.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
    try {
        thunkAPI.dispatch(showLoading());
        const resp = await customFetch.delete(`/jobs/${jobId}`);
        // Tải lại list sau khi xóa
        thunkAPI.dispatch(getAllJobs());
        return resp.data.msg;
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
};