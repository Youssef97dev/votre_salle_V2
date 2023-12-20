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
