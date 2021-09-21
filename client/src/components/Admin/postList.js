import React from "react";
import { Fragment } from "react";
import { List, Datagrid, TextField, EmailField, Button } from "react-admin";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost } from "../../actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
const BulkDeleteButton = ({ selectedIds }) => {
    const postsData = useSelector((state) => state.allPostsReducer);
    const dispatch = useDispatch();
    const deletePosts = () => {
        selectedIds.forEach((id) => {
            const post = postsData.filter((u) => u.id === id)[0];
            dispatch(deletePost(post._id));
        });
    };
    return (
        <Button
            label="Delete"
            onClick={() => {
                if (
                    window.confirm("Do you really want to delete that post ?")
                ) {
                    deletePosts();
                }
            }}
        >
            <DeleteIcon />
        </Button>
    );
};
const PostBulkActionButtons = (props) => (
    <Fragment>
        <BulkDeleteButton {...props} onClick={() => alert("delete")} />
    </Fragment>
);
export const PostList = (props) => (
    <List {...props} bulkActionButtons={<PostBulkActionButtons />}>
        <Datagrid rowClick="edit">
            <TextField source="_id" />
            <TextField source="posterId" />
            <EmailField source="message" />
            <TextField source="comments" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </Datagrid>
    </List>
);
