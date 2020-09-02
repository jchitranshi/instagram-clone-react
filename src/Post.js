import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css'
import {db} from './firebase'
import firebase from "firebase";

function Post({ postId, username, user, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) =>{
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        };

    },[postId]);

    const postComment = (event) => {
        event.prevetDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post"> 
            {/*Avatar + User name */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Chitranshi"
                    src="static"                
                
                />                
                <h3>{username}</h3>
            </div>    
            
            {/*Image*/}
            <img  
                className="post__image"          
                src={imageUrl}
                // "https://i.olsh.me/icon?size=80..120..200&url=instagram.com"
                alt=""
            />
            {/*Bold Username + Caption*/}
            <h4 className="post__text"><strong>{username}: </strong> {caption}"Lets learn this !! YEAYY!!"</h4>

            <div className="post__comments">
                {comments.map((comment)=>(
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
                
            {user && (
                <form className="post__commentBox"> 
                <input 
                    className="post__commentInput"
                    type="text" 
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button 
                    className="post__commentButton"
                    type="submit"
                    disabled={!comment}
                    onClick={postComment}
                >Post </button>
            </form>
            
            )}
            
        </div>
    )
}

export default Post
