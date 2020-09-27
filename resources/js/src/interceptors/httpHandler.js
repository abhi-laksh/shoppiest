import React from "react";
import {
    appStatusFetching,
    appStatusFailed,
    appStatusReset,
    appStatusSuccess,
} from "../redux/actions/statusAction";

import Axios from "./axiosInstance";
import { useDispatch } from "react-redux";
import { getFromLS } from "../helpers/service";

export const http_request = async (
    dispatch,
    url,
    method = "GET",
    body = {},
    checkToken = true,
    headers = {},
    message = { success: "", failure: "" }
) => {
    let data = null;

    let authHeader = {};

    let token;

    try {
        // Set status to fetching
        if (dispatch) {
            dispatch(appStatusFetching("Please Wait..."));
        }

        if (checkToken) {

            if (getFromLS("token")) {

                token = getFromLS("token");

                authHeader = {
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "application/json",
                    // "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                };

            } else {
                dispatch(appStatusFailed("Token expired!"));
                return;
            }

        }


        switch (method) {
            case "GET":
                data = await Axios.get(url, {
                    headers: {
                        ...headers,
                        ...authHeader,
                    },
                });
                break;
            case "POST":
                data = await Axios.post(url, body, {
                    headers: {
                        ...headers,
                        ...authHeader,
                    },
                });
                break;
            case "PUT":
                data = await Axios.put(url, body, {
                    headers: {
                        ...headers,
                        ...authHeader,
                    },
                });
                break;
            case "DELETE":
                data = await Axios.delete(url, {
                    headers: {
                        ...headers,
                        ...authHeader,
                    },
                });
                break;
            default:
                data = await Axios.get(url, {
                    headers: {
                        ...headers,
                        ...authHeader,
                    },
                });
                break;
        }
    } catch (err) {
        if (dispatch) {
            dispatch(appStatusFailed(`Some error occured : ${err}`));
        }

        console.warn(
            `An error occured while requesting a url : ${url} \n Error: ${err}`
        );
    } finally {
        if (data) {
            if (data.data.statusCode > 0) {
                if (dispatch) {
                    dispatch(
                        appStatusFailed(
                            data.data.message ||
                            (message && message.failure) ||
                            "Request failed"
                        )
                    );
                }
            } else {
                if (dispatch) {
                    dispatch(appStatusReset());
                }
                return data.data;
            }
        }
    }
};
