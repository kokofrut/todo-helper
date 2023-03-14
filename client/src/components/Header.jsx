import { AppBar, Toolbar, Button } from '@mui/material'
import { useNavigate } from 'react-router'
// Defining the Header component
import './header.css'
const Header = ({username, Logout}) => {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('access-token')
    return (
        <AppBar position="absolute">
            <Toolbar sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className="header-container">
                    <h2>Welcome to Your TODO app <i>{username}</i></h2>
                    {token ? ( // Display appropriate buttons based on login status
                        <div>
                            <Button color="secondary" variant="contained" onClick={() => Logout()}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button color="primary" variant="contained"  onClick={() => navigate("/auth#sign-in")}>Register</Button>
                            <Button color="secondary" variant="contained"  onClick={() => navigate("/auth#sign-up")}>Login</Button>
                        </div>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header