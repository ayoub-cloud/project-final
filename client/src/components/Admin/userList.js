import React from "react"
import { Fragment } from 'react';
import { List, Datagrid, TextField, EmailField,Button} from 'react-admin';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteUser } from "../../actions/user.actions";
import { useDispatch, useSelector } from "react-redux";

const BulkDeleteButton = ({ selectedIds }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const deleteUsers = () => {
        selectedIds.forEach(id =>{
            const user = usersData.filter(u => u.id === id )[0];
            dispatch(deleteUser(user._id));
        });
    }
    return (
        <Button
            label="Delete"
            onClick={() => {
                if (window.confirm("Do you really want to delete that user ?")) {
                    deleteUsers();
                }}}
        >
            <DeleteIcon />
        </Button>
    );
};

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} onClick={()=> alert('delete')}/>
    </Fragment>
);

export const UserList = props => (
    <List {...props} bulkActionButtons={<PostBulkActionButtons/>}>
        <Datagrid rowClick="edit">
            <TextField source="_id" />
            <TextField source="pseudo" />
            <EmailField source="email" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
            <TextField source="bio" />
        </Datagrid>
    </List>
);