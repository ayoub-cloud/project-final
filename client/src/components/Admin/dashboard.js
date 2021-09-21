import React from "react";
import { Admin, Resource } from "react-admin";
import { UserList } from "./userList";
import { PostList } from "./postList";

import fakeDataProvider from "ra-data-fakerest";
import { useSelector } from "react-redux";

const Dashboard = (props) => {
    const usersData = useSelector((state) => state.usersReducer);
    const postsData = useSelector((state) => state.allPostsReducer);

    let dataProvider = fakeDataProvider({
        users: usersData,

        posts: postsData,
    });

    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} />
            <Resource name="posts" list={PostList} />
        </Admin>
    );
};
export default Dashboard;
