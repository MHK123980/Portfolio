import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'admin';
}

export class AuthService {
  /**
   * Hashes a plaintext password using PBKDF2 with SHA-512 and random salt.
   */
  public static hashPassword(password: string): { hash: string; salt: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { hash, salt };
  }

  /**
   * Verifies a password against the stored salt and hash.
   */
  public static verifyPassword(password: string, hash: string, salt: string): boolean {
    const derivedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedHash, 'hex'));
  }

  /**
   * Generates a signed JWT token for the admin.
   */
  public static generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: '7d',
    });
  }

  /**
   * Verifies and decodes a JWT token.
   */
  public static verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as TokenPayload;
      return decoded;
    } catch {
      return null;
    }
  }
}
