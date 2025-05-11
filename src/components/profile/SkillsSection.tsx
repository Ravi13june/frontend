import React from 'react';
import {
  Box,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Fade, Tooltip } from '@mui/material';

const MotionChip = motion(Chip);

interface SkillsSectionProps {
  skills: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const theme = useTheme();

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Box 
          sx={{ 
            width: '4px',
            height: '32px',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #90CAF9 30%, #64B5F6 90%)'
              : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            borderRadius: '2px',
            mr: 2
          }} 
        />
        <Typography 
          variant="h5"
          sx={{ 
            fontWeight: 700,
            color: 'text.primary'
          }}
        >
          Professional Skills
        </Typography>
      </Box>
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2,
          p: 2,
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(33, 150, 243, 0.03)',
          borderRadius: '12px'
        }}
      >
        {skills.map((skill) => (
          <Tooltip
            key={skill}
            title={`Proficiency in ${skill}`}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <MotionChip
              label={skill}
              whileHover={{ 
                scale: 1.05,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 16px rgba(144, 202, 249, 0.2)'
                  : '0 8px 16px rgba(33, 150, 243, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              sx={{ 
                fontSize: '1rem',
                height: '40px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(144, 202, 249, 0.16)'
                  : 'rgba(33, 150, 243, 0.08)',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' 
                  ? '#90CAF9'
                  : 'primary.main',
                '& .MuiChip-label': {
                  px: 3,
                  fontWeight: 500,
                  color: theme.palette.mode === 'dark' 
                    ? '#90CAF9'
                    : 'primary.main'
                },
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? '#90CAF9'
                    : 'primary.main',
                  borderColor: theme.palette.mode === 'dark' 
                    ? '#90CAF9'
                    : 'primary.main',
                  '& .MuiChip-label': {
                    color: theme.palette.mode === 'dark' 
                      ? '#000'
                      : '#fff'
                  }
                },
                transition: 'all 0.3s ease'
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default SkillsSection; 