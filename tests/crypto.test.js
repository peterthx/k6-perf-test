
const { decrypt } = require('../utils/crypto');

describe('Encryption/Decryption', () => {
  it('should encrypt and decrypt a secret correctly', () => {
    const secret = 'my-secret-text';
    const encrypted = encrypt(secret);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(secret);
  });
});
