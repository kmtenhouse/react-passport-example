import axios from "axios";

export default {
    signup: function (email, password) {
        return axios.post("/api/users", { email: email, password: password});
    },
    login: function (email, password) {
        return axios.post("/auth/login", { email: email, password: password});
    }
};