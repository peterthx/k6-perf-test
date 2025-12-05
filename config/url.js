import CryptoJS from 'crypto-js';

// The same secret key used for decryption.
const secretKey = 'your-default-secret-key';

// Function to encrypt data
function encrypt(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export const BASE_URL = {
  ENDPOINT: encrypt("http://srv946485.hstgr.cloud:3000"),
};

export const SERVICE = {
  GET_ALL_PRODUCTS: encrypt("/api/products"),
  POST_NEW_SUPPLIER: encrypt("/api/suppliers"),
  DEL_SUPPLIER: encrypt("/api/suppliers"),
  GET_ALL_SUPPLIERS: encrypt("/api/suppliers"),
};