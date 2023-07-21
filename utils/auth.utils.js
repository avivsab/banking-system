import crypto from 'crypto';

export const generateKey = () => {
  const length = 64;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.randomBytes(length);
  
  let secretKey = '';
  for (let i = 0; i < randomBytes.length; i++) {
    const randomIndex = randomBytes[i] % chars.length;
    secretKey += chars[randomIndex];
  }

  return secretKey;
};

export { generateKey };
