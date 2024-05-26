import { useContext, useState } from "react"
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment'
import { UserContext } from "../context/UserContext"
import ReplyForm from "./ReplyForm"
import EditCommentForm from "./EditCommentForm"
import DeleteModal from "./DeleteModal"
import { Image } from "./Image"
import PlusIcon from "../assets/images/icon-plus.svg"
import MinusIcon from "../assets/images/icon-minus.svg"
import ReplyIcon from "../assets/images/icon-reply.svg"
import EditIcon from "../assets/images/icon-edit.svg"
import DeleteIcon from "../assets/images/icon-delete.svg"

function Comment({comment, children, onUpvote, onDownvote, onReply, onDelete, onEdit, replayingPostId, setReplayingPostId}){
    const user = useContext(UserContext)
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const replyFormID = `reply-form-${comment.id}`

    const handleReply = (content) => {
        onReply(content, comment.id)
        setReplayingPostId(null)
    }

    const handleEdit = (content) => {
        onEdit(content, comment.id)
        setShowEditForm(false)
    }

    const handleDelete = () => {
        onDelete(comment.id)
        setShowDeleteModal(false)
    }

    return (
        <>
        <div className={`comment-container mb-3 ${comment.user.username == user.username && (showEditForm && "d-none")}`}>
            <Image image_src={comment.user.image.png}/>
            <p className="comment-username mb-0">
                {comment.user.username}
                {comment.user.username == user.username && <span className="current-user ms-1">you</span>}
            </p>
            <p className="comment-date mb-0">
                <Moment fromNow>{comment.createdAt}</Moment>
            </p>
            <p className="comment-content mb-0">
                {comment.replyingTo && <span className="replying-to me-1">@{comment.replyingTo}</span>}
                {comment.content}
            </p>
            <div className="comment-buttons">
            {comment.user.username == user.username 
                ? <>
                    <Button 
                        className="btn-delete"
                        onClick={()=> setShowDeleteModal(true)}>
                        <img src={DeleteIcon} alt="trash icon" className="me-1 mb-1"/>
                        Delete
                    </Button> 
                    <Button
                        className="btn-edit"
                        onClick={() => setShowEditForm(true)}>
                        <img src={EditIcon} alt="pen icon" className="me-1 mb-1"/>
                        Edit
                    </Button>
                </>
                : <Button
                    className="btn-reply"
                    onClick={() => setReplayingPostId(comment.id)}
                    aria-controls={replyFormID}
                    aria-expanded={replayingPostId === comment.id}>
                    <img src={ReplyIcon} alt="reply icon" className="me-1"/>
                    Reply
                </Button>
            }
            </div>
            <div className="comment-score">
                <button 
                    className="btn p-0" 
                    onClick={()=> onUpvote(comment.id)}>
                    <img src={PlusIcon} alt="plus icon" />
                </button>
                <p className="mb-0">{comment.score}</p>
                <button 
                    className="btn p-0" 
                    onClick={()=> onDownvote(comment.id)}>
                    <img src={MinusIcon} alt="minus icon" />
                </button>
            </div>
        </div>
        {comment.user.username == user.username 
            ? <>
                <EditCommentForm 
                    handleSubmit={handleEdit} 
                    showEditForm={showEditForm} 
                    comment={comment}
                />
                <DeleteModal 
                    handleConfirm={handleDelete}
                    showDeleteModal={showDeleteModal}
                    handleClose={()=> setShowDeleteModal(false)}
                />
            </>
            : <ReplyForm 
                handleSubmit={handleReply} 
                showReplyForm={replayingPostId === comment.id} 
                replyFormID={replyFormID}
            />
        }
        {children}
        </>
    )
}

export default Comment