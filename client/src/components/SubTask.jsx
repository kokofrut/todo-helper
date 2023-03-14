import React from 'react'
import { Checkbox, Typography, Card, Box } from '@mui/material';
import API from '../api';
function SubTask({ data }) {
    const [isChecked, setIsChecked] = React.useState(data.isCompleted);
    return (
        <Box sx={{ margin: "30px", display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderBottom: '1px solid grey' }}>
            <Checkbox
                checked={isChecked}
                onChange={(e) => {
                    API.put(`subtasks/${data.id}`, { isCompleted: e.target.checked }, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access-token')}` } });
                    setIsChecked(e.target.checked);
                }}
            />
            <Typography
                style={{ display: 'inline-block', marginLeft: 10, verticalAlign: 'top' }}
                variant="subtitle1"
                component="div"
                sx={{ textDecoration: isChecked ? 'line-through' : 'none' }}
            >
                {data.text}
            </Typography>
        </Box>
    )
}

export default SubTask