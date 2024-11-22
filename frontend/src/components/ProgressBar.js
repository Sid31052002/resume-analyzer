import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const ProgressBar = ({ progress }) => {
    return (
        <Box>
            <Typography variant="body2" color="textSecondary">
                Progress: {Math.round(progress)}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default ProgressBar;
