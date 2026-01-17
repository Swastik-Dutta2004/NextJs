import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(
    'phc_Mow0TEx9KIdfN4CzA8KwvnUNLS2Zfq0lNcZ638icCza',
    {
      api_host: 'https://app.posthog.com',
      autocapture: true,   // auto clicks, page views, etc.
    }
  )
}

export default posthog
