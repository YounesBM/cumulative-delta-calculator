import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    KUCOIN_API_KEY: str(), // API key for Kucoin
    KUCOIN_SECRET_KEY: str(), // Secret key for Kucoin
    KUCOIN_PASSPHRASE: str(), // Passphrase for Kucoin
    PORT: port(), // Port number for the server
  });
}

export default validateEnv;
