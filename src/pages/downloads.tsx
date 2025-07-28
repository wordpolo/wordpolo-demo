import { Box, Typography, Link } from '@mui/material';

export default function Downloads() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
        Downloads
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        All source code and dataset materials can be found at{' '}
        <Link 
          href="https://anonymous.4open.science/r/wordpolo-data-CA8D"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://anonymous.4open.science/r/wordpolo-data-CA8D
        </Link>
      </Typography>
      <Typography variant="body1">
        Please note, we are withholding our dataset until publication. Presently, this repository contains the code used to run the heuristic, with instructions for deployment.
      </Typography>
    </Box>
  );
} 