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
import { ErrorOutline } from '@mui/icons-material'
import { tesloApi } from '@/api'

type FormData = {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      })
      const { token, user } = data
      console.log({ token, user })
    } catch (error) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }
  }
  return (
    <AuthLayout title='Registro'>
      <form onSubmit={handleSubmit(onRegisterForm)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Registrarse
              </Typography>
              <Chip
                label='Problemas con el registro'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Nombre'
                variant='outlined'
                fullWidth
                {...register('name', {
                  required: 'Este campo es obligatorio',
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos dos caracteres',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <Link component={NextLink} href='/auth/login' underline='always'>
                ¿Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
