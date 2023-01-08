import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import api from './api/posts'
import UpdatePost from './UpdatePost'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'
// import { DataProvider } from './context/DataContext'

function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');
  const { width } = useWindowSize()
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filterSearchResult = posts.filter(post => (
      post.title.toLowerCase().includes(search.toLowerCase())
      || post.body.toLowerCase().includes(search.toLowerCase())
    ));
    setSearchResult(filterSearchResult.reverse())
  }, [search, posts])

  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      const newListPost = posts.filter(post => (post.id).toString() != id);
      setPosts(newListPost)
      navigate('/')
    } catch (error) {
      console.log(`err:${error.message}`)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost)
      setPosts([...posts, response.data])
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editPostBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map((post) => post.id === id ? { ...response.data } : post))
      setEditTitle('');
      setEditPostBody('');
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      {/* <DataProvider> */}
        <Header title={"React.js Blog"} width={width}></Header>
        <Nav search={search} setSearch={setSearch}></Nav>
        <Routes>
          <Route path='/' element={<Home
            posts={searchResult}
            fetchError={fetchError}
            isLoading={isLoading}
          ></Home>
          }>
          </Route>
          <Route
            path='post'
            element={
              <NewPost
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              >
              </NewPost>}>
          </Route>
          <Route
            path='/post/:id'
            element={<PostPage
              posts={posts}
              handleDelete={handleDelete}
            >
            </PostPage>}>
          </Route>
          <Route
            path='/edit/:id'
            element={
              <UpdatePost
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editPostBody={editPostBody}
                setEditPostBody={setEditPostBody}
                posts={posts}
                handleUpdate={handleUpdate}
              >
              </UpdatePost>
            }>
          </Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='*' element={<Missing></Missing>}></Route>
        </Routes>
        <Footer></Footer>
      {/* </DataProvider> */}
    </div>
  );
}

export default App;
