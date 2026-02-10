import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Subscription Helper Utilities
 * Tier hierarchy: creator > pro > free
 * - 'creator' plan includes all 'pro' features
 * - 'pro' plan includes all 'free' features
 */

/**
 * Check if a subscription has PRO-level access
 * This includes 'pro', 'creator', and legacy 'premium' tiers
 */
export function hasProAccess(subscription: string | undefined | null): boolean {
  const tier = (subscription || 'free').toLowerCase();
  return tier === 'pro' || tier === 'creator' || tier === 'premium';
}

/**
 * Check if subscription is the Creator tier
 */
export function isCreatorTier(subscription: string | undefined | null): boolean {
  const tier = (subscription || 'free').toLowerCase();
  return tier === 'creator';
}

/**
 * Get display name for subscription tier
 */
export function getTierDisplayName(subscription: string | undefined | null): string {
  const tier = (subscription || 'free').toLowerCase();
  
  switch (tier) {
    case 'creator':
      return 'Creator';
    case 'pro':
    case 'premium':
      return 'Pro';
    default:
      return 'Free';
  }
}

/**
 * Get badge text for subscription tier (for UI badges)
 */
export function getTierBadgeText(subscription: string | undefined | null): string {
  const tier = (subscription || 'free').toLowerCase();
  
  switch (tier) {
    case 'creator':
      return 'Creator Plan';
    case 'pro':
    case 'premium':
      return 'Pro Plan';
    default:
      return 'Free Plan';
  }
}
