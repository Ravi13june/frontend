import type { ReactNode } from 'react';
import { AppBar, Box, Container, Toolbar, Typography, Button, useTheme, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
            onClick={() => navigate('/')}
          >
            Job Matcher
          </Typography>
          {user ? (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                color="inherit"
                onClick={() => navigate('/jobs')}
                sx={{ textTransform: 'none' }}
              >
                Jobs
              </Button>
              {user.role === 'employer' && (
                <Button
                  color="inherit"
                  onClick={() => navigate('/jobs/create')}
                  sx={{ textTransform: 'none' }}
                >
                  Post Job
                </Button>
              )}
              <Button
                color="inherit"
                onClick={() => navigate('/profile')}
                sx={{ textTransform: 'none' }}
              >
                Profile
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                  {user.fullName.charAt(0)}
                </Avatar>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ textTransform: 'none' }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/signup')}
                sx={{ textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
} 