import axios from "axios";

export default {

    fbGetPagesToken : (userId,userToken) => {
        return axios.get(`https://graph.facebook.com/${userId}/accounts?access_token=${userToken}`) 
    },
    fbStatusPost : (pageId, pageToken, text) => {
        return axios.post(`https://graph.facebook.com/${pageId}/feed?message=${text}&access_token=${pageToken}`)
    }
}

