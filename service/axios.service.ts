import axios from "axios";
import { env } from "@/env";
import { parseJwt } from "@/helper";
import customToast from "@/toast";
// import store from '@/store';


export const api = axios.create({
    baseURL: env.SERVER_URL
})

const getTokens = () => {
    return {
        "accessToken": window.localStorage.getItem('accessToken'),
        "refreshToken": window.localStorage.getItem('refreshToken')
    }
}


export const refreshAccessToken = async () => {
    // const user = store.state.user;

    const { accessToken, refreshToken } = getTokens();

    const result = await api.post('/auth/refresh', {
        token: accessToken
    })

    if (result.status === 200) {
        const newAccessToken = result.data.data.accessToken;

        // decode token
        const decodedToken = parseJwt(newAccessToken);

        const newUserData = {
            accessToken: newAccessToken,
            refreshToken: refreshToken,
            ...decodedToken
        }
        // set data to store
        // store.commit('setUser', newUserData);

        // set authenicated to true
        // store.commit('setAuthentication', true);

        customToast({
            message: 'Your session has been refreshed',
            icon: 'success'
        })

        return true;

    } else {

        // set authenicated to false
        // store.commit('setAuthentication', false);

        // reset user data
        // store.commit('resetUser');

        customToast({
            message: 'Your session has expired',
            icon: 'error'
        })

        return false;
    }
}

export const resetSession = () => {
    // set authenicated to false
    // store.commit('setAuthentication', false);

    // reset user data
    // store.commit('resetUser');

    // force redirect to login page
    // window.location.href = '/login';

    // customToast({
    //     message: 'Your session has expired',
    //     icon: 'error'
    // })
}


// this interceptor will handle network related errors
api.interceptors.response.use(
    (response) => response, async (error) => {
        const networkErrorFlag = !!error.isAxiosError && !error.response;

        // check network error
        if (networkErrorFlag) {
            if (!window.navigator.onLine) {
                // internet is not working
                return customToast({
                    message: "Internet connection is not available",
                    icon: "error",
                });
            }

            return customToast({
                message: "Server is not available",
                icon: "error",
            });
        }

        // check if access token is expired
        // if expired, refresh token
        // if refresh token is expired, redirect to login page
        if (error.response.status === 401) {

            const { accessToken, refreshToken } = getTokens();

            if (!accessToken && !refreshToken) {
                // reset session
                return resetSession();
            }

            const unparsedRT = refreshToken;
            if (!unparsedRT) return;

            const refreshTokenParsed = parseJwt(unparsedRT);

            const refreshTokenTimeInSeconds = Number((refreshTokenParsed.exp - (Date.now() / 1000)).toFixed(0));
            const refreshTokenTimeInMinutes = refreshTokenTimeInSeconds / 60;
            const refreshTokenExpired = refreshTokenTimeInMinutes < 0;

            if (!refreshTokenExpired) {
                if (!error.config.retry) {
                    error.config.retry = true;
                    return api.request(error.config);
                } else {
                    return await refreshAccessToken();
                }
            }
            return resetSession();
        }
        return Promise.reject(error);
    });


// this interceptor will handle all the requests
api.interceptors.request.use(async (config: any) => {
    const user = getTokens();

    if (user) {
        config.headers['Authorization'] = `Bearer ${user['accessToken']}`;
    }
    return config;
})


export default api;