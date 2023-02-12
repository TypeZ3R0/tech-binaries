import axios from "axios";
import React, { useState, useEffect } from "react";
import baseURL from "../../backend";
import { Link } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get(`${baseURL}category`);
                console.log(data.categories);
                setCategories((prevState) => {
                    return [...prevState, ...data.categories];
                });
            } catch (err) {}
        };
        getCategories();
    }, []);
    console.log(categories);
    return (
        <div>
            <h1 style={{ fontSize: "1.5rem", color: "#2c3135" }}>CATEGORIES</h1>
            <div style={{ marginTop: "2.5rem" }}>
                {categories.map((category) => {
                    return (
                        <div key={category.id} style={{ marginBottom: "0.8rem" }}>
                            <Link
                                to={`/category/${category.tag.slice(1)}`}
                                key={category.id}
                                style={{ fontSize: "1rem", textDecoration: "none", color: "#126466" }}
                            >
                                {category.tag
                                    .slice(1)
                                    .charAt(0)
                                    .toUpperCase() + category.tag.slice(2)}
                            </Link>
                        </div>
                    );
                }).sort()}
            </div>
        </div>
    );
};

export default Categories;
