import cookie from "cookie";
import axios from "axios";
import Cookies from "js-cookie";

export const state = () => ({
  authenticated: false,
  signinPending: false,
  resErrorMsgs: []
});

export const mutations = {
  set_signin_pending(state) {
    state.signinPending = !state.signinPending;
  },
  signin_user(state) {
    state.authenticated = true;
  },
  set_res_error_msg(state, msg) {
    state.resErrorMsgs.push(msg);
  }
};

export const actions = {
  nuxtServerInit({ commit }, context) {
    return new Promise((resolve, reject) => {
      const cookies = cookie.parse(context.req.headers.cookie || "");
      if (cookies.hasOwnProperty("x-access-token")) {
        commit("signin_user");
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  async signin({ commit }, payload) {
    try {
      commit("set_signin_pending");
      const { data } = await axios.post(
        process.env.API_URL + "/signin",
        payload
      );

      Cookies.set("x-access-token", data.token);
      commit("set_signin_pending");
      commit("signin_user");
    } catch (err) {
      commit("set_res_error_msg", err.response.data.message);
      commit("set_signin_pending");
    }
  }
};
