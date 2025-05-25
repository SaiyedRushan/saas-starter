'use client'
import {SWRConfig} from 'swr'
import {swrConfig} from '@/config/swrConfig'
export const SWRProvider = ({children}: {children: React.ReactNode}) => {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>
}
