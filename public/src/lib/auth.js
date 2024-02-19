import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./http";

export const me = async () => {
  return isStoredJwt()
    ? (await get(createUrl("/api/me")).catch(() => null))?.data
    : null;
};

export const login = async (username, password) => {
  try {
    const result = await post(createUrl("/api/login"), { username, password });
    setStoredJwt(result.data.accessToken);
    return me();
  } catch (error) {
    return error;
  }
};

export const signup = async (
  username,
  password,
  firstName,
  lastName,
  adresse,
  phone,
  roles,
  companyInfo
) => {
  try {
    const data = {
      username,
      password,
      firstName,
      lastName,
      phone,
      adresse,
      pack: "0",
      typeUser: "B2C",
      roles,
      companyInfo,
      profileLogo: "",
    };
    const result = await post(createUrl("/api/signup"), { ...data });
    setStoredJwt(result.data.accessToken);
    return me();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const checkUser = async (email) => {
  try {
    const result = await post(createUrl("/api/check-user"), { email });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const signupWithGoogle = async () => {
  try {
    const result = await get(createUrl("/api/auth/google/callback"));
    console.log(result);
  } catch (error) {
    return error;
  }
};

export const sendRecoverPasswordCode = async (username) => {
  try {
    const result = await post(createUrl("/api/request-recover-password"), {
      username,
    });
    console.log(result);
  } catch (error) {
    return error;
  }
};

export const changePassword = async (newPassword, resetToken, email) => {
  try {
    const result = await post(createUrl("/api/reset-password"), {
      newPassword,
      resetToken,
      email,
    });
    console.log(result);
  } catch (error) {
    return error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const result = await get(createUrl(`/api/verify?token=${token}`));
    console.log(result);
  } catch (error) {
    return error;
  }
};
