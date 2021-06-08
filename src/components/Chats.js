import React,{useState, useRef, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {ChatEngine} from 'react-chat-engine'
import {auth} from '../firebase'

import {useAuth} from '../contexts/AuthContext'
import axios from 'axios'

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth()
    const [loading, setLoading] = useState(true)

    const handleLogout = async() => {
        await auth.signOut();
        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = response.blob()

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        // If user does not exist
        if(!user){
            history.push('/')
            return
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "84bd693b-58fc-4ace-b77b-027982333383",
                "user-email": user.email,
                "user-secret" : user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        // If its a new user
        .catch(() => {
            let formData = new FormData();
            formData.append('email', user.email)
            formData.append('username', user.email)
            formData.append('secret', user.uid)

            getFile(user.photoURL)
                .then(avatar => {
                    formData.append('avatar', avatar, avatar.name);
                    axios.post('https://api.chatengine.io/users',
                                formData,
                                {headers: {"private-key": "756abd22-f7e8-4dec-9216-782268249f4d"}}
                    )
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                })
        })
    }, [user,history])

    // if(!user || loading ) return 'Loading'

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Lariochat
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="84bd693b-58fc-4ace-b77b-027982333383"
                userName="user.email"
                userSecret="user.uid"
            />
        </div>
    )
}

export default Chats;
