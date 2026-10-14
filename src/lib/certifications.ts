export interface CertificationMatch {
  held: string[];
  missing: string[];
  isQualified: boolean;
}

export function getCertificationMatch(required: string[], heldShortNames: string[]): CertificationMatch {
  const heldSet = new Set(heldShortNames.map((name) => name.toLowerCase()));
  const held = required.filter((name) => heldSet.has(name.toLowerCase()));
  const missing = required.filter((name) => !heldSet.has(name.toLowerCase()));
  return { held, missing, isQualified: missing.length === 0 };
}
