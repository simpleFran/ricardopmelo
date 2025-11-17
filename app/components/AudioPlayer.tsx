"use client";

import { useEffect, useRef } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startAudio = () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = 0;

      // começa a tocar
      audio.play().catch(() => {});

      // fade-in suave
      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        if (audio) audio.volume = Math.min(vol, 1);
        if (vol >= 1) clearInterval(fade);
      }, 200); // velocidade do fade

      // remove o listener (toca só 1x por reload)
      window.removeEventListener("click", startAudio);
    };

    // primeiro clique do usuário libera áudio
    window.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/rickyjazz.mp3"
      preload="auto"
      autoPlay={false}
      loop={false}
    />
  );
}
