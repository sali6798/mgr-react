import axios from "axios";
import { FunctionsRounded } from "@material-ui/icons";

const BASE_URL = "http://localhost:8080"
// const BASE_URL = "https://mgrserver.herokuapp.com"

export default {
    login: function (userData) {
        return axios.post(BASE_URL + "/auth/login", userData, { withCredentials: true })
    },
    logout: function () {
        return axios.get(BASE_URL + "/auth/logout", { withCredentials: true })
    },
    signup: function (user) {
        return axios.post(BASE_URL + "/api/user", user)
    },
    createPost: function (post) {
        return axios.post(BASE_URL + "/api/post", post, { withCredentials: true })
    },
    createGroup: function (name) {
        return axios.post(BASE_URL + "/api/group", name, { withCredentials: true })
    },
    readSessions: function () {
        // return axios.get(BASE_URL + "/readsessions", { withCredentials: true })
        return axios.get(BASE_URL + "/readsessions", { withCredentials: true })
    },
    getAllUsers: function () {
        return axios.get(BASE_URL + "/api/user", { withCredentials: true })
    },
    getGroups: function () {
        return axios.get(BASE_URL + "/api/group/find/manager", { withCredentials: true })
    },
    getSingleGroup: function (id) {
        return axios.get(BASE_URL + "/api/group/" + id, { withCredentials: true })
    },
    addGroupArtist: function (artists) {
        return axios.put(BASE_URL + "/api/user/add/group", artists, { withCredentials: true })
    },
    getGroupArtists: function (id) {
        return axios.get(BASE_URL + "/api/user/find/group/" + id, { withCredentials: true })
    },
    removeGroupArtist: function (info) {
        return axios.put(BASE_URL + "/api/user/delete/group/", info, { withCredentials: true })
    },
    removeGroup: function (id) {
        return axios.delete(BASE_URL + "/api/group/" + id, { withCredentials: true })
    },
    getUserGroupInfo: function (id) {
        return axios.get(BASE_URL + "/api/user/" + id, { withCredentials: true })
    },
    updateMyEvents: function (events) {
        return axios.put(BASE_URL + "/api/user/add/event", events, { withCredentials: true })
    },

    updateUser: function(id,data) {
        return axios.put(BASE_URL + `/api/user/${id}`, data, { withCredentials: true })
    },

    //facebook
    getPagesinfo: function () {
        return axios.get(BASE_URL + "/post/facebook/pagesinfo", { withCredentials: true })
    },

    fbPostText: function (pgId, pgToken, text) {
        const data = {
            pageId: pgId,
            pageToken: pgToken,
            text: text
        }
        return axios.post(BASE_URL + "/post/facebook", data, { withCredentials: true })
    },

    fbPostTextImg: function (pgId, pgToken, text, pic) {
        const data = {
            pageId: pgId,
            pageToken: pgToken,
            text: text,
            img: pic
        }
        return axios.post(BASE_URL + "/post/facebook/image/single", data, { withCredentials: true })
    },

    //twitter
    twPostText: function (text) {
        const data = {
            text: text
        }
        return axios.post(BASE_URL + "/post/twitter/tweet", data, { withCredentials: true })
    },

    twPostImg: function (text) {
        const data = {
            text: text
        }
        return axios.post(BASE_URL + "/post/twitter/media", data,{ withCredentials: true })
    }

}