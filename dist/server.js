"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const dbFilePath = path_1.default.resolve(__dirname, 'db.json');
// Ensure the database file exists
function ensureDbFileExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(dbFilePath);
            console.log('db.json already exists.');
        }
        catch (error) {
            console.log('Creating db.json as it does not exist.');
            yield promises_1.default.writeFile(dbFilePath, '[]', 'utf-8');
        }
    });
}
ensureDbFileExists();
// Endpoint to check if server is running
app.get('/ping', (req, res) => {
    res.send(true);
});
// Endpoint to submit new data
app.post('/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, githubLink, stopwatchTime } = req.body;
        console.log('Received data:', req.body); // Log received data for debugging
        // Check for missing fields
        if (!name || !email || !phone || !githubLink || !stopwatchTime) {
            console.error('Missing required fields:', req.body);
            return res.status(400).send('Missing required fields');
        }
        // Read existing submissions from db.json
        const data = yield promises_1.default.readFile(dbFilePath, 'utf-8');
        console.log('Current db.json content:', data); // Log current content for debugging
        let submissions;
        try {
            submissions = JSON.parse(data);
        }
        catch (jsonParseError) {
            console.error('Error parsing JSON data:', jsonParseError);
            return res.status(500).send('Error parsing JSON data');
        }
        // Add the new submission
        submissions.push({ name, email, phone, githubLink, stopwatchTime });
        console.log('Updated submissions:', submissions); // Log updated submissions for debugging
        // Write updated submissions back to db.json
        try {
            yield promises_1.default.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
            console.log('Data written to db.json successfully.');
            res.sendStatus(200);
        }
        catch (writeError) {
            console.error('Error writing to db.json:', writeError);
            res.status(500).send('Error writing to db.json');
        }
    }
    catch (error) {
        console.error('Unexpected error:', error);
        res.sendStatus(500);
    }
}));
// Endpoint to read all submissions
app.get('/read', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(dbFilePath, 'utf-8');
        const submissions = JSON.parse(data);
        res.json(submissions);
    }
    catch (error) {
        console.error('Error reading from db.json:', error);
        res.status(500).json([]);
    }
}));
// Endpoint to update a submission
app.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.query.index);
        const { name, email, phone, githubLink, stopwatchTime } = req.body;
        // Check for missing fields
        if (!name || !email || !phone || !githubLink || !stopwatchTime) {
            console.error('Missing required fields:', req.body);
            return res.status(400).send('Missing required fields');
        }
        // Read existing submissions from db.json
        const data = yield promises_1.default.readFile(dbFilePath, 'utf-8');
        let submissions = JSON.parse(data);
        // Check if the index is valid
        if (index < 0 || index >= submissions.length) {
            return res.status(400).send('Invalid index');
        }
        // Update the submission
        submissions[index] = { name, email, phone, githubLink, stopwatchTime };
        yield promises_1.default.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Unexpected error:', error);
        res.sendStatus(500);
    }
}));
// Endpoint to delete a submission
app.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.query.index);
        // Read existing submissions from db.json
        const data = yield promises_1.default.readFile(dbFilePath, 'utf-8');
        let submissions = JSON.parse(data);
        // Check if the index is valid
        if (index < 0 || index >= submissions.length) {
            return res.status(400).send('Invalid index');
        }
        // Delete the submission
        submissions.splice(index, 1);
        yield promises_1.default.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Unexpected error:', error);
        res.sendStatus(500);
    }
}));
const port = 3000; // Ensure this matches the port your frontend is using
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
