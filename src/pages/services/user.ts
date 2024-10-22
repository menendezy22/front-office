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
