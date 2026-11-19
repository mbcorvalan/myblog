"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

export interface Track {
  title: string;
  artist: string;
  audioSrc: string;
  cover: string | null;
}

interface Props {
  label: string;
  track: Track;
}

const SKIP_SECONDS = 10;

export function MusicPlayer({ label, track }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setError(true);
      setPlaying(false);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setError(true));
    else audio.pause();
  };

  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), audio.duration);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <section className={`container ${styles.section}`} aria-labelledby="player-heading">
      <h2 id="player-heading" className={styles.label}>{label}</h2>

      <div className={styles.player}>
        <div className={`${styles.disc} ${playing ? styles.spinning : ""}`}>
          {track.cover ? (
            <Image src={track.cover} alt="" fill sizes="160px" className={styles.cover} />
          ) : (
            <div className={styles.coverFallback} />
          )}
          <span className={styles.hole} />
        </div>

        <div className={styles.card}>
          <div className={styles.info}>
            <div>
              <p className={styles.title}>{track.title}</p>
              <p className={styles.artist}>{track.artist}</p>
            </div>
            <button type="button" className={styles.iconBtn} onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                {muted ? (
                  <path d="m16 9 5 5m0-5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M16 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>

          <div
            className={styles.bar}
            onClick={seek}
            role="progressbar"
            aria-label="Progreso"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div className={styles.fill} style={{ width: `${progress * 100}%` }} />
          </div>

          <div className={styles.controls}>
            <button type="button" className={`${styles.ctrl} ${styles.ringed}`} onClick={() => skip(-SKIP_SECONDS)} aria-label="Retroceder 10 segundos">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M11 6v12L2.5 12 11 6zm10 0v12l-8.5-6L21 6z" />
              </svg>
            </button>
            <button type="button" className={styles.ctrl} onClick={toggle} aria-label={playing ? "Pausar" : "Reproducir"} disabled={error}>
              {playing ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 4v16l13-8z" />
                </svg>
              )}
            </button>
            <button type="button" className={styles.ctrl} onClick={() => skip(SKIP_SECONDS)} aria-label="Adelantar 10 segundos">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 6v12l8.5-6L13 6zM3 6v12l8.5-6L3 6z" />
              </svg>
            </button>
          </div>
          {error && (
            <p className={styles.error}>
              No se pudo cargar el audio.
            </p>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={track.audioSrc} loop preload="metadata" />
    </section>
  );
}
