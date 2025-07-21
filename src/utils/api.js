// utils/api.js
import axios from "axios";

export const apiRequest = async ({
  url,
  method = "GET",
  params = {},
  data = {},
  headers = {},
}) => {
  try {
    const response = await axios({
      method,
      url,
      params,
      data,
      headers,
    });

    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
};
