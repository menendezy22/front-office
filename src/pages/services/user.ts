import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const signin = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${apiUrl}/user/signin`, { email, password });

    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getConnectedUser = async () => {
  const user: any = localStorage.getItem('user');

  return JSON.parse(user);
};

export const logoutUser = async () => {
  await localStorage.clear();
};

export const signup = async userData => {
  const formData = new FormData();

  // Append each field to the FormData object
  Object.keys(userData).forEach(key => {
    formData.append(key, userData[key]);
  });

  try {
    const res = await axios.post(`${apiUrl}/user/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });

    if (res) {
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data; // Adjust to return the necessary data
    }
  } catch (error) {
    console.error('Signup error:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const getUserProfile = async (id: any) => {
  try {
    const res = await axios.get(`${apiUrl}/user/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Referrer-Policy': 'no-referrer',
      },
    });

    const data = res.data;
    const photoBlob = `data:${data.contentType};base64,${data.photo}`;

    return {
      user: data.user,
      photoBlob,
    };
  } catch (error: any) {
    console.error(
      'Error fetching user profile:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${apiUrl}/user/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
