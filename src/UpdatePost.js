import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const UpdatePost = ({ editTitle, setEditTitle, editPostBody, setEditPostBody, posts, handleUpdate }) => {
    const { id } = useParams()
    const post = posts.find(post => post.id.toString() === id);
    // console.log(post)
    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditPostBody(post.body)
        }
    }, [post, setEditTitle, setEditPostBody])
    return (
        <main className='Flex-1'>
            <h2>Update Post</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
            }} className="newPostForm">
                <label htmlFor="postTitle">Title: </label>
                <input
                    type="text"
                    id='postTitle'
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />

                <label htmlFor="postBody">Body</label>
                <textarea
                    required
                    id='postBody'
                    value={editPostBody}
                    onChange={(e) => setEditPostBody(e.target.value)}
                />

                <input type="submit" value="Update" className='btnSubmit' onClick={()=> handleUpdate(post.id)} />
            </form>
        </main>
    )
}

export default UpdatePost