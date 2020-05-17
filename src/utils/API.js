import axios from "axios";

const BASE_URL = "http://localhost:8080"
// const BASE_URL = "https://mgrserver.herokuapp.com"

export default {
    login: function(userData) {
        return axios.post(BASE_URL + "/login", userData, {withCredentials: true})
    }
}