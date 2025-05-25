// src/config/swrConfig.ts
import {SWRConfiguration} from 'swr'
import {fetcher} from '@/lib/fetcher'

// Global SWR configuration
export const swrConfig: SWRConfiguration = {
  fetcher, // Use the fetcher function globally
  revalidateOnFocus: false, // Disable revalidation when the window is refocused
  revalidateOnReconnect: true, // Revalidate when the network reconnects
  dedupingInterval: 2000, // Deduplicate requests that are made within 2 seconds
  errorRetryCount: 3, // Retry failed requests up to 3 times
  errorRetryInterval: 5000, // Retry failed requests every 5 seconds
  onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
    if (retryCount >= 3) return // Stop retrying after 3 attempts
    // Custom logic for retries
    revalidate({retryCount})
  },
}
