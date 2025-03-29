import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  loginSuccess,
  loginFailure,
  setLoading,
  logout,
} from '../store/features/authSlice';

const useAuthenticate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { status, loading, accessToken, user, roleType } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const checkAuthentication = () => {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');
      const storedRoleType = localStorage.getItem('roleType');

      // Check if current route is register and has a token
      const isRegisterRouteWithToken =
        location.pathname.startsWith('/register') &&
        new URLSearchParams(location.search).has('token');

      // If register route with token, skip authentication checks
      if (isRegisterRouteWithToken) {
        dispatch(setLoading(false));
        return;
      }

      // If no token or user in localStorage, force logout
      if (!storedAccessToken || !storedUser) {
        dispatch(logout());
        navigate('/login');
        return;
      }

      // If tokens exist in localStorage but not in Redux store, attempt to restore
      if (!accessToken && storedAccessToken) {
        try {
          dispatch(
            loginSuccess({
              accessToken: storedAccessToken,
              refreshToken: localStorage.getItem('refreshToken'),
              user: JSON.parse(storedUser),
              roleType: storedRoleType,
            })
          );
        } catch (error) {
          dispatch(logout());
          navigate('/login');
        }
      }
    };

    checkAuthentication();
  }, [
    dispatch,
    navigate,
    location.pathname,
    location.search,
    accessToken,
    user,
  ]);

  return { status, loading };
};

export default useAuthenticate;
