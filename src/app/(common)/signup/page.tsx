'use client'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [pswd, setPswd] = useState('')
  const [lgnId, setLgnId] = useState('')

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log('Login attempt with ID:', lgnId, 'and Password:', pswd)

    try {
      const response = await fetch('/api-be/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lgnId, pswd }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log('Login successful:', data)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  //   useEffect(() => {
  //     console.log(pswd, lgnId)
  //   }, [pswd, lgnId])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            width: '100%',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5" fontWeight="bold">
            Sign In
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="lgnId"
              label="ID"
              name="lgnId"
              autoComplete="text"
              autoFocus
              onChange={(e) => {
                setLgnId(e.currentTarget.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pswd"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="pswd"
              autoComplete="current-password"
              onChange={(e) => {
                setPswd(e.currentTarget.value)
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="로그인 상태 유지"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, borderRadius: 2, fontWeight: 'bold' }}
            >
              로그인
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'계정이 없으신가요? 회원가입'}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Paper>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        ></Typography>
      </Box>
    </Container>
  )
}

export default SignupPage
