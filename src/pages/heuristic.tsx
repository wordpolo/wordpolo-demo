import { Box, Typography } from '@mui/material';

export default function Heuristic() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
        Heuristic Demonstration
      </Typography>
      <Typography variant="h6" component="h6" sx={{ mb: 4 }}>
        Along with the explanation we provide in the paper, the video below details how the first two seed guesses are used to generate a third guess, explained through a combination of the heuristic math and each guess as both a word and a vector.
      </Typography>
      <Box sx={{ 
        width: '100%', 
        position: 'relative',
        paddingTop: '56.25%', // 16:9 Aspect Ratio
        mb: 4,
      }}>
        <video
          controls
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <source src="/Heuristic Demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      <Typography variant="h6" component="h6" sx={{ mb: 4 }}>
        The animation below also shows an example of the heuristic discovering a secret word of "fauna". The top five guesses displayed on the right represent the guesses used to create a new centroid, while the blue dots represent the guesses using Principal Component Analysis. The red star represents the secret word.
      </Typography>
      <Box 
        component="img"
        src="/attempt967.gif"
        alt="Example attempt demonstration"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </Box>
  );
} 