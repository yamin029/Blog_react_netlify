import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import { useContext } from 'react'
import { format } from 'date-fns'
import { useStoreActions, useStoreState } from 'easy-peasy'
const UpdatePost = () => {
    const editTitle = useStoreState((state) => state.editTitle)
    const editPostBody = useStoreState((state) => state.editPostBody)
    const getPostById = useStoreState((state) => state.getPostById)

    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditPostBody = useStoreActions((actions) => actions.setEditPostBody)
    const editPost = useStoreActions((actions) => actions.editPost)

    const { navigate } = useContext(DataContext);
    const { id } = useParams()

    // const post = posts.find(post => post.id.toString() === id);
    const post = getPostById(id)
    useEffect(() => {
        if (post) {
            // console.log(post)
            setEditTitle(post.title)
            setEditPostBody(post.body)
        }
    }, [post, setEditTitle, setEditPostBody])

    const handleUpdate = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editPostBody }
        editPost(updatedPost)
        navigate(`/post/${id}`)
    }
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

                <input type="submit" value="Update" className='btnSubmit' onClick={() => handleUpdate(post.id)} />
            </form>
        </main>
    )
}

export default UpdatePost