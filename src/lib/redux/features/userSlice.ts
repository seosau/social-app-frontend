import { useGetMe } from "@/hooks/useGetMe";
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
        },
        clearUser(state) {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;