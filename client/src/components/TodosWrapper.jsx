import React from 'react'
import Todo from './Todo'
import './todos.css'
import { Button, ButtonGroup, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import API from '../api';
function TodosWrapper({ todos, userId }) {
  const [newTodoText, setNewTodoText] = React.useState('')
  const token = sessionStorage.getItem('access-token')
  function handleAddTodo() {
    if (newTodoText.length >= 3) {
      API.post(`/todos`, { text: newTodoText, userId: userId, isCompleted: false }, { headers: { 'Authorization': `Bearer ${token}` } })
      location.reload()
    }
  }
  return (
    <div className='todos-wrapper'>
      <h1> Your Todos </h1>
      <Grid2 container sx={{ width: '100%' }}>
        <Grid2 container xs={12} sm={12} md={12} >
          <Paper sx={{ m: '20px', minHeight: '80vh', width: '100%' }} >

            {todos.length > 0 ?
              todos.map((todo) => <Todo key={todo.id} id={todo.id} text={todo.text} isCompleted={todo.isCompleted} />)
              :
              <>
                <h3>Consider adding new TODOs!</h3>
              </>
            }
            <Paper sx={{ m: '20px', p: '20px', height: 'fit-content', width: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
              <TextField value={newTodoText} onChange={(e) => { setNewTodoText(e.target.value) }} multiline placeholder='Enter name for your TODO' name='text'>Enter name</TextField>
              <Button sx={{ m: '20px 0' }} variant='contained' onClick={handleAddTodo}>
                <AddIcon />
              </Button>
            </Paper>
          </Paper>
        </Grid2>

      </Grid2>
    </div>
  )
}

export default TodosWrapper