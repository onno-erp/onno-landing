import type { SVGProps } from 'react'

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 103 103" fill="none" aria-hidden="true" {...props}>
      <path
        d="M47.049 0.150391C66.0112 -1.31238 85.0313 7.93772 95.1754 25.5079C105.319 43.0779 103.82 64.1741 93.0719 79.8645L47.049 0.150391ZM53.8547 101.938C35.2644 102.962 16.7865 93.7344 6.84082 76.5079C-3.10498 59.2812 -1.85842 38.6642 8.32391 23.0766L53.8547 101.938Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function OnnoWordmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 438 131" fill="none" aria-hidden="true" {...props}>
      <circle cx="51" cy="65.3574" r="51" fill="currentColor" />
      <circle cx="387" cy="65.3574" r="51" fill="currentColor" />
      <path
        d="M159.041 14.5C178.003 13.0372 197.023 22.2873 207.168 39.8575C217.312 57.4275 215.812 78.5237 205.064 94.2141L159.041 14.5ZM165.847 116.288C147.257 117.312 128.779 108.084 118.833 90.8575C108.887 73.6308 110.134 53.0138 120.316 37.4262L165.847 116.288Z"
        fill="currentColor"
      />
      <path
        d="M271.041 14.5C290.003 13.0372 309.023 22.2873 319.168 39.8575C329.312 57.4275 327.812 78.5237 317.064 94.2141L271.041 14.5ZM277.847 116.288C259.257 117.312 240.779 108.084 230.833 90.8575C220.887 73.6308 222.134 53.0138 232.316 37.4262L277.847 116.288Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function AnimatedOnnoLogo() {
  return (
    <span className="onno-logo-shell relative block h-6 w-6 overflow-visible">
      <OnnoWordmark className="onno-logo-wordmark onno-logo-prefix absolute left-0 top-1/2" />
      <span className="onno-logo-roller absolute left-0 top-0 z-10 block h-6 w-6">
        <Logo className="onno-logo-roller-slash absolute inset-0 h-6 w-6" />
        <span className="onno-logo-roller-solid absolute left-1/2 top-1/2 rounded-full bg-current" />
      </span>
    </span>
  )
}
