import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import { Image } from "./Image"

function ReplyForm({handleSubmit, showReplyForm, replyFormID}){
    const user = useContext(UserContext)
    const [replyContent, setReplyContent] = useState("")

    function onSubmit(e){
      e.preventDefault()
      if(replyContent.trim() == "") return
      handleSubmit(replyContent.trim())
      setReplyContent("")
    }

    return (
      <Collapse 
        in={showReplyForm}
        onExit={()=> setReplyContent("") }>
        <div>
          <div 
            id={replyFormID}
            className="reply-form-div mb-3">
            <form 
              className="reply-form"
              action="#" 
              onSubmit={onSubmit}>
              <Image image_src={user.image.png}/>
              <textarea 
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                cols={5}
                rows={4}
                placeholder="Add a comment...">
              </textarea>
              <Button type="submit">Reply</Button>
            </form>
          </div>
        </div>
      </Collapse>
    )
}

export default ReplyForm