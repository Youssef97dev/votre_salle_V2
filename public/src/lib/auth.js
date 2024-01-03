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
  phone,
  roles,
  companyInfo,
  selectedFile
) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("adresse", "");
    formData.append("typeUser", "B2C");
    formData.append("roles", roles);
    formData.append("companyInfo", JSON.stringify(companyInfo));
    formData.append("pack", null);
    const result = await post(createUrl("/api/signup"), formData);
    setStoredJwt(result.data.accessToken);
    return me();
  } catch (error) {
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
