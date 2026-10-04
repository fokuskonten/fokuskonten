'use client'

import { useState } from 'react'

function extractYouTubeId(url) {
  if (!url) return null
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/)|youtube-nocookie\.com\/(?:embed\/))([a-zA-Z0-9_-]{11})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

export default function AppVideoWalkthrough({
  video,
  name,
  isDesktop = false,
  videoFrame = null
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [imgError, setImgError] = useState(false)

  if (!video) return null

  const isYouTube = video.includes('youtube') || video.includes('youtu.be')
  const videoId = isYouTube ? extractYouTubeId(video) : null

  // Fallback direct URL ke YouTube
  const youtubeWatchUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : video

  // Thumbnail URL resmi resolusi tinggi dengan fallback
  const posterUrl = videoId
    ? imgError
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : null

  // Embed URL yang aman dan teruji
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : video

  if (isYouTube) {
    if (isDesktop) {
      /* ── YOUTUBE DESKTOP: 16:9 Widescreen ── */
      return (
        <div className="w-full">
          <div className="w-full rounded-3xl overflow-hidden border border-neutral-200/90 shadow-card bg-neutral-950 aspect-video relative group">
            {isPlaying ? (
              <iframe
                src={embedUrl}
                title={`${name} Video Demo`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="w-full h-full relative block text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 rounded-3xl overflow-hidden"
                aria-label={`Putar Video Demo ${name}`}
              >
                {posterUrl && (
                  <img
                    src={posterUrl}
                    alt={`${name} Video Walkthrough`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-neutral-950/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-neutral-950 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/60 text-xs font-medium text-white shadow-md">
                    Putar Video Walkthrough &amp; Demo
                  </span>
                </div>
              </button>
            )}
          </div>

          <div className="mt-3 flex justify-center">
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              <span>Tonton langsung di YouTube</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      )
    }

    /* ── YOUTUBE MOBILE SHORTS: 9:16 Vertical Phone Frame ── */
    return (
      <div className="w-full">
        <div className="flex justify-center py-2 sm:py-4">
          <div className="w-full max-w-[310px] sm:max-w-[330px] aspect-[9/16] rounded-[36px] overflow-hidden border border-neutral-200/90 shadow-2xl shadow-neutral-950/20 bg-neutral-950 relative group">
            {isPlaying ? (
              <iframe
                src={embedUrl}
                title={`${name} Video Demo`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="w-full h-full relative block text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 rounded-[36px] overflow-hidden"
                aria-label={`Putar Video Demo ${name}`}
              >
                {posterUrl && (
                  <img
                    src={posterUrl}
                    alt={`${name} Video Walkthrough`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-neutral-950/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/95 text-neutral-950 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <svg className="w-7 h-7 ml-1 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/60 text-xs font-medium text-white shadow-md">
                    Putar Video Demo
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <span>Tonton langsung di YouTube</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  /* ── NON-YOUTUBE / DIRECT VIDEO FILES (.MP4 / .WEBM) ── */
  if (isDesktop) {
    return (
      <div className="w-full rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card bg-neutral-950 p-2 sm:p-3">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-800 mb-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          <span className="text-[11px] text-neutral-400 font-mono ml-2 truncate">
            {name} — Windows Desktop
          </span>
        </div>
        <video
          src={video}
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    )
  }

  if (videoFrame === 'phone') {
    return (
      <div className="flex justify-center py-4">
        <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-[44px] p-3 bg-neutral-950 border-[5px] border-neutral-800 shadow-2xl shadow-black/30">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-neutral-900 rounded-full z-10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neutral-800" />
          </div>
          <div className="overflow-hidden rounded-[34px] bg-black aspect-[9/19.5] flex items-center justify-center">
            <video
              src={video}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center py-4">
      <video
        src={video}
        controls
        playsInline
        preload="metadata"
        className="max-h-[580px] w-auto max-w-full rounded-[36px] shadow-2xl shadow-neutral-950/20"
      />
    </div>
  )
}
