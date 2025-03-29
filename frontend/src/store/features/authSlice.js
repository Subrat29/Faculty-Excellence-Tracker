import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  roleType: null,
  status: 'unauthenticated',
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken, user, roleType } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.roleType = roleType;
      state.status = 'authenticated';
      state.loading = false;
    },
    loginFailure: (state) => {
      state.status = 'unauthenticated';
      state.loading = false;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.roleType = null;
      state.status = 'unauthenticated';
      state.loading = false;

      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('roleType');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logout, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
