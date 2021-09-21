import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updatePseudo } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
    const [pseudo, setPseudo] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const error = useSelector((state) => state.errorReducer.userError);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const handleUpdate = () => {
        dispatch(updatePseudo(userData._id, pseudo));
        setUpdateForm(false);
    };

    return (
        <div className="profil-container">
            <LeftNav />
            <h1> Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Profile Photo</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>pseudo</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>
                                    {userData.pseudo}
                                </p>
                                <button
                                    onClick={() => setUpdateForm(!updateForm)}
                                >
                                    Modify pseudo
                                </button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.pseudo}
                                    onChange={(e) => setPseudo(e.target.value)}
                                ></textarea>
                                <button onClick={handleUpdate}>
                                    Confirm modifications
                                </button>
                            </>
                        )}
                    </div>
                    <h4>Member since : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopup(true)}>
                        Followings :{" "}
                        {userData.following ? userData.following.length : ""}
                    </h5>
                    <h5 onClick={() => setFollowersPopup(true)}>
                        Followers :{" "}
                        {userData.followers ? userData.followers.length : ""}
                    </h5>
                </div>
            </div>
            {followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Followings</h3>
                        <span
                            className="cross"
                            onClick={() => setFollowingPopup(false)}
                        >
                            &#10005;
                        </span>
                        <ul>
                            {usersData.map((user) => {
                                for (
                                    let i = 0;
                                    i < userData.following.length;
                                    i++
                                ) {
                                    if (user._id === userData.following[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img
                                                    src={user.picture}
                                                    alt="user-pic"
                                                />
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler
                                                        idToFollow={user._id}
                                                        type={"suggestion"}
                                                    />
                                                </div>
                                            </li>
                                        );
                                    }
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Followers</h3>
                        <span
                            className="cross"
                            onClick={() => setFollowersPopup(false)}
                        >
                            &#10005;
                        </span>
                        <ul>
                            {usersData.map((user) => {
                                for (
                                    let i = 0;
                                    i < userData.followers.length;
                                    i++
                                ) {
                                    if (user._id === userData.followers[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img
                                                    src={user.picture}
                                                    alt="user-pic"
                                                />
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler
                                                        idToFollow={user._id}
                                                        type={"suggestion"}
                                                    />
                                                </div>
                                            </li>
                                        );
                                    }
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfil;