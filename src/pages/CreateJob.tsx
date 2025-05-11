import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Chip,
  Stack,

} from '@mui/material';
import { jobs } from '../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Job title is required'),
  description: yup
    .string()
    .required('Job description is required')
    .min(50, 'Description should be at least 50 characters'),
  location: yup
    .string()
    .required('Location is required'),
  salary: yup
    .string()
    .required('Salary information is required'),
  requirements: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one requirement is required'),
  
});

export default function CreateJob() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [requirement, setRequirement] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      location: '',
      salary: '',
      requirements: [] as string[],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { salary, ...otherValues } = values;
        const jobData = {
          ...otherValues,
          employerId: user?._id,
          salary: {
            min: parseInt(salary.split('-')[0]),
            max: parseInt(salary.split('-')[1]),
            currency: 'USD'
          }
        };
        await jobs.createJob(jobData);
        navigate('/jobs');
      } catch (error: any) {
        console.error('Failed to create job:', error);
        if (error.response?.data?.error?.type === 'insufficient_quota') {
          setError('Unable to generate job matching at this time. The job will be created without matching capabilities.');
          // Retry without embedding
          try {
            const { salary, ...otherValues } = values;
            const jobData = {
              ...otherValues,
              employerId: user?._id,
              generateEmbedding: false,
              salary: {
                min: parseInt(salary.split('-')[0]),
                max: parseInt(salary.split('-')[1]),
                currency: 'USD'
              }
            };
            await jobs.createJob(jobData);
            navigate('/jobs');
          } catch (retryError: any) {
            setError(retryError.response?.data?.error || 'Failed to create job. Please try again.');
          }
        } else {
          setError(error.response?.data?.error || 'Failed to create job. Please try again.');
        }
      }
    },
  });

  const handleAddRequirement = () => {
    if (requirement.trim() && !formik.values.requirements.includes(requirement.trim())) {
      formik.setFieldValue('requirements', [...formik.values.requirements, requirement.trim()]);
      setRequirement('');
    }
  };

  const handleDeleteRequirement = (requirementToDelete: string) => {
    formik.setFieldValue(
      'requirements',
      formik.values.requirements.filter((req) => req !== requirementToDelete)
    );
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Create New Job Posting
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Job Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
          />

          <TextField
            fullWidth
            id="description"
            name="description"
            label="Job Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />

          <TextField
            fullWidth
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            margin="normal"
          />

          <TextField
            fullWidth
            id="salary"
            name="salary"
            label="Salary"
            placeholder="e.g., 120000-180000 USD"
            value={formik.values.salary}
            onChange={formik.handleChange}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
            margin="normal"
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Requirements
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="Add a requirement"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddRequirement();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddRequirement}
                disabled={!requirement.trim()}
              >
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {formik.values.requirements.map((req, index) => (
                <Chip
                  key={index}
                  label={req}
                  onDelete={() => handleDeleteRequirement(req)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
            {formik.touched.requirements && formik.errors.requirements && (
              <Typography color="error" variant="caption">
                {formik.errors.requirements as string}
              </Typography>
            )}
          </Box>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Create Job Posting
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 