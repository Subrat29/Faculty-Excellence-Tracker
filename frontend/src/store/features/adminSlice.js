import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/admin";
import toast from "react-hot-toast";

export const getAdminDetails = createAsyncThunk(
    "/auth/profile",
    async () => {
      try {
        const response = await axiosInstance.get('v1/admin/getAdminDetails');
        console.log(response);
        return response.data; 
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admin details");
        console.log(error) 
      }
    }
  );

export const addSession = createAsyncThunk("/admin/addSession", async(data)=>{
    try {
        const res = axiosInstance.post('v1/session/upload',data)
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account",
        });

        return res.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add session");
        return rejectWithValue(error.response?.data);
    }
})

export const fetchSession = createAsyncThunk("/admin/getSession", async () => {
    try {
        const res = await axiosInstance.get('v1/session/fetch');
        // console.log('API Response:', res); // Log the full response for debugging

        // Return only serializable data (e.g., res.data)
        return res.data; 
    } catch (error) {
        console.error('Error fetching sessions:', error);
        toast.error(error.response?.data?.message || "Failed to fetch the session");
        throw error; // Ensure the error propagates
    }
});

export const addUniversity = createAsyncThunk('/admin/addUniversity',async(data)=>{
    try {
        const res = axiosInstance.post('v1/university/upload',data)
        console.log({res})
        toast.promise(res, {
            loading: "Wait! adding the university",
            success: (data) => {
                return data?.data?.message;
            },
           error:  "Failed to add university"
        });
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add university");
    }
})

export const fetchUniversity = createAsyncThunk("/admin/getUniversity", async () => {
    try {
        const res = await axiosInstance.get('v1/university/fetch');
        console.log('API Response:', res); // Log the full response for debugging

        // Return only serializable data (e.g., res.data)
        return res.data; 
    } catch (error) {
        console.error('Error fetching University:', error);
        toast.error(error.response?.data?.message || "Failed to fetch University");
        throw error; // Ensure the error propagates
    }
});

export const addCollege = createAsyncThunk('/admin/addUniversity',async(data)=>{
    try {
        const res = axiosInstance.post('v1/college/upload',data)
        console.log({res})
        toast.promise(res, {
            loading: "Wait! adding the college",
            success: (data) => {
                return data?.data?.message;
            },
           error:  "Failed to add college"
        });
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add college");
    }
})

export const fetchCollege = createAsyncThunk("/admin/getCollege", async () => {
    try {
        const res = await axiosInstance.get('v1/college/fetch');
        // Return only serializable data (e.g., res.data)
        return res.data; 
    } catch (error) {
        console.error('Error fetching University:', error);
        toast.error(error.response?.data?.message || "Failed to fetch University");
        throw error; // Ensure the error propagates
    }
});

export const addDepartment = createAsyncThunk('/admin/addDepartment',async(data)=>{
    try {
        const res = axiosInstance.post('v1/department/upload',data)
        console.log({res})
        toast.promise(res, {
            loading: "Wait! adding the department",
            success: (data) => {
                return data?.data?.message;
            },
           error:  "Failed to add department"
        });
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add department");
    }
})

export const fetchDepartment = createAsyncThunk("/admin/getCollege", async () => {
    try {
        const res = await axiosInstance.get('v1/department/fetch');
        // Return only serializable data (e.g., res.data)
        return res.data; 
    } catch (error) {
        console.error('Error fetching in department:', error);
        toast.error(error.response?.data?.message || "Failed to fetch department");
        throw error; // Ensure the error propagates
    }
});

export const updateProfile = createAsyncThunk("/admin/updateProfile",async (data)=>{
    try {
        // Use toast.promise properly
        const response = await toast.promise(
          axiosInstance.put('v1/admin/updateAdminProfile', data),
          {
            pending: "Wait! Updating profile...",
            success: "Profile updated successfully!",
            error: "Failed to update the profile.",
          }
        );
  
        return response.data; // Return the API response
      } catch (error) {
        console.error("Error updating profile:", error);
        // Show an error toast for the specific error
        toast.error(
          error.response?.data?.message || "An error occurred while updating profile."
        );
      }
    }
);

export const updateAvatar = createAsyncThunk("/admin/updateAvatar", async (data) => {
    try {
      const response = await toast.promise(
        axiosInstance.put('v1/admin/updateAdminAvatar', data), 
        {
          loading: "Updating the profile picture...",
          success: "Profile picture updated successfully!",
          error: "Failed to update profile picture"
        }
      );
      return response.data; // Return the response data to handle in Redux
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while updating profile picture."
      );
    }
  });
  