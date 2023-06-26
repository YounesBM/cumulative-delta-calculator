# Cumulative Delta Calculator

Cumulative Delta Calculator is a tool that fetches trade histories for a specified trading pair from a specified exchange and calculates the cumulative delta from the trade histories. It provides a simple API to access trade data and perform calculations on the cumulative delta.

## Features

- Fetch trade histories from supported exchanges.
- Calculate the cumulative delta based on trade histories.
- Retrieve trade symbols and their corresponding market details.
- Use a **Swagger Interface** for an intuitive and user-friendly API.

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or Yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/YounesBM/cumulative-delta-calculator.git
```


2. Install the dependencies:
```bash
cd cumulative-delta-calculator
npm install
```

### Configuration

1. Create a .env file in the root directory based on the provided .env.example file.
```bash
cp .env.example .env
```

2. Set the necessary environment variables in the .env file.

### Usage

1. Start the server:
```bash
npm run start
```

2. The server should now be running at **http://localhost:3000**. You can now access the swagger interface at **http://localhost:3000/api-docs/**.

**Note** : You can also run the server in dev mode with:
```bash
npm run dev
```


## API Endpoints

The following API endpoints are available:

- **GET /exchange/:exchange/symbols**

  Get a list of symbols available on the specified exchange.

  Example: `GET /exchange/kucoin/symbols`

- **GET /exchange/:exchange/trade-history/:symbol**

  Get the trade history for the specified symbol on the specified exchange.

  Example: `GET /exchange/kucoin/trade-history/BTC-USDT`

- **GET /exchange/:exchange/cumulative-delta/:symbol**

  Calculate the cumulative delta for the specified symbol on the specified exchange.

  Example: `GET /exchange/kucoin/cumulative-delta/BTC-USDT`

Replace `:exchange` with the name of the exchange (e.g., kucoin) and `:symbol` with the trading pair symbol (e.g., BTC-USDT) in the endpoint URLs.


## Testing & Linting

To run the tests, use the following command:
```bash
npm run test
```

To get the test coverage, use the following command:
```bash
npm run test-coverage
```

To lint, use the following command:
```bash
npm run lint
```

## License
This project is licensed under the ISC License.


# Useful Links

- [Kucoin Official Website](https://kucoin.com) - The exchange used for fetching trade histories and symbol details.
- [Kucoin Documentation](https://sandbox-docs.kucoin.com/#get-trade-histories)
- [Kucoin Sandbox](https://sandbox.kucoin.com)

# Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to me.

- **Email:** [you.benmaamar@gmail.com](mailto:you.benmaamar@gmail.com)
- **GitHub:** [YounesBM](https://github.com/YounesBM)