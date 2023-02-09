// Third party imports
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

// Local imports
import classes from "./App.module.css";
import Footer from "./Layout/Footer/Footer.jsx";
import Navbar from "./Layout/Navbar/Navbar.jsx";
import Main from "./Layout/Main/Main.jsx";
import Feed from "./Pages/Feed/Feed.jsx";
import PostPage from "./Pages/PostPage/PostPage.jsx";
import NewPost from "./Pages/NewPostPage/NewPost";
import UserProfile from "./Pages/Profile/UserProfile.jsx";
import AuthorProfile from "./Pages/Author/AuthorProfile";
import Posts from "./Pages/Posts/Posts";
import SingleCategory from "./Pages/Categories/SingleCategory";
import Categories from "./Pages/Categories/Categories";
import PostEdit from "./Pages/PostPage/PostEdit";
import ForgotPassword from "./Pages/AuthActions/ForgotPassword";
import ResetPassword from "./Pages/AuthActions/ResetPassword";
import UpdateEmail from "./Pages/AuthActions/UpdateEmail";
import UserVerify from "./Pages/AuthActions/UserVerify";
import NotFoundPage from "./Pages/404/404.jsx";
import { UserContext } from "./Contexts/UserContext";
import ResendVerificationEmail from "./Pages/AuthActions/ResendVerificationEmail";

axios.defaults.withCredentials = true;

// App function (renders the entire layout - starting point)
function App() {
    const { user } = useContext(UserContext);
    return (
        <section className={classes.app}>
            {/* Navbar (row 1 column 1) */}
            <nav>
                <Navbar />
            </nav>
            {/* Main (row 1 column 2) */}
            <Main>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="posts/" element={<Posts />} />
                    <Route path="posts/:postId" element={<PostPage />} />
                    <Route path="users/authors/edit-post/:postId" element={<PostEdit />} />
                    <Route path="users/verify/:userString" element={<UserVerify />} />
                    <Route path="users/resend-verification-email" element={<ResendVerificationEmail />} />
                    <Route path="users/profile" element={<UserProfile />} />
                    <Route path="users/forgot-password" element={<ForgotPassword />} />
                    <Route path="users/reset-password/:userString" element={<ResetPassword />} />
                    <Route path="users/update-email/:userString" element={<UpdateEmail />} />
                    {user && user.isAuthor ? (
                        <Route path="users/authors/author-dashboard" element={<AuthorProfile />} />
                    ) : (
                        <Route path="users/authors/author-dashboard" element={<NotFoundPage />} />
                    )}
                    <Route path="users/authors/create-post" element={<NewPost />} />
                    <Route path="categories/" element={<Categories />} />
                    <Route path="category/:tag" element={<SingleCategory />} />
                </Routes>
            </Main>
            {/* Footer (row 2 column 1-2) */}
            <Footer />
        </section>
    );
}

export default App;
