import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profiles } from '../services/api';
import type { CandidateProfile } from '../types/auth';
import type { Education } from '../types';

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface ProfileFormValues {
  title: string;
  bio: string;
  location: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

const validationSchema = yup.object({
  title: yup.string().required('Professional title is required'),
  bio: yup.string().required('Bio is required'),
  location: yup.string().required('Location is required'),
  skills: yup.array().of(yup.string()).min(1, 'At least one skill is required'),
  experience: yup.array().of(
    yup.object({
      title: yup.string().required('Job title is required'),
      company: yup.string().required('Company name is required'),
      startDate: yup.date().required('Start date is required'),
      endDate: yup.date(),
      description: yup.string().required('Description is required'),
    })
  ),
  education: yup.array().of(
    yup.object({
      institution: yup.string().required('Institution name is required'),
      degree: yup.string().required('Degree is required'),
      field: yup.string().required('Field of study is required'),
      startDate: yup.date().required('Start date is required'),
      endDate: yup.date(),
      description: yup.string(),
    })
  ),
});

const getFieldError = (errors: any, field: string) => {
  return typeof errors === 'string' ? errors : errors?.[field];
};

export default function EditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery<CandidateProfile>({
    queryKey: ['profile'],
    queryFn: profiles.getProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (values: Partial<CandidateProfile>) => profiles.updateProfile(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/profile');
    },
  });

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      title: profile?.title || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      skills: profile?.skills || [],
      experience: profile?.experience || [],
      education: profile?.education || [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateProfileMutation.mutate(values);
    },
  });

  const handleAddSkill = () => {
    const newSkill = prompt('Enter a new skill:');
    if (newSkill) {
      formik.setFieldValue('skills', [...formik.values.skills, newSkill]);
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...formik.values.skills];
    newSkills.splice(index, 1);
    formik.setFieldValue('skills', newSkills);
  };

  const handleAddExperience = () => {
    formik.setFieldValue('experience', [
      ...formik.values.experience,
      { title: '', company: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperience = [...formik.values.experience];
    newExperience.splice(index, 1);
    formik.setFieldValue('experience', newExperience);
  };

  const handleAddEducation = () => {
    formik.setFieldValue('education', [
      ...formik.values.education,
      { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = [...formik.values.education];
    newEducation.splice(index, 1);
    formik.setFieldValue('education', newEducation);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Error loading profile</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>

        {updateProfileMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to update profile. Please try again.
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Professional Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={Boolean(getFieldError(formik.errors.title, ''))}
                helperText={getFieldError(formik.errors.title, '') as string}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="bio"
                name="bio"
                label="Bio"
                multiline
                rows={4}
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={Boolean(getFieldError(formik.errors.bio, ''))}
                helperText={getFieldError(formik.errors.bio, '') as string}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={Boolean(getFieldError(formik.errors.location, ''))}
                helperText={getFieldError(formik.errors.location, '') as string}
              />
            </Grid>

            {/* Skills */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formik.values.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(index)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
              <Button startIcon={<AddIcon />} onClick={handleAddSkill}>
                Add Skill
              </Button>
              {getFieldError(formik.errors.skills, '') && (
                <Typography color="error" variant="caption" display="block">
                  {getFieldError(formik.errors.skills, '') as string}
                </Typography>
              )}
            </Grid>

            {/* Experience */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Experience
              </Typography>
              {formik.values.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={11}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...formik.values.experience];
                          newExp[index] = { ...exp, title: e.target.value };
                          formik.setFieldValue('experience', newExp);
                        }}
                        error={Boolean(getFieldError(formik.errors.experience?.[index], 'title'))}
                        helperText={getFieldError(formik.errors.experience?.[index], 'title') as string}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={() => handleRemoveExperience(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...formik.values.experience];
                          newExp[index] = { ...exp, company: e.target.value };
                          formik.setFieldValue('experience', newExp);
                        }}
                        error={Boolean(getFieldError(formik.errors.experience?.[index], 'company'))}
                        helperText={getFieldError(formik.errors.experience?.[index], 'company') as string}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Start Date"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExp = [...formik.values.experience];
                          newExp[index] = { ...exp, startDate: e.target.value };
                          formik.setFieldValue('experience', newExp);
                        }}
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(getFieldError(formik.errors.experience?.[index], 'startDate'))}
                        helperText={getFieldError(formik.errors.experience?.[index], 'startDate') as string}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="End Date"
                        value={exp.endDate || ''}
                        onChange={(e) => {
                          const newExp = [...formik.values.experience];
                          newExp[index] = { ...exp, endDate: e.target.value };
                          formik.setFieldValue('experience', newExp);
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...formik.values.experience];
                          newExp[index] = { ...exp, description: e.target.value };
                          formik.setFieldValue('experience', newExp);
                        }}
                        error={Boolean(getFieldError(formik.errors.experience?.[index], 'description'))}
                        helperText={getFieldError(formik.errors.experience?.[index], 'description') as string}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={handleAddExperience}>
                Add Experience
              </Button>
            </Grid>

            {/* Education */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Education
              </Typography>
              {formik.values.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={11}>
                      <TextField
                        fullWidth
                        label="Institution"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...formik.values.education];
                          newEdu[index] = { ...edu, institution: e.target.value };
                          formik.setFieldValue('education', newEdu);
                        }}
                        error={Boolean(getFieldError(formik.errors.education?.[index], 'institution'))}
                        helperText={getFieldError(formik.errors.education?.[index], 'institution') as string}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={() => handleRemoveEducation(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...formik.values.education];
                          newEdu[index] = { ...edu, degree: e.target.value };
                          formik.setFieldValue('education', newEdu);
                        }}
                        error={Boolean(getFieldError(formik.errors.education?.[index], 'degree'))}
                        helperText={getFieldError(formik.errors.education?.[index], 'degree') as string}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Field of Study"
                        value={edu.field}
                        onChange={(e) => {
                          const newEdu = [...formik.values.education];
                          newEdu[index] = { ...edu, field: e.target.value };
                          formik.setFieldValue('education', newEdu);
                        }}
                        error={Boolean(getFieldError(formik.errors.education?.[index], 'field'))}
                        helperText={getFieldError(formik.errors.education?.[index], 'field') as string}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Start Date"
                        value={edu.startDate}
                        onChange={(e) => {
                          const newEdu = [...formik.values.education];
                          newEdu[index] = { ...edu, startDate: e.target.value };
                          formik.setFieldValue('education', newEdu);
                        }}
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(getFieldError(formik.errors.education?.[index], 'startDate'))}
                        helperText={getFieldError(formik.errors.education?.[index], 'startDate') as string}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="End Date"
                        value={edu.endDate || ''}
                        onChange={(e) => {
                          const newEdu = [...formik.values.education];
                          newEdu[index] = { ...edu, endDate: e.target.value };
                          formik.setFieldValue('education', newEdu);
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Description"
                        value={edu.description || ''}
                        onChange={(e) => {
                          const newEdu = [...formik.values.education];
                          newEdu[index] = { ...edu, description: e.target.value };
                          formik.setFieldValue('education', newEdu);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={handleAddEducation}>
                Add Education
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
} 