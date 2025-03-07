# Simple Transactions Api

A simple API for managing financial transactions. Add income or expenses, list transactions, and check the summary
## Installation

```bash
# Clone the repository
https://github.com/joas-vieira/simple-transactions-api.git
git@github.com:joas-vieira/simple-transactions-api.git

# Navigate into the project folder
cd simple-transactions-api
```

## How to Use

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run e2e tests
npm run test
```

## API Documentation

#### Create a new transaction
```bash
  POST /transactions
```

#### List all transactions
```bash
  GET /transactions
```

#### Get a Specific Transaction
```bash
  GET /transactions/:id
```

#### Get Summary
```bash
  GET /transactions/summary
```
