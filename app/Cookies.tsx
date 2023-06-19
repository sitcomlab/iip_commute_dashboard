'use client'

import CookieConsent from 'react-cookie-consent'

export default function Cookies() {
  return (
    <CookieConsent
      buttonText="Akzeptieren"
      declineButtonText="Ablehnen"
      enableDeclineButton
    >
      Einwilligung zu Cookies (Analytics, Tracking)
    </CookieConsent>
  )
}
