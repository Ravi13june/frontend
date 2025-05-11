import { Box, Container, Typography, Button, Grid, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Post Jobs',
      description: 'Create and manage job postings with detailed requirements and descriptions.',
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Find Jobs',
      description: 'Browse through available positions and find your perfect match.',
    },
    {
      icon: <PersonSearchIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Matching',
      description: 'Our AI-powered system helps match candidates with the right opportunities.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  color="primary"
                  gutterBottom
                  fontWeight="bold"
                >
                  Find Your Dream Job
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                  Connect with top employers and discover opportunities that match your skills and aspirations.
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/jobs')}
                    sx={{ px: 4 }}
                  >
                    Browse Jobs
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{ px: 4 }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    color: 'primary.main',
                    bgcolor: 'background.default',
                    borderRadius: 4,
                    p: 4,
                  }}
                >
                  <WorkIcon sx={{ fontSize: 120, mb: 2 }} />
                  <Typography variant="h4" align="center" color="primary" gutterBottom>
                    Your Career Journey Starts Here
                  </Typography>
                  <Typography variant="body1" align="center" color="text.secondary">
                    Discover opportunities that match your skills and aspirations
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="primary"
          gutterBottom
          fontWeight="bold"
        >
          Why Choose Us
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          We make job searching and hiring simple and efficient
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 