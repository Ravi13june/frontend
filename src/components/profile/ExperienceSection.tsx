import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
  skills?: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <MotionTypography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: theme.palette.mode === 'dark'
            ? '#90CAF9'
            : 'primary.main',
          mb: 3
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Work Experience
      </MotionTypography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {experiences.map((exp, index) => (
          <MotionBox
            key={index}
            sx={{
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
            whileHover={{
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(144, 202, 249, 0.2)'
                : '0 8px 24px rgba(33, 150, 243, 0.15)',
              x: 5
            }}
            transition={{ duration: 0.3,delay: 0.7 + index * 0.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <WorkIcon sx={{ 
                color: theme.palette.mode === 'dark'
                  ? '#90CAF9'
                  : 'primary.main'
              }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'text.primary'
                }}
              >
                {exp.title}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.mode === 'dark'
                  ? '#90CAF9'
                  : 'primary.main',
                mb: 1
              }}
            >
              {exp.company}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'text.secondary',
                mb: 2
              }}
            >
              {exp.startDate} - {exp.endDate || 'Present'}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'text.primary',
                mb: 2,
                whiteSpace: 'pre-line'
              }}
            >
              {exp.description}
            </Typography>
            {exp.skills && exp.skills.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {exp.skills.map((skill, skillIndex) => (
                  <Chip
                    key={skillIndex}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(144, 202, 249, 0.16)'
                        : 'rgba(33, 150, 243, 0.1)',
                      color: theme.palette.mode === 'dark'
                        ? '#90CAF9'
                        : 'primary.main',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(144, 202, 249, 0.3)'
                        : 'rgba(33, 150, 243, 0.3)',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(144, 202, 249, 0.3)'
                          : 'rgba(33, 150, 243, 0.2)',
                      }
                    }}
                  />
                ))}
              </Box>
            )}
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};

export default ExperienceSection; 