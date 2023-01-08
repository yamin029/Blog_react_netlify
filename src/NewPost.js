import React from 'react'

const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, handleSubmit }) => {
  return (
    <main className='Flex-1'>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit} className="newPostForm">
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