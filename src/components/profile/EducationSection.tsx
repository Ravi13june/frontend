import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description?: string;
  skills?: string[];
}

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
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
        Education
      </MotionTypography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {education.map((edu, index) => (
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
              <SchoolIcon sx={{ 
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
                {edu.degree}
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
              {edu.institution}
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
              {edu.startDate} - {edu.endDate || 'Present'}
            </Typography>
            {edu.description && (
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
                {edu.description}
              </Typography>
            )}
            {edu.skills && edu.skills.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {edu.skills.map((skill: string, skillIndex: number) => (
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

export default EducationSection; 