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
  const query = qs.stringify({
    where: {
      AND: [
        {
          roles: {
            path: [0],
            string_contains: type,
          },
        },
        {
          firstName: {
            not: null,
          },
        },
      ],
    },
  });
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

export const confirmChangeRoleUser = async (userId, roleUser) => {
  const query = {
    roles: [roleUser],
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

export const confirmSuspendUser = async (userId, suspended) => {
  const query = {
    suspended: suspended ? false : true,
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
  profileLogo
) => {
  try {
    const data = {
      username,
      password,
      firstName,
      lastName,
      phone,
      adresse,
      pack,
      typeUser: "B2C",
      roles: "owner",
      companyInfo,
      profileLogo,
    };
    const result = await post(createUrl("/api/signup"), { ...data });
    return result;
  } catch (error) {
    return error;
  }
};

export const editOwner = async (
  username,
  firstName,
  lastName,
  phone,
  adresse,
  pack,
  companyInfo,
  profileLogo,
  userId
) => {
  try {
    const data = {
      username,
      firstName,
      lastName,
      phone,
      adresse,
      pack: parseInt(pack),
      companyInfo,
      profileLogo,
    };
    console.log(data);
    const result = await axios.patch(createUrl(`/api/users/${userId}`), {
      ...data,
    });
    return result;
  } catch (error) {
    console.log(error);
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
