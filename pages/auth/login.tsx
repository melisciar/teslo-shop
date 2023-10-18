import { useState } from 'react'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { tesloApi } from '@/api'
import { ErrorOutline } from '@mui/icons-material'

type FormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      console.log({ token, user })
    } catch (error) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }

    // Todo: navegar a la pantalla en la que se encontraba el usuario
  }

  return (
    <AuthLayout title='Ingreso'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Iniciar Sesión
              </Typography>
              <Chip
                label='Correo o contraseña inválidos'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant='outlined'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type='password'
                variant='outlined'
                fullWidth
                {...register('password', {
                  required: 'Este campo es obligatorio',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <Link
                component={NextLink}
                href='/auth/register'
                underline='always'
              >
                ¿No tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
