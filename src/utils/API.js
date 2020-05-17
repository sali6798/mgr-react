import axios from "axios";

const BASE_URL = "http://localhost:8080"
// const BASE_URL = "https://mgrserver.herokuapp.com"

export default {
    login: function(userData) {
        return axios.post(BASE_URL + "/auth/login", userData, { withCredentials: true })
    },
    signup: function (user) {
        return axios.post(BASE_URL + "/api/user", user)
    },
    createPost: function (post) {
        return axios.post(BASE_URL + "/api/post", post)
    },
    readSessions: function () {
        // return axios.get(BASE_URL + "/readsessions", { withCredentials: true })
        return axios.get(BASE_URL + "/readsessions")
    },
    getGroups: function () {
        return axios.get(BASE_URL + "/api/group/find/manager")
    }
}