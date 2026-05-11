import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 🛠️ CANVAS UTILITY: Multi-line wrapping
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
}

// 🛠️ CANVAS UTILITY: Text truncation
function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
}

/**
 * 📸 VIRAL IMAGE GENERATOR (Zero Cost, Optimized & Bulletproof)
 */
export const generateShareCard = (caseTitle: string, verdict: any) => {
  const canvas = document.createElement("canvas");
  const size = 1080; 
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const FONT_FAMILY = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // 1. BACKGROUND
  ctx.fillStyle = "#09090b"; 
  ctx.fillRect(0, 0, size, size);

  // 2. OUTER GOLDEN BORDER
  ctx.strokeStyle = "#e2b714"; 
  ctx.lineWidth = 14;
  ctx.strokeRect(40, 40, size - 80, size - 80);

  // 3. HEADER
  ctx.fillStyle = "#ffffff";
  ctx.font = `900 55px ${FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.fillText("🏛️ THE INTERNET COURT", size / 2, 160);

  // 4. SUBHEADER (Case Title)
  ctx.fillStyle = "#a1a1aa"; 
  ctx.font = `italic 36px ${FONT_FAMILY}`;
  const truncatedTitle = truncateText(caseTitle, 45); 
  ctx.fillText(`“${truncatedTitle}”`, size / 2, 230);

  // 5. THE VERDICT BADGE (Auto-Scaling Fix!)
  const guiltyParty = verdict.guilty_party.toUpperCase();
  const verdictText = `VERDICT: ${guiltyParty}`;
  
  // Set absolute maximum width for the badge (leaving a safe 60px margin on each side)
  const MAX_BADGE_WIDTH = size - 120; 
  
  // Start at 50px font, and shrink it until it fits safely inside the MAX width
  let verdictFontSize = 50;
  ctx.font = `900 ${verdictFontSize}px ${FONT_FAMILY}`;
  let textMetrics = ctx.measureText(verdictText);
  
  while (textMetrics.width > MAX_BADGE_WIDTH - 80 && verdictFontSize > 20) {
    verdictFontSize -= 2;
    ctx.font = `900 ${verdictFontSize}px ${FONT_FAMILY}`;
    textMetrics = ctx.measureText(verdictText);
  }

  // Calculate final dimensions
  const badgeWidth = Math.max(size - 300, textMetrics.width + 80); 
  const badgeHeight = 110;
  const badgeX = (size - badgeWidth) / 2;
  const badgeY = 320;

  // Draw Glow & Badge
  ctx.shadowColor = "#ef444450"; 
  ctx.shadowBlur = 40;
  ctx.fillStyle = "#ef4444"; 
  
  const r = 20; 
  ctx.beginPath();
  ctx.moveTo(badgeX + r, badgeY);
  ctx.lineTo(badgeX + badgeWidth - r, badgeY);
  ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY, badgeX + badgeWidth, badgeY + r);
  ctx.lineTo(badgeX + badgeWidth, badgeY + badgeHeight - r);
  ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY + badgeHeight, badgeX + badgeWidth - r, badgeY + badgeHeight);
  ctx.lineTo(badgeX + r, badgeY + badgeHeight);
  ctx.quadraticCurveTo(badgeX, badgeY + badgeHeight, badgeX, badgeY + badgeHeight - r);
  ctx.lineTo(badgeX, badgeY + r);
  ctx.quadraticCurveTo(badgeX, badgeY, badgeX + r, badgeY);
  ctx.closePath();
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // Verdict Text (Centered dynamically based on the calculated font size)
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(verdictText, size / 2, badgeY + (badgeHeight / 2) + (verdictFontSize * 0.35));

  // 6. THE STATS SECTION
  const statsY = badgeY + badgeHeight + 100;
  const statsWidth = size - 300;
  const statsX = (size - statsWidth) / 2;

  ctx.textAlign = "left";
  ctx.fillStyle = "#d4d4d8"; 
  ctx.font = `bold 42px ${FONT_FAMILY}`;
  ctx.fillText(`📊 BLAME SPLIT:`, statsX, statsY);
  ctx.fillText(`☠️ TOXICITY:`, statsX, statsY + 75);
  ctx.fillText(`🚩 RED FLAGS:`, statsX, statsY + 150);

  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.font = `900 42px ${FONT_FAMILY}`;
  const statsRightX = statsX + statsWidth;
  ctx.fillText(verdict.blame_split, statsRightX, statsY);
  ctx.fillText(`${verdict.toxicity_score}/100`, statsRightX, statsY + 75);
  ctx.fillText(`${verdict.red_flag_count}`, statsRightX, statsY + 150);

  // 7. THE SENTENCE (Multi-Line Wrapping)
  const sentenceY = statsY + 250;
  const sentenceWidth = size - 200;
  const sentenceX = size / 2; 
  const sentenceLineHeight = 55;

  ctx.textAlign = "center";
  ctx.fillStyle = "#e2b714"; 
  ctx.font = `900 42px ${FONT_FAMILY}`;
  ctx.fillText("THE SENTENCE:", sentenceX, sentenceY);

  ctx.fillStyle = "#ffffff";
  ctx.font = `italic 38px ${FONT_FAMILY}`;
  
  wrapText(ctx, verdict.sentence, sentenceX, sentenceY + 70, sentenceWidth, sentenceLineHeight);

  // 8. THE WATERMARK
  ctx.textAlign = "center";
  ctx.fillStyle = "#52525b"; 
  ctx.font = `bold 28px ${FONT_FAMILY}`;
  ctx.fillText("internetcourt.app", size / 2, size - 50);

  // 9. TRIGGER THE DOWNLOAD
  const link = document.createElement("a");
  link.download = `verdict-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};