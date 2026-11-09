import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export function normalizeStudentLoginCode(loginCode: string): string {
  return loginCode.trim().toUpperCase();
}

export function studentCredentialId(loginCode: string): string {
  return createHash('sha256').update(normalizeStudentLoginCode(loginCode)).digest('hex');
}

export async function hashStudentPin(pin: string): Promise<{ pinSalt: string; pinHash: string }> {
  if (!/^\d{6,12}$/.test(pin)) throw new Error('PIN deve conter entre 6 e 12 dígitos.');
  const pinSalt = randomBytes(16).toString('hex');
  const derived = await scrypt(pin, pinSalt, KEY_LENGTH) as Buffer;
  return { pinSalt, pinHash: derived.toString('hex') };
}

export async function verifyStudentPin(pin: string, pinSalt: string, pinHash: string): Promise<boolean> {
  if (!/^\d{6,12}$/.test(pin) || !/^[a-f0-9]{32}$/.test(pinSalt) || !/^[a-f0-9]{128}$/.test(pinHash)) {
    // Retain comparable work for malformed stored credentials to reduce timing differences.
    await scrypt(pin, 'invalid-student-pin-salt', KEY_LENGTH);
    return false;
  }
  const actual = await scrypt(pin, pinSalt, KEY_LENGTH) as Buffer;
  const expected = Buffer.from(pinHash, 'hex');
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}
