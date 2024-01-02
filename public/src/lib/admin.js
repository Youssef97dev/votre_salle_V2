import { get } from "http";
import { createUrl, post } from "./http";
import * as qs from "qs";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const result = await axios.get(createUrl(`/api/users`));
    return result?.data;
  } catch (error) {
    return error;
  }
};

export const getUsers = async (type) => {
  const query = qs.stringify(
    {where: { 
      AND: [
        {
          roles :{
            path: [0],
            string_contains: type,
          }
        },
        {
          firstName :{
            not: null,
          }
        }
      ],
    }}
  );
  try {
    const result = await axios.get(createUrl(`/api/users?${query}`));
    return result?.data;
  } catch (error) {
    return error;
  }
};

export const confirmChangeTypeUser = async (userId, typeUser) => {
  const query = {
    typeUser,
  };
  try {
    const result = await axios.patch(createUrl(`/api/users/${userId}`), {
      ...query,
    });
    console.log("data: ", result?.data);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const confirmChangeRoleUser = async (userId, role) => {
  const query = {
    roles: [role],
  };
  try {
    const result = await axios.patch(createUrl(`/api/users/${userId}`), {
      ...query,
    });
    console.log("data: ", result?.data);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addOwner = async (
  username,
  password,
  firstName,
  lastName,
  phone,
  adresse,
  pack,
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
    formData.append("adresse", adresse);
    formData.append("pack", pack);
    formData.append("typeUser", "B2C");
    formData.append("roles", ["owner"]);
    formData.append("companyInfo", JSON.stringify(companyInfo));
    formData.append("profileLogo", selectedFile);
    const result = await post(createUrl("/api/signup"), formData);
    return result;
  } catch (error) {
    return error;
  }
};

// Charts
export const getCount = async (titleLink) => {
  try {
    const result = await axios.get(createUrl(`/api/${titleLink}`));
    return result?.data;
  } catch (error) {
    return error;
  }
};
