import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WorkIcon from '@mui/icons-material/Work';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              color: 'primary.main',
            }}
            onClick={() => navigate('/')}
          >
            <WorkIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Owow Jobs
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/jobs')}
                sx={{ color: 'text.primary' }}
              >
                Jobs
              </Button>
              {user.role === 'employer' && (
                <Button
                  color="inherit"
                  onClick={() => navigate('/jobs/create')}
                  sx={{ color: 'text.primary' }}
                >
                  Post Job
                </Button>
              )}
              <Button
                color="inherit"
                onClick={() => navigate('/profile')}
                sx={{ color: 'text.primary' }}
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ color: 'text.primary' }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </Box>
          </motion.div>
        )}
      </Toolbar>
    </AppBar>
  );
} 