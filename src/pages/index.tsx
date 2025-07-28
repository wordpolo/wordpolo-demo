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
          WordPolo is a dataset consisting of 1,500 single-word puzzles, where the goal is to discover this secret word through semantic similarity feedback. WordPolo provides a unique task that <strong>demonstrates the usefulness of metrics beyond dataset accuracy, uncovers common reasoning faults in LRMs, and rewards strong and iterative strategies.</strong>
          <br />
          <br />
          This site serves as a simple repository for demonstrating the dataset and heuristic, while providing download links for the dataset and supporting files:
          <br />
          <br />
          <Link href="/about" style={{ color: '#1976d2', textDecoration: 'none' }}>About</Link> - a short description of the dataset, including how puzzles are presented and solved.
          <br />
          <Link href="/demo" style={{ color: '#1976d2', textDecoration: 'none' }}>Demo</Link> - an interactive demonstration of the puzzle using a small set of sample puzzles.
          <br />
          <Link href="/heuristic" style={{ color: '#1976d2', textDecoration: 'none' }}>Heuristic</Link> - a demonstration of our heuristic given a set of sample puzzles.
          <br />
          <Link href="/contact" style={{ color: '#1976d2', textDecoration: 'none' }}>Contact</Link> - contact information for the authors (upon publication).
        </Typography>
      </Box>
    </Box>
  );
} 