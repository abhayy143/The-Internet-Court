import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Client-side Viral Image Generator (Zero Cost)
export const generateShareCard = (caseTitle: string, verdict: any) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, 1080, 1080);

  // Border / Styling
  ctx.strokeStyle = "#e2b714"; // Gavel Gold
  ctx.lineWidth = 15;
  ctx.strokeRect(40, 40, 1000, 1000);

  // Logo / Header
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px Inter";
  ctx.textAlign = "center";
  ctx.fillText("🏛️ THE INTERNET COURT", 540, 150);

  // Case Title
  ctx.fillStyle = "#a3a3a3";
  ctx.font = "40px Inter";
  ctx.fillText(caseTitle.substring(0, 40) + "...", 540, 250);

  // Verdict Badge
  ctx.fillStyle = "#ff4b2b";
  ctx.fillRect(240, 350, 600, 120);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 70px Inter";
  ctx.fillText(`VERDICT: ${verdict.guilty_party.toUpperCase()}`, 540, 435);

  // Stats
  ctx.fillStyle = "#ffffff";
  ctx.font = "40px Inter";
  ctx.textAlign = "left";
  ctx.fillText(`📊 Blame Split: ${verdict.blame_split}`, 150, 600);
  ctx.fillText(`☠️ Toxicity Score: ${verdict.toxicity_score}/100`, 150, 700);
  ctx.fillText(`🚩 Red Flags: ${verdict.red_flag_count}`, 150, 800);

  // Sentence
  ctx.fillStyle = "#e2b714";
  ctx.font = "italic 40px Inter";
  ctx.textAlign = "center";
  ctx.fillText(`" ${verdict.sentence} "`, 540, 950);

  // Watermark
  ctx.fillStyle = "#555555";
  ctx.font = "25px Inter";
  ctx.fillText("internetcourt.app", 540, 1020);

  // Trigger Download
  const link = document.createElement("a");
  link.download = `verdict-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};