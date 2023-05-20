import { useState, useEffect } from "react";

const useAudio = (src,handleNext) => {

  const [audio] = useState(new Audio(src))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
      audio.src = src
      playing ? audio.play() : audio.pause()
    },
    [playing,src,audio]
  )

  useEffect(() => {
    audio.addEventListener('ended', ()=>handleNext())
    return () => {
      audio.removeEventListener('ended', ()=>handleNext()(false))
    };
  }, [handleNext,audio])

  return [playing, toggle]
}

export default useAudio 