import { jwtDecode } from 'jwt-decode';

export const getRoleFromToken = () => {
  const token = localStorage.getItem('accessToken'); // Or from cookies
  if (token) {
    try {
      const decoded = jwtDecode(token); // Decode the JWT
      const role = decoded.role; // Access the role from the payload
      return role; // Use this role in your app logic
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Or handle error accordingly
    }
  }
  return null;
};
