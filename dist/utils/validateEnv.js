import { cleanEnv, port, str } from 'envalid';
function validateEnv() {
    cleanEnv(process.env, {
        KUCOIN_API_KEY: str(),
        KUCOIN_SECRET_KEY: str(),
        KUCOIN_PASSPHRASE: str(),
        PORT: port(), // Port number for the server
    });
}
export default validateEnv;
//# sourceMappingURL=validateEnv.js.map