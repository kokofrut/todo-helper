import React from 'react'
import { Checkbox, Typography, Card, Box, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add';
import SubTask from './SubTask';
import API from '../api';
import './todos.css'

function Todo({ id, text, isCompleted }) {
  const [isChecked, setIsChecked] = React.useState(isCompleted);
  const [subTasks, setSubTasks] = React.useState([])
  const [newSubText, setNewSubText] = React.useState('')
  const token = sessionStorage.getItem('access-token')
  React.useEffect(() => {
    async function fetchSubTasks(todoId) {
      await API.get(`subtasks/todo/${todoId}`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access-token')}` } }).then((response) => (setSubTasks(response.data)))
    }
    fetchSubTasks(id)
  }, [])

  function handleAddSub() {
    if (newSubText.length >= 3) {
      API.post(`/subtasks`, { text: newSubText, todoId: id, isCompleted: false }, { headers: { 'Authorization': `Bearer ${token}` } })
      location.reload()
    }
  }

  return (
    <Card sx={{ minWidth: '500px', maxWidth: '1000px', width: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Accordion sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
        >
          <Box sx={{ display: 'inline-block', verticalAlign: 'top' }}>
            <Checkbox
              checked={isChecked}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                API.put(`todos/${id}`, { isCompleted: e.target.checked }, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access-token')}` } });
                setIsChecked(e.target.checked);
              }}
            />
            <Typography
              style={{ display: 'inline-block', marginLeft: 0, verticalAlign: 'top' }}
              variant="h4"
              component="div"
              sx={{ textDecoration: isChecked ? 'line-through' : 'none' }}
            >
              {text}
            </Typography>
          </Box>

        </AccordionSummary>
        <AccordionDetails   sx={{ width: '100%' }}>
          {subTasks.length > 0 && (
            subTasks.map((subTask, index) => (
              <SubTask key={index} data={subTask} />
            ))
          )
          }
          <Box sx={{ display: 'flex' }}>
            <Box>
              <Typography>Add new subtasks!</Typography>
              <TextField value={newSubText} onChange={(e)=>{setNewSubText(e.target.value)}} placeholder='Text of subtask' fullWidth></TextField>
            </Box>
            <Button variant='contained' sx={{ m: '30px' }} onClick={handleAddSub}>
              <AddIcon />
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

export default Todo;