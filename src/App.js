import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Routes, Route, useNavigate } from 'react-router-dom'
import UpdatePost from './UpdatePost'
import { DataProvider } from './context/DataProvider'

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title={"React.js Blog"}></Header>
        {/* <Nav search={search} setSearch={setSearch}></Nav>
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
        <Footer></Footer> */}
      </DataProvider>
    </div>
  );
}

export default App;
