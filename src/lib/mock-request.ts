const MOCK_LATENCY_MS = 700;

export function simulateRequest(latencyMs = MOCK_LATENCY_MS) {
  return new Promise<void>((resolve) => setTimeout(resolve, latencyMs));
}
