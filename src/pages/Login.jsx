import React, { useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useState } from 'react';
import { styled } from "@mui/material/styles"
import { blue } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, reset } from '../features/user/userSlice';

const LoginContainer = styled(Box)({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  height:'100vh',
  backgroundColor:blue[400]
})

const FormWrapper = styled(Box)(({theme})=>({
  display:'flex',
  flexDirection:'column',
  padding:'50px',
  width:'300px',
  [theme.breakpoints.down('md')]:{
    width:'200px'
  },
  gap:'20px',
  backgroundColor:'white'
}))

const LinkWrapper = styled(Box)(({theme})=>({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  [theme.breakpoints.down('md')]:{
    flexDirection:'column'
  },
}))


const Login = () => {
  const[showPassword, setShowPassword] = useState(false)

  const handlePasswordVisibility = ()=>{
    setShowPassword(!showPassword)
  }
  
  const handleMouseDown = (e) => {
    e.preventDefault()
}

const[email, setEmail] = useState("")
const[password, setPassword] = useState("")
const[errState, setErrState] = useState(null)



const navigate = useNavigate()

const dispatch = useDispatch()
const { isSuccess, isLoading, isError, errorMessage} = useSelector(state => state.auth)

useEffect(()=>{ 
  if(isError){
    setErrState(errorMessage)
  } 
  if(isSuccess){
    setEmail('')
    setPassword('')
    navigate('/') 
  }

  return ()=>{
    dispatch(reset())
  }
},[isError, errorMessage, isSuccess, navigate, dispatch])

const canSaveData = [email, password].every(Boolean) && !isLoading

const handleLogin = (e)=>{
  e.preventDefault()
 
 if(canSaveData){
  dispatch(loginUserThunk({email, password}))
 }

}


  return (
    <LoginContainer>
        <Typography variant='h1' fontSize='25px' color='white' mb={'20px'}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
        <FormWrapper>
          <Typography textAlign='center' variant='body1'>
             Please fill information in the fields below
          </Typography>
          {errState && 
             <Alert  severity="error" >
              {errState}
             </Alert>
          }
           
                <TextField
                  autoComplete='off'
                  autoFocus
                  margin="normal"
                  variant="standard"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                 />
               <TextField
                 autoComplete='off'
                 autoFocus
                 margin="normal"
                 variant="standard"
                 id='password'
                 label='Password'
                 type={showPassword ? 'text' : 'password'}
                 fullWidth
                 inputProps={{ minLength: 6 }}
                 required
                 InputProps={{
                  endAdornment:(
                  <InputAdornment position='end'>
                    <IconButton onClick={handlePasswordVisibility} onMouseDown={handleMouseDown}>
                     {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                   </IconButton>
                 </InputAdornment>
                 )}}

                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
               />  

           {isLoading 
           ? (<CircularProgress color='primary' />): ( 
            <Button 
              type='submit'
              variant='contained' 
              endIcon={<SendIcon />}
              sx={{color:'white'}}
              disabled={!canSaveData}
            >
              Submit
            </Button> 
            )}
            <LinkWrapper>
              <Typography sx={{mt:'10px'}} variant='caption'>
                Don't you have an account?
              </Typography>
              <Button LinkComponent={Link} to="/register">Register</Button>
            </LinkWrapper> 
            
        </FormWrapper>
        </form>
    </LoginContainer>
  )
}

export default Login