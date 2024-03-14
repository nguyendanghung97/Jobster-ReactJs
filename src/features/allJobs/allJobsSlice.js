import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
    isLoading: true,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
};
// createAsyncThunk: tạo ra các actions để quản lý trạng thái của tác vụ bất đồng bộ (ví dụ: pending, fulfilled, rejected).
// 'allJobs/getJobs': tên action được gửi đi
// getAllJobsThunk là một hàm bất đồng bộ được gọi khi action được gửi, là một hàm để gọi API để lấy danh sách công việc
export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

const allJobsSlice = createSlice({
    name:'allJobs',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        },
        handleChange: (state, { payload: { name, value } }) => {
            // Khi có sự thay đổi sẽ chuyển về page 1
            state.page = 1
            state[name] = value;
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState };
        },
        changePage: (state, { payload }) => {
            state.page = payload;
        },
        clearAllJobsState: () => initialState,
    },
    extraReducers: (builder) => {
        // Một Promise có thể có 3 trạng thái: pending (đang chờ), fulfilled (đã thực hiện thành công), hoặc rejected (bị từ chối khi có lỗi)
        builder
            // getAllJobs
            .addCase(getAllJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllJobs.fulfilled, (state, {payload}) => {
                // payload: dữ liệu trả về từ BE
                state.isLoading = false;
                state.jobs = payload.jobs;
                state.numOfPages = payload.numOfPages;
                state.totalJobs = payload.totalJobs;
            })
            .addCase(getAllJobs.rejected, (state, {payload}) => {
                state.isLoading = false;
                toast.error(payload);
            })
            // showStats
            .addCase(showStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(showStats.fulfilled, (state, {payload}) => {
                // payload: dữ liệu trả về từ BE
                state.isLoading = false;
                state.stats = payload.defaultStats;
                state.monthlyApplications = payload.monthlyApplications;
            })
            .addCase(showStats.rejected, (state, {payload}) => {
                state.isLoading = false;
                toast.error(payload);
            })
    }
});

export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;
export default allJobsSlice.reducer;