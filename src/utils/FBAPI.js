import axios from "axios";

export default {

    fbGetPagesToken : (userId,userToken) => {
        return axios.get(`https://graph.facebook.com/${userId}/accounts?access_token=${userToken}`) 
    },
    fbStatusPost : (pageId, pageToken, text) => {
        return axios.post(`https://graph.facebook.com/${pageId}/feed?message=${text}&access_token=${pageToken}`)
    },
    fbPhotoPost : (pageId,imgURL,text,pageToken) => {
        return axios.post(`https://graph.facebook.com/${pageId}/photos?url=${imgURL}&caption=${text}&access_token=${pageToken}`)
    }
}

