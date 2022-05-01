import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';


// Components
import Navbar from './Navbar';

// Styles
import styles from "./Chats.module.css"

// Context
import { AuthContext } from "../context/AuthContextProvider"

const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();


    useEffect(() => {
        if (!user) {
            history.push("/")
            return;
        }
        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "c6fd99e9-8250-46c1-9369-bdf5d95d8f3f",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append("email", user.email);
                formdata.append("username", user.email);
                formdata.append("secret", user.uid);
                getFile(user.photoURL)
                    .then(avatar => {
                        formdata.append("avatar", avatar, avatar.name);
                        axios.post("https://api.chatengine.io/users", formdata, {
                            headers: {
                                "private-key": "0f048f49-d1a0-400c-97fc-c454cb71aad0"

                            }
                        })
                        .then(() => setLoading(false))
                        .catch(error => console.log(error))
                    })
            })
    }, [user, history])


    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { typs: "image/jpeg" })

    }


    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/")
    }
    console.log(user);
    if (!user | loading) return "Loading..."

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="c6fd99e9-8250-46c1-9369-bdf5d95d8f3f"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;