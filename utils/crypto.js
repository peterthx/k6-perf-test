import CryptoJS from 'crypto-js';

// Function to decrypt data
export function decrypt(encryptedText) {
  // In a real k6 environment, the secret key should be passed as an environment variable
  // For example: k6 run -e SECRET_KEY='your-secret-key' your-script.js
  const secretKey = __ENV.SECRET_KEY || 'your-default-secret-key';
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
