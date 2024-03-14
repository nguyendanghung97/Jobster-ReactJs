import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk';

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk('user/registerUser', registerUserThunk);
export const loginUser = createAsyncThunk('user/loginUser', loginUserThunk);
export const updateUser = createAsyncThunk('user/updateUser', updateUserThunk);
// Clear hết mọi thông tin khi logout
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Cú pháp {payload} là một cách viết tắt và thuận tiện khi bạn chỉ quan tâm đến dữ liệu trong payload mà không cần phải truy cập thông qua action.payload.
        logoutUser: (state, {payload}) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
            // khi click logout mới xuất hiện thông báo
            // Thông báo được truyền khi gọi hàm
            if (payload) {
                toast.success(payload);
            }
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
    extraReducers: (builder) => {
        builder
            // registerUser
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello There ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            // updateUser
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;

                addUserToLocalStorage(user);
                toast.success('User Updated');
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            // clearStore
            .addCase(clearStore.rejected, () => {
                toast.error('There was an error..');
            })
    }
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
