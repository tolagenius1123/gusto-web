export interface Certification {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string | null;
  credentialId: string | null;
  isVerified: boolean;
}
