import axios from "axios";

const BASE_URL = "http://localhost:8080"
// const BASE_URL = "https://mgrserver.herokuapp.com"

export default {
    // login: function() {
    //     return axios.post(BASE_URL + "/login", userData, {withCredentials: true})
    // }
    signup: function(user) {
        return axios.post(BASE_URL + "/api/user", user)
    },
    createPost: function(post) {
        return axios.post(BASE_URL + "/api/post", post)
    }
}