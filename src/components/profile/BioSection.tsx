import React from 'react';
import {
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionTypography = motion(Typography);

interface BioSectionProps {
  bio: string;
}

const BioSection: React.FC<BioSectionProps> = ({ bio }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(33, 150, 243, 0.05)',
        borderRadius: 2,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0, 0, 0, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(33, 150, 243, 0.1)',
      }}
      component={motion.div}
      whileHover={{
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 24px rgba(144, 202, 249, 0.2)'
          : '0 8px 24px rgba(33, 150, 243, 0.15)',
      }}
      transition={{ duration: 0.3 }}
    >
      <MotionTypography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: theme.palette.mode === 'dark'
            ? '#90CAF9'
            : 'primary.main',
          mb: 2
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        About Me
      </MotionTypography>
      <MotionTypography
        variant="body1"
        sx={{
          color: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'text.primary',
          lineHeight: 1.8,
          whiteSpace: 'pre-line'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {bio}
      </MotionTypography>
    </Box>
  );
};

export default BioSection; 