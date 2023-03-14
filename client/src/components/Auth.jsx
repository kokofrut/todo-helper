
import SignIn from './Login'
import SignUp from './Register'
import API from '../api'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { change } from '../reducers/userSlice'
import { redirect } from 'react-router'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
function Auth() {
    const [takenUsernames, setTakenUsernames] = useState([])
    const navigate = useNavigate()
    const [hash, setHash] = useState(window.location.hash || '#sign-in');
    const dispatch = useDispatch()
    function dispatchUser(user) {
        user.isAuthenticated = true
        dispatch(change(user))
    }
    useEffect(()=>{
        async function fetchUserNames() {
            await API.get('/auth/usernames').then(response => {setTakenUsernames(response.data.data)})
        }
        fetchUserNames()
    }, [])
    function getUser(id) {
        const accessToken = sessionStorage.getItem('access-token')
        API.get(`users/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                dispatchUser(response.data);
                navigate('/')
            }
            )
            .catch(error => {
                console.error(error);
            });

    }
    function handleRegister(username, password) {
        if (username !== '' && password !== '') {
            
            const user = { username: username, password: password }

            API.post('/auth/register', user)
            navigate('/auth#sign-in')
        }

    }
    function handleLogin(username, password) {
        const data = {
            username: username,
            password: password
        };

        API.post('auth/login', data)
            .then(response => {
                // Store access token in session storage
                sessionStorage.setItem('access-token', response.data.accessToken);
                const token = response.data.accessToken;
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                const userId = decodedToken.userId;
                getUser(userId)
            })
            .catch(error => {
                console.error(error);
            });
    }
    function handleTakenUsername(NewUsername) {
        console.log(takenUsernames.includes(NewUsername));
        return takenUsernames.includes(NewUsername) ? false : true
    }

    function handleHashChange() {
        setHash(window.location.hash);
    }
    useEffect(() => {
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div className="auth-container">
            {
                hash === '#sign-in'
                    ? <SignIn onSignIn={handleLogin} />
                    : hash === '#sign-up'
                        ? <SignUp onSignUp={handleRegister} checkForTaken={handleTakenUsername}/>
                        : null
            }
        </div>
    )
}

export default Auth