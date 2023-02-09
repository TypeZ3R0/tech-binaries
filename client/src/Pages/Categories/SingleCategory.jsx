import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseURL from "../../backend";
import SinglePost from "../../Components/SinglePost/SinglePost";

const SingleCategory = () => {
    const { tag } = useParams();

    const [categoryPosts, setCategoryPosts] = useState([]);

    useEffect(() => {
        const getPostsByTag = async () => {
            const { data } = await axios.get(`${baseURL}category/${tag}`);
            setCategoryPosts(data);
        };
        getPostsByTag();
    });

    return (
        <div>
            <h1 style={{ marginBottom: "2.5rem", fontSize: "2rem", color: "#2c3135" }}>{tag.toUpperCase()}</h1>
            {categoryPosts.length !== 0 ? (
                categoryPosts.map((singlePost) => {
                    return (
                        <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`/posts/${singlePost.id}`}
                            key={singlePost.id}
                        >
                            <SinglePost
                                key={singlePost.id}
                                date={singlePost.updatedAt}
                                imgUrl={singlePost.image}
                                title={singlePost.title}
                                author={singlePost.author.authorName}
                            />
                        </Link>
                    );
                })
            ) : (
                <p>No posts yet.</p>
            )}
        </div>
    );
};

export default SingleCategory;
