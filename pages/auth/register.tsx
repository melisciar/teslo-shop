import { useState, useContext } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'
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
import { ErrorOutline } from '@mui/icons-material'

import { AuthContext } from '@/context'
import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { getSession, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'

type FormData = {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const router = useRouter()
  const { registerUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const volver = router.query.p?.toString() || '/'

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)
    const { hasError, message } = await registerUser(name, email, password)

    if (hasError) {
      setShowError(true)
      setErrorMessage(message || '')
      setTimeout(() => {
        setShowError(false)
      }, 3000)
      return
    }

    await signIn('credentials', { email, password })

    //router.replace(volver)
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
                label={errorMessage}
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
              <Link
                component={NextLink}
                href={`/auth/login?p=${volver}`}
                underline='always'
              >
                ¿Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req })

  const { p = '/' } = query

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default RegisterPage
