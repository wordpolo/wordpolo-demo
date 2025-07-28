import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          WordPolo
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Evaluating Language Model Reasoning Through Iterative Semantic Feedback
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          <em>We recommend using a desktop browser for the best experience.</em>
          <br />
          <br />
          WordPolo is a dataset consisting of 1,500 single-word puzzles, where the goal is to discover this secret word through semantic similarity feedback. WordPolo provides a unique task that <strong>demonstrates the usefulness of metrics beyond dataset accuracy, uncovers common reasoning faults in LRMs, and rewards strong and iterative strategies.</strong>
          <br />
          <br />
          This site serves as a repository for demonstrating the dataset and heuristic, while providing download links for any released materials.
          <br />
          <br />
          <Link href="/demo" style={{ color: '#1976d2', textDecoration: 'none' }}>Demo</Link> - an interactive demonstration of WordPolo gameplay using a small set of sample puzzles.
          <br />
          <Link href="/heuristic" style={{ color: '#1976d2', textDecoration: 'none' }}>Heuristic</Link> - a video demonstrating how the heuristic initializes the puzzle, obtains seed guesses, and makes a first guess, as well as a sample animation of our heuristic solving a puzzle.
          <br />
          <Link href="/downloads" style={{ color: '#1976d2', textDecoration: 'none' }}>Downloads</Link> - download links for the dataset and supporting files.
          <br />
          <Link href="/contact" style={{ color: '#1976d2', textDecoration: 'none' }}>Contact</Link> - contact information for the authors (upon publication).
          <br />
        </Typography>
      </Box>
    </Box>
  );
} 