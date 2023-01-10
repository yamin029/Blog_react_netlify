import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import { useEffect } from "react";
import { DataProvider } from "./context/DataProvider";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  return (
    <div className="App">
      <Header title={"React.js Blog"}></Header>
      <DataProvider>
        <Nav></Nav>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isLoading={isLoading}
                fetchError={fetchError}
              ></Home>}
          ></Route>
          <Route path="post" element={<NewPost></NewPost>}></Route>
          <Route path="/post/:id" element={<PostPage></PostPage>}></Route>
          <Route path="/edit/:id" element={<UpdatePost></UpdatePost>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="*" element={<Missing></Missing>}></Route>
        </Routes>
      </DataProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
