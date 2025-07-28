import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
} from '@mui/material';
import API_ROUTES from '../config/routes';

interface GuessResult {
  guess: string;
  rank: number;
  target_word: string;
}

interface Guess extends GuessResult {
  timestamp: number;
}

const PUZZLES = {
  'Puzzle 1': 'banana',
  'Puzzle 2': 'doctor',
  'Puzzle 3': 'science',
  'Puzzle 4': 'teacher',
};

export default function Demo() {
  const [currentPuzzle, setCurrentPuzzle] = useState<string>('Puzzle 1');
  const [guessInput, setGuessInput] = useState('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showChangeWarning, setShowChangeWarning] = useState(false);
  const [pendingPuzzle, setPendingPuzzle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const targetWord = PUZZLES[currentPuzzle as keyof typeof PUZZLES];

  const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  };

  const handlePuzzleChange = (puzzle: string) => {
    if (guesses.length > 0) {
      setPendingPuzzle(puzzle);
      setShowChangeWarning(true);
    } else {
      setCurrentPuzzle(puzzle);
      setGuesses([]);
      setIsWon(false);
      setShowWinModal(false);
      setError(null);
    }
  };

  const confirmPuzzleChange = () => {
    if (pendingPuzzle) {
      setCurrentPuzzle(pendingPuzzle);
      setGuesses([]);
      setIsWon(false);
      setShowWinModal(false);
      setError(null);
    }
    setShowChangeWarning(false);
    setPendingPuzzle(null);
  };

  const handleGuessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim() || isWon || isLoading) return;

    const guess = guessInput.trim().toLowerCase();
    setGuessInput('');
    setError(null);
    setStatusMessage(null);

    // Check for duplicate guess
    if (guesses.some(g => g.guess.toLowerCase() === guess)) {
      setStatusMessage('This word has already been guessed.');
      return;
    }

    setIsLoading(true);

    // Check if it's the target word
    if (guess === targetWord) {
      const newGuess: Guess = {
        guess,
        rank: 1,
        target_word: targetWord,
        timestamp: Date.now(),
      };
      setGuesses(prev => [...prev, newGuess].sort((a, b) => a.rank - b.rank));
      setIsWon(true);
      setShowWinModal(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchWithTimeout(API_ROUTES.GUESS.RANK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          target_word: targetWord,
          guess: guess,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorData = JSON.parse(errorText);
        
        // Handle word not found in rankings
        if (response.status === 404 && errorData.error === 'Word not found in rankings') {
          setStatusMessage('That word is not in our dictionary. Try another word!');
          return;
        }
        
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result: GuessResult = await response.json();
      const newGuess: Guess = {
        ...result,
        timestamp: Date.now(),
      };

      setGuesses(prev => [...prev, newGuess].sort((a, b) => a.rank - b.rank));
    } catch (err: unknown) {
      console.error('Error details:', err);
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. The server is taking too long to respond.');
        } else if (err instanceof TypeError && err.message === 'Failed to fetch') {
          setError('Unable to connect to the server. Please check your connection and try again.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to submit guess. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getGuessColor = (rank: number) => {
    if (rank === 1) return '#4caf50';  // Green for exact match
    if (rank < 100) return '#81c784';  // Light green
    if (rank < 1000) return '#fff176'; // Yellow
    return '#ef5350';                  // Red
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h1" component="h1">
        Demo
      </Typography>
      <Typography variant="h6" component="h6">
        Play one of our four example puzzles to see the scoring in action!
        <br />
        <br />
      </Typography>
      <ButtonGroup 
        variant="contained" 
        sx={{ width: '100%', mb: 4 }}
        size="large"
      >
        {Object.keys(PUZZLES).map((puzzle) => (
          <Button
            key={puzzle}
            onClick={() => handlePuzzleChange(puzzle)}
            variant={currentPuzzle === puzzle ? 'contained' : 'outlined'}
            sx={{ flex: 1 }}
          >
            {puzzle}
          </Button>
        ))}
      </ButtonGroup>

      <form onSubmit={handleGuessSubmit}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <TextField
            fullWidth
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            placeholder={isWon ? 'Puzzle completed!' : 'Enter your guess'}
            disabled={isWon || isLoading}
            error={!!error}
            helperText={error}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isWon || !guessInput.trim() || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
        {statusMessage && (
          <Typography 
            color="text.secondary" 
            sx={{ 
              mb: 3, 
              mt: 1, 
              fontSize: '0.875rem',
              fontStyle: 'italic'
            }}
          >
            {statusMessage}
          </Typography>
        )}
      </form>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {guesses.map((guess) => (
          <Paper
            key={`${guess.guess}-${guess.timestamp}`}
            sx={{
              p: 2,
              backgroundColor: getGuessColor(guess.rank),
              color: guess.rank < 1000 ? 'black' : 'white',
            }}
          >
            <Typography>
              {guess.guess} - Rank: {guess.rank}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Dialog open={showWinModal} onClose={() => setShowWinModal(false)}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            You found the word: {targetWord}!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWinModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showChangeWarning}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography>
            Changing puzzles will reset your current progress. Are you sure?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowChangeWarning(false);
            setPendingPuzzle(null);
          }}>
            Cancel
          </Button>
          <Button onClick={confirmPuzzleChange} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 