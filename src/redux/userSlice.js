import { createSlice } from '@reduxjs/toolkit';
import { USER_LEVEL } from '../utils/UserType';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        level: USER_LEVEL.DIAMOND,
    },
    reducers: {
        changeUserLevel: (state, action) => {
            state.level = action.payload.userLevel;
        },
    },
});

export const selectUserLevel = (state) => state.user.level;

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
