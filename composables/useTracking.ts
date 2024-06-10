import { track } from '@vercel/analytics'

export default function useTracking(componentName: string): {
  track: (trackingName: string) => void
  trackAndNavigate: (trackingName: string, href: string) => void
} {
  const trackingCookie = useCookie('nt')
  const trackingEnabled = trackingCookie.value === 'true'

  return {
    track: (trackingName: string) => {
      if (trackingEnabled) {
        track(componentName + ' - ' + trackingName)
      }
    },

    trackAndNavigate: (trackingName: string, href: string) => {
      if (trackingEnabled) {
        track(componentName + ' - ' + trackingName)
      }

      navigateTo(href)
    },
  }
}
