export function calculateOfferExpiry(firstSeenAt: Date): Date {
  const expiry = new Date(firstSeenAt);
  expiry.setHours(expiry.getHours() + 72);
  return expiry;
}

export function isOfferValid(expiryAt: Date): boolean {
  return new Date() < expiryAt;
}

export function getTimeRemaining(expiryAt: Date): {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} {
  const now = new Date();
  const diff = expiryAt.getTime() - now.getTime();

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: false };
}