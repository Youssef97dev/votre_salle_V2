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

export const getCount = async (titleLink) => {
  try {
    const result = await axios.get(createUrl(`/api/${titleLink}`));
    return result?.data;
  } catch (error) {
    return error;
  }
};
