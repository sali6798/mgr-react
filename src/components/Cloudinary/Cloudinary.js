import React, { useState, useEffect } from "react"

function Cloudinary() {

    const [imgPath, setImgPath] = useState([]);

    const uploadIMG = async () => {    
        // make object
        const data = new FormData();
        data.append("file", imgPath);         // GET Value from state >> upload

        data.append("upload_preset", "udzc5qvv");
        // upload file
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/mgr/image/upload",
            {
                method: "POST",
                body: data,
            }
        );
        const file = await res.json();           // URL Link to picture
        console.log(file)
    }


    const selectFile = (e) => {
        let file = e.target.files[0];
        setImgPath(file);       // Set file to state
    }

    return (
        <label>
            <input type="file" id="uploadImg" name="uploadImg" onChange={selectFile} />
            <input type="button" value="UPLOAD" onClick={uploadIMG} />
        </label>
    )
}

export default Cloudinary;

