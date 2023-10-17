import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material'
import { CartContext, UiContext } from '@/context'

export const Navbar = () => {
  const router = useRouter()
  const { toggleSideMenu } = useContext(UiContext)
  const { numberOfItems } = useContext(CartContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return

    router.push(`/search/${searchTerm}`)
  }

  return (
    <AppBar>
      <Toolbar>
        <Link component={NextLink} href='/' display='flex' alignItems='center'>
          <Typography variant='h6'>Teslo |</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>
        <Box flex={1} />
        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
          }}
          className='fadeIn'
        >
          <Link component={NextLink} href='/category/men'>
            <Button
              color={router.asPath === '/category/men' ? 'primary' : 'info'}
            >
              Hombres
            </Button>
          </Link>
          <Link component={NextLink} href='/category/women'>
            <Button
              color={router.asPath === '/category/women' ? 'primary' : 'info'}
            >
              Mujeres
            </Button>
          </Link>
          <Link component={NextLink} href='/category/kid'>
            <Button
              color={router.asPath === '/category/kid' ? 'primary' : 'info'}
            >
              Niñxs
            </Button>
          </Link>
        </Box>
        <Box flex={1} />

        {/* Pantallas grandes */}
        {isSearchVisible ? (
          <Input
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type='text'
            placeholder='Buscar...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className='fadeIn'
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <Link component={NextLink} href='/cart'>
          <IconButton>
            <Badge badgeContent={numberOfItems} max={9} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
