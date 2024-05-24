import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import Button from 'react-bootstrap/Button'
import { Image } from "./Image"

function NewCommentForm({handleSubmit}){
    const user = useContext(UserContext)
    const[commentContent, setCommentContent] = useState("")

    function onSubmit(e){
        e.preventDefault()
        if(commentContent.trim() == "") return
        handleSubmit(commentContent.trim())
        setCommentContent("")
    }

    return (
        <div className="reply-form-div">
          <form 
            className="reply-form"
            action="#" 
            onSubmit={onSubmit}>
            <Image image_src={user.image.png}/>
            <textarea 
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}
              cols={4}
              rows={4}
              placeholder="Add a comment...">
            </textarea>
            <Button type="submit" className="btn-send">Send</Button>
          </form>
        </div>
    )

}

export default NewCommentForm