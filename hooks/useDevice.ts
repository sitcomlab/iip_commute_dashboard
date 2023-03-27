import { useWindowSize } from 'react-use'

export default function useDevice() {
  const { width } = useWindowSize()

  if (width > 768) {
    return 'desktop'
  }
  if (width > 576) {
    return 'tablet'
  }
  return 'mobile'
}
