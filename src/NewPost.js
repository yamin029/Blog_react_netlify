import React from 'react'
import { DataContext } from './context/DataContext'
import { useContext } from 'react'
import { format } from 'date-fns'
import { useStoreActions, useStoreState } from 'easy-peasy'


const NewPost = () => {
  const { navigate } = useContext(DataContext)
  // const navigate = useNavigate()
  const posts = useStoreState((state)=> state.posts)
  const postTitle = useStoreState((state)=> state.postTitle)
  const postBody = useStoreState((state)=> state.postBody)

  const savePost = useStoreActions((actions)=> actions.savePost)
  const setPostTitle = useStoreActions((actions)=> actions.setPostTitle)
  const setPostBody = useStoreActions((actions)=> actions.setPostBody)
  // const [postTitle, setPostTitle] = useState('');
  // const [postBody, setPostBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    savePost(newPost)
    navigate('/')
  }
  return (
    <main className='Flex-1'>
      <h2>New Post</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="newPostForm">
        <label htmlFor="postTitle">Title: </label>
        <input
          type="text"
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="postBody">Body</label>
        <textarea
          id='postBody'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />

        <input type="submit" value="Submit" className='btnSubmit' />
      </form>
    </main>
  )
}

export default NewPost