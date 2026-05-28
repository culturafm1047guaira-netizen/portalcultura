"use client";

import { useState, useEffect } from "react";
import { getActivePoll, getPollTimeInfo } from "@/lib/enquetes";
import type { Poll } from "@/lib/enquetes";

const COLORS = [
  { from: "#6366f1", to: "#818cf8", bg: "#eef2ff" },
  { from: "#f59e0b", to: "#fbbf24", bg: "#fffbeb" },
  { from: "#10b981", to: "#34d399", bg: "#ecfdf5" },
  { from: "#f43f5e", to: "#fb7185", bg: "#fff1f2" },
  { from: "#8b5cf6", to: "#a78bfa", bg: "#f5f3ff" },
];

function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  let state = Math.abs(hash);
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

function generateResults(poll: Poll, _votedIdx: number | null): number[] {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const baseSeed = `${dateStr}-${poll.question.slice(0, 10)}`;

  const rand = seededRandom(baseSeed);
  const raw = poll.options.map(() => rand());
  const sum = raw.reduce((a, b) => a + b, 0);
  const baseTotal = 120 + Math.floor(rand() * 80);

  return raw.map((v) => Math.round((v / sum) * baseTotal));
}

function getWeekKey(): string {
  const d = new Date();
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const diff = d.getTime() - yearStart.getTime();
  const week = Math.ceil((diff / 86400000 + yearStart.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

export default function EnqueteSection() {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [votedIndex, setVotedIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const activePoll = getActivePoll();
    if (!activePoll) return;
    setPoll(activePoll);
    setTimeLeft(getPollTimeInfo());

    const weekKey = getWeekKey();
    const saved = localStorage.getItem(`enquete_${weekKey}`);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      if (!isNaN(idx) && idx >= 0 && idx < activePoll.options.length) {
        setVotedIndex(idx);
        setShowResults(true);
        setResults(generateResults(activePoll, idx));
      }
    }

    const timer = setInterval(() => {
      const remaining = getPollTimeInfo();
      setTimeLeft(remaining);
      if (remaining === null) {
        setPoll(null);
        clearInterval(timer);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleVote = (idx: number) => {
    if (!poll || votedIndex !== null) return;
    setVotedIndex(idx);
    setShowResults(true);
    setResults(generateResults(poll, idx));
    const weekKey = getWeekKey();
    try { localStorage.setItem(`enquete_${weekKey}`, String(idx)); } catch { /* storage full */ }

    // Animate bars in sequence
    setTimeout(() => {
      const bars = document.querySelectorAll(".enquete-bar");
      bars.forEach((bar, i) => {
        setTimeout(() => {
          (bar as HTMLElement).style.maxHeight = "100px";
        }, i * 100);
      });
    }, 200);
  };

  if (!poll || !timeLeft) return null;

  const totalVotes = results.length > 0 ? results.reduce((a, b) => a + b, 0) : 0;
  const maxResult = results.length > 0 ? Math.max(...results, 1) : 1;

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs shadow-sm">
            📊
          </span>
          <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Enquete
          </h2>
        </div>
        <div className="flex-1 border-b border-border" />
        {timeLeft && (
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {timeLeft}
          </span>
        )}
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-500 group">
        {/* Decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-[0.04] dark:opacity-[0.06] pointer-events-none transition-transform duration-700 group-hover:scale-150"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />

        <div className="relative px-6 py-6 md:px-8 md:py-7">
          {/* Question */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg shadow-md shrink-0 mt-0.5">
              💬
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-1 block">
                Pergunta da Semana
              </span>
              <h3 className="font-montserrat text-[17px] md:text-lg font-bold leading-snug text-text">
                {poll.question}
              </h3>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {poll.options.map((option, i) => {
              const color = COLORS[i % COLORS.length];
              const isVoted = votedIndex === i;
              const voteCount = results[i] ?? 0;
              const percent = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
              const barWidth = showResults ? (results[i] ?? 0) / maxResult : 0;

              return (
                <button
                  key={option.label}
                  onClick={() => handleVote(i)}
                  disabled={votedIndex !== null}
                  className={`relative w-full text-left overflow-hidden rounded-xl border transition-all duration-500 ${
                    votedIndex !== null
                      ? "cursor-default"
                      : "cursor-pointer hover:scale-[1.01] hover:shadow-md active:scale-[0.99]"
                  } ${
                    isVoted
                      ? "border-violet-300 dark:border-violet-600 shadow-md"
                      : "border-border hover:border-violet-200 dark:hover:border-violet-800"
                  }`}
                  style={{
                    background: isVoted
                      ? `linear-gradient(135deg, ${color.bg}, transparent)`
                      : "",
                  }}
                >
                  {/* Progress bar background */}
                  <div
                    className="absolute inset-0 transition-all duration-1000 ease-out rounded-xl"
                    style={{
                      background: showResults
                        ? `linear-gradient(90deg, ${color.from}12, transparent)`
                        : "transparent",
                    }}
                  />

                  {/* Animated fill bar */}
                  {showResults && (
                    <div
                      className="absolute left-0 top-0 bottom-0 rounded-xl transition-all duration-[1200ms] ease-out opacity-20"
                      style={{
                        width: `${barWidth * 100}%`,
                        background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
                      }}
                    />
                  )}

                  <div className="relative flex items-center gap-3 px-4 py-3.5">
                    <span className="text-lg shrink-0">{option.emoji}</span>
                    <span className={`flex-1 text-sm font-semibold transition-colors ${
                      isVoted
                        ? "text-violet-700 dark:text-violet-300"
                        : "text-text hover:text-violet-600 dark:hover:text-violet-400"
                    }`}>
                      {option.label}
                    </span>

                    {showResults && (
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-extrabold tabular-nums" style={{ color: color.from }}>
                          {voteCount}
                        </span>
                        <div className="w-10 h-1.5 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${percent}%`,
                              background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-text-muted w-10 text-right tabular-nums">
                          {percent.toFixed(0)}%
                        </span>
                      </div>
                    )}

                    {!showResults && (
                      <span
                        className="w-5 h-5 rounded-full border-2 transition-all duration-300 shrink-0 flex items-center justify-center"
                        style={{ borderColor: color.from }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full scale-0 transition-transform duration-300"
                          style={{ background: color.from }}
                        />
                      </span>
                    )}

                    {isVoted && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-500 dark:text-violet-400 shrink-0 bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 rounded-full">
                        Seu voto
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
            <span className="text-[11px] text-text-muted flex items-center gap-1.5">
              <span className="text-base">🗳️</span>
              {totalVotes > 0
                ? `${totalVotes} votos recebidos`
                : "Vote e veja o resultado em tempo real!"}
            </span>
            {showResults && (
              <button
                onClick={() => {
                  const weekKey = getWeekKey();
                  try { localStorage.removeItem(`enquete_${weekKey}`); } catch { /* */ }
                  setVotedIndex(null);
                  setShowResults(false);
                  setResults([]);
                }}
                className="text-[11px] font-bold text-violet-500 hover:text-violet-700 transition-colors flex items-center gap-1"
              >
                Votar novamente
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
