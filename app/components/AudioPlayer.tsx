"use client";
import { useEffect } from "react";

export default function AudioPlayer() {
  useEffect(() => {
    const audio = document.getElementById(
      "bg-audio"
    ) as HTMLAudioElement | null;
    if (!audio) return;

    const tryPlay = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", tryPlay);
    };

    // tenta autoplay silencioso
    audio.play().catch(() => {
      // se falhar, aguarda primeira interação
      window.addEventListener("click", tryPlay);
    });
  }, []);

  return (
    <audio id="bg-audio" src="/audio/rickyjazz.mp3" autoPlay playsInline />
  );
}
