import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import NewCommentForm from "./components/NewCommentForm"
import Comment from "./components/Comment"
import { UserContext } from "./context/UserContext"
import data from "./data/data.json"

function App() {
  const [comments, setComments] = useState(()=>{
    const localData = localStorage.getItem("interactive-comments-data")
    if(localData == null) return data.comments
    return JSON.parse(localData)
  })
  const currentUser = data.currentUser

  useEffect(()=>{
    localStorage.setItem("interactive-comments-data", JSON.stringify(comments))
  },[comments])

  function addComment(content){
    setComments(comments => {
      return [
        ...comments,
        {
          id: crypto.randomUUID(),
          content,
          createdAt: new Date().toISOString(),
          replies: [],
          score: 0,
          user: currentUser
        }
      ]
    })
  }

  function editComment(newContent, id){
    const updatedComments=comments.map(comment => {
      if(comment.id == id){
        return {...comment, content:newContent}
      } else if(comment.replies.length > 0){
        let replies = comment.replies.map(reply => {
          if(reply.id == id){
            return {...reply, content:newContent}
          }
          return reply
        })
        return {...comment, replies: replies}
      }
      return comment
    })
    setComments(updatedComments)
  }

  function deleteComment(id){
    const updatedComments = comments.filter(comment => { return comment.id != id })
    setComments(updatedComments)
  }

  function addReply(content, replyingTo){
    const updatedComments = comments.map(comment => {
      if(comment.id == replyingTo){
        const newReply = {
          id: crypto.randomUUID(),
          content,
          createdAt: new Date().toISOString(),
          score: 0,
          replyingTo: comment.user.username,
          user: currentUser
        }
        return {...comment, replies: [...comment.replies, newReply]}
      } else if(comment.replies.length > 0){
        const replies = comment.replies
        replies.map(reply => {
          if(reply.id == replyingTo){
            const newReply = {
              id: crypto.randomUUID(),
              content,
              createdAt: new Date().toISOString(),
              score: 0,
              replyingTo: reply.user.username,
              user: currentUser
            }
            replies.push(newReply)
          }
        })
        return {...comment, replies: replies}
      } else {
        return comment
      }
    })
    setComments(updatedComments)
  }

  function deleteReply(id){
    const updatedComments = comments.map(comment => {
      if(comment.replies.length > 0){
        const updatedReplies = comment.replies.filter( reply => {return reply.id !== id} )
        return {...comment, replies: updatedReplies}
      }
      return comment
    })
    setComments(updatedComments)
  }

  function upVote(id){
    const updatedComments = comments.map(comment => {
      if(comment.id == id){
        const newScore = comment.score + 1
        return {...comment, score: newScore}
      } else if(comment.replies.length > 0){
        let replies = comment.replies.map(reply => {
          if(reply.id == id){
            const newScore = reply.score + 1
            return {...reply, score:newScore}
          }
          return reply
        })
        return {...comment, replies: replies}
      } else {
        return comment
      }
    })
    setComments(updatedComments)
  }

  function downVote(id){
    const updatedComments = comments.map(comment => {
      if(comment.id == id){
        if(comment.score > 0){
          const newScore = comment.score - 1
          return {...comment, score: newScore}
        } else {
          return comment
        }
      } else if(comment.replies.length > 0){
        let replies = comment.replies.map(reply => {
          if(reply.id == id){
            if(reply.score > 0){
              const newScore = reply.score - 1
              return {...reply, score:newScore}
            } else {
              return reply
            }
          }
          return reply
        })
        return {...comment, replies: replies}
      } else {
        return comment
      }
    })
    setComments(updatedComments)
  }

  return (
    <UserContext.Provider value={currentUser}>
      <Container className="p-0">
      {comments.map(comment => (
        <div key={comment.id}>
          <Comment 
            comment={comment} 
            onUpvote={upVote} 
            onDownvote={downVote} 
            onReply={addReply}
            onDelete={deleteComment}
            onEdit={editComment}>
            {comment.replies && <div className="reply-wrapper">
              {comment.replies.map(reply => (
                <div key={reply.id}>
                  <Comment 
                    comment={reply}
                    onUpvote={upVote}
                    onDownvote={downVote}
                    onReply={addReply}
                    onDelete={deleteReply}
                    onEdit={editComment} />
                </div>
              ))}  
            </div>}
          </Comment>
        </div>
      ))}
      <NewCommentForm handleSubmit={addComment}/>
      </Container>
      <footer>
        <p className="attribution">
          Challenge by 
          <a href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9" target="_blank"> Frontend Mentor</a>. Coded by 
          <a href="https://www.frontendmentor.io/profile/leonard-ramos27" target="_blank"> Leonard Ramos</a>.
        </p>
      </footer>
    </UserContext.Provider>
  )
}

export default App
