import React, { useRef, useEffect } from 'react'

const BackgroundAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const playAudio = async () => {
      try {
        audio.volume = 0.1 // Very quiet background music
        await audio.play()
      } catch (error) {
        // Autoplay failed, which is normal for many browsers
        console.log('Background audio autoplay prevented')
      }
    }

    // Try to play after a short delay
    const timer = setTimeout(playAudio, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      className="hidden"
    >
      <source src="/audio/ambient_theme.mp3" type="audio/mpeg" />
    </audio>
  )
}

export default BackgroundAudio