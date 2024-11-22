import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Results = ({ results }) => {
    return (
        <div>
            <Typography variant="h5">Analysis Results:</Typography>
            {results.map((result, index) => (
                <Card key={index} style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Typography variant="h6">{result.fileName}</Typography>
                        <Typography>Rank: {result.rank}</Typography>
                        <Typography>
                            Analysis: {result.analysis || "No details available"}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Results;
