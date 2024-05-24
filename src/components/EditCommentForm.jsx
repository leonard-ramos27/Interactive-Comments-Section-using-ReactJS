import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment'
import { Image } from "./Image"
import PlusIcon from "../assets/images/icon-plus.svg"
import MinusIcon from "../assets/images/icon-minus.svg"

function EditCommentForm({handleSubmit, showEditForm, comment}){
    const user = useContext(UserContext)
    const [commentContent, setCommentContent] = useState(comment.content)

    function onSubmit(e){
      e.preventDefault()
      if(commentContent == "") {
        setCommentContent(comment.content)
      } else {
        handleSubmit(commentContent)
      }
    }

    return(
      <div 
        className={!showEditForm ? "d-none" : undefined}>
        <div className="edit-form-div mb-3">
          <form 
            className="edit-form"
            action="#" 
            onSubmit={onSubmit}>
            <Image image_src={user.image.png}/>
            <p className="comment-username mb-0">
              {comment.user.username}
              {comment.user.username == user.username && <span className="current-user ms-1">you</span>}
            </p>
            <p className="comment-date mb-0">
              <Moment fromNow>{comment.createdAt}</Moment>
            </p>
            <div className="comment-score">
              <button 
                className="btn p-0"
                disabled>
                <img src={PlusIcon} alt="plus icon" />
              </button>
              <p className="mb-0">{comment.score}</p>
              <button 
                className="btn p-0"
                disabled>
                <img src={MinusIcon} alt="minus icon" />
              </button>
            </div>
            <textarea 
              cols={4}
              rows={3}
              placeholder="Add a comment..."
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}>
            </textarea>
            <Button 
              className="btn-update"
              type="submit">Update</Button>
          </form>
        </div>
      </div>
    )
}

export default EditCommentForm