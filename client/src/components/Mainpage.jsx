import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Header from './Header.jsx'
import TodosWrapper from './TodosWrapper.jsx'
import jwtDecode from 'jwt-decode';
import API from '../api'
function MainPage() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState()
    const [userTodos, setUserTodos] = useState([])
    const [user, setUser] = useState({})
    let decodedToken
    const token = sessionStorage.getItem('access-token')
    if (decodedToken) {
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            refreshToken(token)
        }
    }
    async function refreshToken(oldToken) {
        console.log('refreshToken')
        await API.post(`/auth/refresh-access-token`, {
            headers: { Authorization: `Bearer ${oldToken}` },
        }).then(response => { sessionStorage.setItem('access-token', response.data.accessToken) })
    }



    useEffect(() => {
        const token = sessionStorage.getItem('access-token')
        if (!token) { navigate('/auth#sign-in') }
        else {
            try {
                decodedToken = jwtDecode(token);
                setUserId(decodedToken.userId)
            }
            catch (error) {
                throw new Error(error)
            }
        }
    }, [])
    useEffect(() => {
        async function getUser(userId) {
            await API.get(`/users/${userId}`, { headers: {'Authorization': `Bearer ${token}` } })
                .then(response => setUser(response.data))
        }
        async function getTodos(userId) {
            await API.get(`/todos/${userId}/todos`, { headers: {'Authorization': `Bearer ${token}` } })
                .then(response => setUserTodos(response.data))

        }
        if (userId !== undefined) {
            getUser(userId)
            getTodos(userId)
        }
    }, [userId])
    // console.log(user)
    function handleLogout() {
        API.post('/auth/logout', { id: user.id })
        console.log('logged out')
        sessionStorage.clear()
        return navigate('/auth#sign-in')

    }
    return (
        <div>
            <Header username={user.username} Logout={handleLogout} />
            <TodosWrapper todos={userTodos} userId={userId}/>
        </div>
    )
}

export default MainPage