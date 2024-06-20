import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(bodyParser.json());

const dbFilePath = path.resolve(__dirname, 'db.json');

// Ensure the database file exists
async function ensureDbFileExists() {
    try {
        await fs.access(dbFilePath);
        console.log('db.json already exists.');
    } catch (error) {
        console.log('Creating db.json as it does not exist.');
        await fs.writeFile(dbFilePath, '[]', 'utf-8');
    }
}
ensureDbFileExists();

// Endpoint to check if server is running
app.get('/ping', (req, res) => {
    res.send(true);
});

// Endpoint to submit new data
app.post('/submit', async (req, res) => {
    try {
        const { name, email, phone, githubLink, stopwatchTime } = req.body;
        console.log('Received data:', req.body); // Log received data for debugging

        // Check for missing fields
        if (!name || !email || !phone || !githubLink || !stopwatchTime) {
            console.error('Missing required fields:', req.body);
            return res.status(400).send('Missing required fields');
        }

        // Read existing submissions from db.json
        const data = await fs.readFile(dbFilePath, 'utf-8');
        console.log('Current db.json content:', data); // Log current content for debugging

        let submissions;
        try {
            submissions = JSON.parse(data);
        } catch (jsonParseError) {
            console.error('Error parsing JSON data:', jsonParseError);
            return res.status(500).send('Error parsing JSON data');
        }

        // Add the new submission
        submissions.push({ name, email, phone, githubLink, stopwatchTime });
        console.log('Updated submissions:', submissions); // Log updated submissions for debugging

        // Write updated submissions back to db.json
        try {
            await fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
            console.log('Data written to db.json successfully.');
            res.sendStatus(200);
        } catch (writeError) {
            console.error('Error writing to db.json:', writeError);
            res.status(500).send('Error writing to db.json');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.sendStatus(500);
    }
});

// Endpoint to read all submissions
app.get('/read', async (req, res) => {
    try {
        const data = await fs.readFile(dbFilePath, 'utf-8');
        const submissions = JSON.parse(data);
        res.json(submissions);
    } catch (error) {
        console.error('Error reading from db.json:', error);
        res.status(500).json([]);
    }
});

// Endpoint to update a submission
app.put('/update', async (req, res) => {
    try {
        const index = parseInt(req.query.index as string);
        const { name, email, phone, githubLink, stopwatchTime } = req.body;

        // Check for missing fields
        if (!name || !email || !phone || !githubLink || !stopwatchTime) {
            console.error('Missing required fields:', req.body);
            return res.status(400).send('Missing required fields');
        }

        // Read existing submissions from db.json
        const data = await fs.readFile(dbFilePath, 'utf-8');
        let submissions = JSON.parse(data);

        // Check if the index is valid
        if (index < 0 || index >= submissions.length) {
            return res.status(400).send('Invalid index');
        }

        // Update the submission
        submissions[index] = { name, email, phone, githubLink, stopwatchTime };
        await fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
        res.sendStatus(200);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.sendStatus(500);
    }
});

// Endpoint to delete a submission
app.delete('/delete', async (req, res) => {
    try {
        const index = parseInt(req.query.index as string);

        // Read existing submissions from db.json
        const data = await fs.readFile(dbFilePath, 'utf-8');
        let submissions = JSON.parse(data);

        // Check if the index is valid
        if (index < 0 || index >= submissions.length) {
            return res.status(400).send('Invalid index');
        }

        // Delete the submission
        submissions.splice(index, 1);
        await fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
        res.sendStatus(200);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.sendStatus(500);
    }
});

const port = 3000; // Ensure this matches the port your frontend is using
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
