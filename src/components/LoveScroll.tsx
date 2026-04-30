import { useEffect, useRef, useState } from "react";
import { Heart, Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const messageLines = [
  "Mouhamadou Mansour Kholle —",
  "my Somitsu, my heart, my home.",
  "",
  "Three years ago, on the first of May,",
  "the world quietly rearranged itself around you,",
  "and I became, forever, your Kinishi.",
  "",
  "You are my softest morning and my safest night,",
  "the small smile I keep when no one is looking,",
  "the reason ordinary days feel like poetry.",
  "",
  "Three years, and still — every time you look at me,",
  "my heart finds itself all over again.",
  "",
  "Happy anniversary, my love.",
  "May 1st, 2026.",
];

const LoveScroll = () => {
  const [opened, setOpened] = useState(false);
  const [revealText, setRevealText] = useState(false);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const ytDiv = useRef<HTMLDivElement>(null);

  // Load YouTube API and create hidden player
  useEffect(() => {
    if (document.getElementById("yt-script")) return;
    const s = document.createElement("script");
    s.id = "yt-script";
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
    window.onYouTubeIframeAPIReady = () => {
      const div = document.createElement("div");
      ytDiv.current?.appendChild(div);
      playerRef.current = new window.YT.Player(div, {
        videoId: "AzaTyxMduH4",
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: "AzaTyxMduH4", start: 9 },
        events: { onReady: (e: any) => e.target.setVolume(35) },
      });
    };
  }, []);

  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => setRevealText(true), 1100);
    return () => clearTimeout(t);
  }, [opened]);

  useEffect(() => {
    if (muted) playerRef.current?.pauseVideo();
    else if (opened) playerRef.current?.playVideo();
  }, [opened, muted]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setMuted(false);
    setTimeout(() => playerRef.current?.playVideo(), 500);
  };

  const toggleMute = () => setMuted((m) => !m);

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16">
      {/* Hidden YouTube player */}
      <div
        ref={ytDiv}
        aria-hidden
        style={{ position: "fixed", top: "-9999px", left: "-9999px", width: "1px", height: "1px" }}
      />

      {/* Music toggle */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Play music" : "Mute music"}
        className="fixed right-5 top-5 z-30 flex items-center gap-2 rounded-full border border-[hsl(var(--parchment-edge)/0.4)] bg-[hsl(var(--parchment-light)/0.7)] px-4 py-2 text-sm text-[hsl(var(--ink))] backdrop-blur-sm transition hover:bg-[hsl(var(--parchment-light))] hover:shadow-md"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="font-body">{muted ? "Music" : "Mute"}</span>
      </button>

      {/* Header */}
      <header
        className={`mb-10 text-center transition-all duration-700 ${
          opened ? "-translate-y-2 opacity-60" : "opacity-100"
        }`}
      >
        <p className="font-body text-sm uppercase tracking-[0.4em] text-[hsl(var(--ink)/0.55)] animate-title">
          For Somitsu — 3 years, May 1st 2026
        </p>
        <h1 className="font-display mt-3 text-5xl text-[hsl(var(--ink))] sm:text-6xl animate-fade-up">
          From your Kinishi&hellip;
        </h1>
      </header>

      {/* Scroll */}
      <div className="relative w-full max-w-[560px]">
        {/* Soft glow halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--glow) / 0.55), transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Top roller */}
        <div className="roller relative mx-auto h-7 w-[105%] -translate-x-[2.5%] rounded-full" />

        {/* Parchment that unrolls */}
        <div
          className="relative mx-auto overflow-hidden glow-soft"
          style={{
            width: "100%",
            maxHeight: opened ? "1400px" : "0px",
            transition: "max-height 2.6s cubic-bezier(0.22, 0.85, 0.25, 1)",
          }}
        >
          <div className="parchment-edge-top" />
          <div className="parchment relative px-8 py-12 sm:px-14 sm:py-16">
            <div
              className={`relative z-10 text-center transition-opacity duration-1000 ${
                revealText ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="font-display text-4xl text-[hsl(var(--ink))] sm:text-5xl">
                My Forever
              </h2>
              <div className="mx-auto mt-4 h-px w-24 bg-[hsl(var(--gold))] opacity-70" />

              <div className="mt-8 space-y-3 font-body text-lg leading-relaxed text-[hsl(var(--ink))] sm:text-xl">
                {messageLines.map((line, i) =>
                  line === "" ? (
                    <div key={i} className="h-2" />
                  ) : (
                    <p
                      key={i}
                      className="ink-text"
                      style={{
                        animation: revealText
                          ? `fade-up 0.9s ease-out ${0.15 + i * 0.18}s both`
                          : "none",
                      }}
                    >
                      {line}
                    </p>
                  ),
                )}
              </div>

              <div
                className="mt-10 flex items-center justify-center gap-2 font-display text-2xl text-[hsl(var(--ink))]"
                style={{
                  animation: revealText
                    ? `fade-up 0.9s ease-out ${0.2 + messageLines.length * 0.18}s both`
                    : "none",
                }}
              >
                <span>Forever yours</span>
                <Heart
                  className="h-6 w-6 animate-heartbeat fill-current text-[hsl(0_60%_45%)]"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>
          <div className="parchment-edge-bottom" />
        </div>

        {/* Bottom roller */}
        <div className="roller relative mx-auto h-7 w-[105%] -translate-x-[2.5%] rounded-full animate-bob" />

        {/* Open button */}
        {!opened && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleOpen}
              className="group relative overflow-hidden rounded-full border border-[hsl(var(--gold)/0.6)] bg-[hsl(var(--parchment-light))] px-8 py-3 font-body text-base tracking-wide text-[hsl(var(--ink))] shadow-[0_8px_24px_hsl(25_40%_20%/0.25)] transition hover:bg-[hsl(var(--parchment))] hover:shadow-[0_10px_30px_hsl(25_40%_20%/0.35)]"
            >
              <span className="relative z-10">Unroll the letter</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[hsl(var(--glow)/0.6)] to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoveScroll;
