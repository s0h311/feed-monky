import { track } from '@vercel/analytics'

export default function useTracking(componentName: string): {
  track: (trackingName: string) => void
  trackAndNavigate: (trackingName: string, href: string) => void
} {
  return {
    track: (trackingName: string) => {
      track(componentName + ' - ' + trackingName)
    },
    trackAndNavigate: (trackingName: string, href: string) => {
      track(componentName + ' - ' + trackingName)
      navigateTo(href)
    },
  }
}
