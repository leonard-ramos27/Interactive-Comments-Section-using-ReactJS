import { getImageURL } from "../utils/image-util"

export function Image({image_src}){
    return (
        <img src={getImageURL(image_src)} alt="Profile Image" width="30px" height="30px" className="comment-photo"/>
    )
}

