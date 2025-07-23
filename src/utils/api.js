import axios from "axios";
import { store } from "../redux/store";
import { API_END_POINTS, BASE_URL_END_POINT } from "../constants/apiEndPoints";
import { setAccessToken } from "../redux/tokenSlice";
import { logout } from "../redux/userSlice";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

export const apiRequest = async ({
  url,
  method = "GET",
  params = {},
  data = {},
  headers = {},
  retry = true,
}) => {
  const state = store.getState();
  const access_token = state.token.access_token;
  const refresh_token = state.token.refresh_token;
  try {
    const response = await axios({
      method,
      url,
      params,
      data,
      headers: {
        ...headers,
        Authorization: access_token ? `Bearer ${access_token}` : "",
      },
    });

    return { success: true, data: response.data.data };
  } catch (error) {
    const originalResponse = error.response;

    if (originalResponse?.status == 401 && retry && refresh_token) {
      try {
        const refreshResponse = await axios.post(
          BASE_URL + API_END_POINTS.GET_REFRESH_TOKEN,
          { refresh: refresh_token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const new_access_token = refreshResponse.data.access;

        store.dispatch(setAccessToken(new_access_token));

        return await apiRequest({
          url,
          method,
          params,
          data,
          headers,
          retry: false,
        });
      } catch (refreshError) {
        store.dispatch(logout());
        return {
          success: false,
          error: "Session expired. Please login again.",
        };
      }
    }

    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
};
