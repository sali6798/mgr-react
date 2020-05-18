import React, { useState, useEffect } from 'react'
import FacebookLogin from "react-facebook-login";
import API from "../../utils/FBAPI"

function Facebook() {                               // user information
    const [userToken, setUserToken] = useState({
        auth: false,
        name: "",
        email: "",
        picture: "",
        userId: "",
        userToken: ""
    })

    const [pagesToken, setPagesToken] = useState([]) // List of pages that user own


    const responseFacebook = (response) => {        // user click at login button
        if (response.status !== "unknow") {
            setUserToken({
                auth: true,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url,
                userId: response.id,
                userToken: response.accessToken
            })
        }
    }

    const componentClicked = () => {
        console.log("Click");
    }

    const getAllpages = () => {             //  get all pages that user own to get a token and id for each page
        console.log("click");
        API.fbGetPagesToken(userToken.userId, userToken.userToken)
            .then(({ data }) => {
                console.log(data);
                setPagesToken(data.data);
            })
           
    }

    const makeAPost = (pgId, pgToken, text) => {

        API.fbStatusPost(pgId, pgToken, text)
            .then(() => {
                console.log("Posted");
            })

    }

    // const postIMG = (pgId, imgUrl, text, pgToken) => {
        const postIMG = () => {
        const imgUrl = "res.cloudinary.com/mgr/image/upload/v1589488134/i1hmpq9o8dfhqv9njjdi.jpg"
        const pgToken = "EAADkDHWJynsBAOyjKNDj6tnEu1GZAVpxwtkvvaczDTn7BE4qN0Ic85VVebIDp4kCtbwhD1BhIyCnzctldSREOUqdsVxyhSYGGrUXK6NNXFRxKyW7PenqX8tbGM9uWP1MM3R73Hx0m0vmba4pT84c6UGvDmukaSWeMgyEyrBrCQmQ14OW2f8c8CUvrzehYJcoHOrzPIZB1IhnqLZCR4K"
        const pgId = "105515591170641"        
        const text = "YEZ"
        API.fbPhotoPost(pgId, imgUrl,text, pgToken)
            .then(() => {
                console.log("Posted");
            })
    }

    return (
        <div>
            <FacebookLogin
                appId="250742162705019"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} />

            <input type="button" value="AllPages" onClick={getAllpages} />

            {/* Need to pass PageID, PageToken, and Text */}
            <input type="button" value="post" onClick={makeAPost} />
            
            {/* Need to pass PageID, imgURL, and PageToken */}
            <input type="button" value="postIMG" onClick={postIMG} />

            <p>==========================ID============================</p>
            <p>{userToken.name}</p>
            <p>{userToken.email}</p>
            <p>{userToken.picture}</p>
            <p>userID: {userToken.userId}</p>
            <p>userToken: {userToken.userToken}</p>

            <p>==========================Pages============================</p>
            {pagesToken.map(item => (
                <ul key={item.id}>
                    <li>Page Name: {item.name}</li>
                    <li>Page ID: {item.id}</li>
                    <li>Page Token: {item.access_token}</li>
                </ul>
            ))}

        </div>
    )


}

export default Facebook;