const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const analyzeResumes = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded!' });
        }

        const results = [];
        for (const file of files) {
            const resumeText = fs.readFileSync(file.path, 'utf-8'); // Replace with `pdf-parse` or similar for extracting PDF text.

            const response = await openai.createChatCompletion({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a professional resume evaluator.' },
                    {
                        role: 'user',
                        content: `Evaluate this resume for relevance, formatting, and completeness: \n${resumeText}`,
                    },
                ],
            });

            const analysis = response.data.choices[0].message.content;
            results.push({
                fileName: file.originalname,
                analysis,
            });
        }

        // Rank resumes by a score
        const rankedResults = results.map((result, index) => ({
            ...result,
            rank: index + 1,
        }));

        res.status(200).json(rankedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { analyzeResumes };
