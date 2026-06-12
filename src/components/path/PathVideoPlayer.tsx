"use client";

import { useEffect, useId, useRef } from "react";

type YTPlayer = {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, number | string>;
      events?: { onStateChange?: (e: { data: number }) => void };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoading: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoading) return apiLoading;

  apiLoading = new Promise((resolve) => {
    const finish = () => resolve();
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      finish();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    } else if (window.YT?.Player) {
      finish();
    }
  });

  return apiLoading;
}

interface PathVideoPlayerProps {
  videoId: string;
  title: string;
  onWatchProgress?: (ratio: number) => void;
}

export function PathVideoPlayer({ videoId, title, onWatchProgress }: PathVideoPlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const maxRatioRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onProgressRef = useRef(onWatchProgress);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    onProgressRef.current = onWatchProgress;
  }, [onWatchProgress]);

  useEffect(() => {
    maxRatioRef.current = 0;
    onProgressRef.current?.(0);

    let cancelled = false;

    const stopTracking = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startTracking = () => {
      stopTracking();
      intervalRef.current = setInterval(() => {
        const player = playerRef.current;
        if (!player) return;
        const duration = player.getDuration();
        const current = player.getCurrentTime();
        if (!duration || duration <= 0) return;
        const ratio = Math.min(1, current / duration);
        if (ratio > maxRatioRef.current) {
          maxRatioRef.current = ratio;
          onProgressRef.current?.(ratio);
        }
      }, 400);
    };

    const init = async () => {
      await loadYouTubeApi();
      if (cancelled || !hostRef.current || !window.YT?.Player) return;

      playerRef.current?.destroy();
      hostRef.current.innerHTML = "";

      const mount = document.createElement("div");
      mount.className = "absolute inset-0 w-full h-full";
      hostRef.current.appendChild(mount);

      playerRef.current = new window.YT.Player(mount, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: { rel: 0, modestbranding: 1, autoplay: 0, enablejsapi: 1 },
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT?.PlayerState.PLAYING) startTracking();
            else stopTracking();
          },
        },
      });
    };

    init();

    return () => {
      cancelled = true;
      stopTracking();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl aspect-video"
      aria-label={title}
    >
      <div ref={hostRef} id={`path-yt-${uid}`} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
