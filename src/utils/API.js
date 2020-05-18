import axios from "axios";

const BASE_URL = "http://localhost:8080"
// const BASE_URL = "https://mgrserver.herokuapp.com"

export default {
    login: function(userData) {
        return axios.post(BASE_URL + "/auth/login", userData, { withCredentials: true })
    },
    logout: function() {
        return axios.get(BASE_URL + "/auth/logout")
    },
    signup: function (user) {
        return axios.post(BASE_URL + "/api/user", user)
    },
    createPost: function (post) {
        return axios.post(BASE_URL + "/api/post", post)
    },
    createGroup: function (name) {
        return axios.post(BASE_URL + "/api/group", name)
    },
    readSessions: function () {
        // return axios.get(BASE_URL + "/readsessions", { withCredentials: true })
        return axios.get(BASE_URL + "/readsessions")
    },
    getAllUsers: function () {
        return axios.get(BASE_URL + "/api/user")
    },
    getGroups: function () {
        return axios.get(BASE_URL + "/api/group/find/manager")
    },
    getSingleGroup: function (id) {
        return axios.get(BASE_URL + "/api/group/" + id)
    },
    addGroupArtist: function (artists) {
        return axios.put(BASE_URL + "/api/user/add/group", artists)
    },
    getGroupArtists: function (id) {
        return axios.get(BASE_URL + "/api/user/find/group/" + id)
    },
    removeGroupArtist: function (info) {
        return axios.put(BASE_URL + "/api/user/delete/group/", info)
    },
    removeGroup: function (id) {
        return axios.delete(BASE_URL + "/api/group/" + id)
    },
    getUserGroupInfo: function (id) {
        return axios.get(BASE_URL + "/api/user/" + id)
    }
}