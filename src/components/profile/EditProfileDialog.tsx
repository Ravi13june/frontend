import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  useTheme,
  Chip,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CandidateProfile } from '../../types/auth';

const MotionButton = motion(Button);
const MotionTextField = motion(TextField);

interface EditProfileDialogProps {
  profile: CandidateProfile;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<CandidateProfile>) => void;
  isSubmitting: boolean;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  profile,
  open,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Partial<CandidateProfile>>(profile);
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: [] as string[],
  });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleInputChange = (field: keyof CandidateProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.startDate) {
      setFormData((prev) => ({
        ...prev,
        experience: [...(prev.experience || []), { ...newExperience }],
      }));
      setNewExperience({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        skills: [],
      });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience?.filter((_, i) => i !== index),
    }));
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.startDate) {
      setFormData((prev) => ({
        ...prev,
        education: [...(prev.education || []), { 
          degree: newEducation.degree,
          institution: newEducation.institution,
          field: newEducation.field,
          startDate: newEducation.startDate,
          endDate: newEducation.endDate,
          description: newEducation.description
        }],
      }));
      setNewEducation({
        degree: '',
        institution: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'white',
          borderRadius: 2,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Edit Profile
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Full Name"
                  value={formData.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  sx={{ mb: 2 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Title"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  sx={{ mb: 2 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12}>
                <MotionTextField
                  fullWidth
                  label="Location"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  sx={{ mb: 2 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12}>
                <MotionTextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  value={formData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  sx={{ mb: 2 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Skills */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {formData.skills?.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
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
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <MotionTextField
                fullWidth
                label="Add Skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                whileFocus={{ scale: 1.02 }}
              />
              <MotionButton
                variant="contained"
                onClick={handleAddSkill}
                startIcon={<AddIcon />}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </MotionButton>
            </Box>
          </Grid>

          {/* Experience */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Experience
            </Typography>
            {formData.experience?.map((exp, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(33, 150, 243, 0.1)',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">{exp.title} at {exp.company}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveExperience(index)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </Typography>
              </Box>
            ))}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Job Title"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience((prev) => ({ ...prev, title: e.target.value }))}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience((prev) => ({ ...prev, company: e.target.value }))}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience((prev) => ({ ...prev, startDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience((prev) => ({ ...prev, endDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12}>
                <MotionTextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience((prev) => ({ ...prev, description: e.target.value }))}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12}>
                <MotionButton
                  variant="contained"
                  onClick={handleAddExperience}
                  startIcon={<AddIcon />}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Experience
                </MotionButton>
              </Grid>
            </Grid>
          </Grid>

          {/* Education */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Education
            </Typography>
            {formData.education?.map((edu, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(33, 150, 243, 0.1)',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">{edu.degree} at {edu.institution}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveEducation(index)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </Typography>
              </Box>
            ))}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, degree: e.target.value }))}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Institution"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, institution: e.target.value }))}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Field of Study"
                  value={newEducation.field}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, field: e.target.value }))}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, startDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MotionTextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, endDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12}>
                <MotionTextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={newEducation.description}
                  onChange={(e) => setNewEducation((prev) => ({ ...prev, description: e.target.value }))}
                  whileFocus={{ scale: 1.02 }}
                />
              </Grid>
              <Grid item xs={12}>
                <MotionButton
                  variant="contained"
                  onClick={handleAddEducation}
                  startIcon={<AddIcon />}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Education
                </MotionButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <MotionButton
          onClick={onClose}
          sx={{ mr: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </MotionButton>
        <MotionButton
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </MotionButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog; 