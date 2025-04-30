import { createSlice } from '@reduxjs/toolkit';

interface LikeState {
  liked: boolean;
}

const initialState: LikeState = {
  liked: false,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    toggleLike(state) {
      state.liked = !state.liked;
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
