import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
			<button><Link to={"new-post/"}>Create Post</Link></button>
        </div>
    );
};

export default AdminPanel;
