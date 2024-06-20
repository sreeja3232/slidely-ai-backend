Here is a detailed and polished README file for your backend server repository:

```markdown
# Slidely AI Backend

Welcome to the Slidely AI Backend repository. This project contains the backend code for the Slidely AI Windows Desktop App. The backend is built using Express.js and TypeScript, and it uses a JSON file as a database to store submissions.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Submit New Data:** Accept and store new form submissions.
- **Read Submissions:** Retrieve stored submissions.
- **Update Submissions:** Modify existing submissions.
- **Delete Submissions:** Remove existing submissions.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js
- npm (Node Package Manager)

## Installation

To install and set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sreeja3232/slidely-ai-backend.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd slidely-ai-backend
   ```
3. **Install the dependencies:**
   ```sh
   npm install
   ```
4. **Compile the TypeScript code:**
   ```sh
   npx tsc
   ```

## Usage

1. **Start the server:**
   ```sh
   node dist/server.js
   ```
2. The server will run on `http://localhost:3000`.

## API Endpoints

- `GET /ping`: Check if the server is running.
- `POST /submit`: Submit new data.
  - **Body Parameters:**
    - `name` (string): Name of the submitter.
    - `email` (string): Email of the submitter.
    - `phone` (string): Phone number of the submitter.
    - `githubLink` (string): GitHub repository link.
    - `stopwatchTime` (string): Stopwatch time.

- `GET /read`: Read all submissions.

- `PUT /update?index={index}`: Update a submission by index.
  - **Query Parameters:**
    - `index` (number): Index of the submission to update.
  - **Body Parameters:**
    - `name` (string): Name of the submitter.
    - `email` (string): Email of the submitter.
    - `phone` (string): Phone number of the submitter.
    - `githubLink` (string): GitHub repository link.
    - `stopwatchTime` (string): Stopwatch time.

- `DELETE /delete?index={index}`: Delete a submission by index.
  - **Query Parameters:**
    - `index` (number): Index of the submission to delete.

## Contributing

Contributions are always welcome! To get started:

1. **Fork the repository:**
   - Click the "Fork" button at the top right of this repository.

2. **Clone your fork:**
   ```sh
   git clone https://github.com/sreeja3232/slidely-ai-backend.git
   ```

3. **Create a branch:**
   ```sh
   git checkout -b feature/your-feature
   ```

4. **Make your changes and commit them:**
   ```sh
   git commit -m 'Add some feature'
   ```

5. **Push to the branch:**
   ```sh
   git push origin feature/your-feature
   ```

6. **Open a pull request:**
   - Navigate to your fork on GitHub.
   - Click the "New pull request" button.

## Contact

If you have any questions or suggestions, feel free to contact the repository owner at [mail2sreeja.cse@gmail.com](mailto:mail2sreeja.cse@gmail.com).

---

Thank you for using Slidely AI Backend! We hope it helps you create efficient and effective forms. Happy coding!
```

