import { IUser } from "@/interfaces/user.interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSate {
    user: IUser | null
}

const initialState: UserSate = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
        hydrateUserFromStorage(state) {
            const stored = localStorage.getItem('user');
            if (stored) {
                state.user = JSON.parse(stored)
            }
        }
    },
});

export const { setUser, clearUser, hydrateUserFromStorage } = userSlice.actions;
export default userSlice.reducer;