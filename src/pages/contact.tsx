import { Box, Typography } from '@mui/material';

export default function Contact() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Author Contacts
      </Typography>
      <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          <em>Due to the double-blind review process, we are unable to provide contact information for the authors at this time.</em>
        </Typography>
    </Box>
  );
} 