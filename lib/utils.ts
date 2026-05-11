import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 🛠️ CANVAS UTILITY FUNCTION: wrapText
 * This function calculates where to draw lines of text so they wrap properly within a width.
 */
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
  let testLine = "";
  let metrics;
  let testWidth;
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + " ";
    metrics = ctx.measureText(testLine);
    testWidth = metrics.width;
    
    // If this test line is too wide and not the first word, draw the current line and start a new one.
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  
  // Draw the final line.
  ctx.fillText(line, x, currentY);
  
  // Return the final y position so we know where to start the next element.
  return currentY;
}

/**
 * 🛠️ CANVAS UTILITY FUNCTION: truncateText
 * This function shortens a long string with an ellipsis (e.g., "Very long text..." -> "Very...")
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
}

/**
 * 📸 VIRAL IMAGE GENERATOR (Zero Cost, Optimized)
 * Generates a perfectly optimized 1080x1080 square verdict card.
 */
export const generateShareCard = (caseTitle: string, verdict: any) => {
  const canvas = document.createElement("canvas");
  const size = 1080; // Optimized square for IG Stories/Twitter
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // The visual styles on canvas render a bit differently than CSS, 
  // so we have to manually set them for a premium look.

  // 1. BACKGROUND (Pure Black for contrast)
  ctx.fillStyle = "#09090b"; // match our background-color
  ctx.fillRect(0, 0, size, size);

  // 2. OUTER GOLDEN BORDER
  ctx.strokeStyle = "#e2b714"; // Gavel Gold
  ctx.lineWidth = 14;
  ctx.strokeRect(40, 40, size - 80, size - 80);

  // 3. HEADER (THE INTERNET COURT)
  ctx.fillStyle = "#ffffff";
  ctx.font = "black 60px Geist"; // Using Geist for that modern feel
  ctx.textAlign = "center";
  ctx.fillText("🏛️ THE INTERNET COURT", size / 2, 160);

  // 4. SUBHEADER (Case Title)
  ctx.fillStyle = "#a1a1aa"; // text-zinc-400
  ctx.font = "italic 36px Geist";
  const truncatedTitle = truncateText(caseTitle, 50); // Truncate to prevent bleeding
  ctx.fillText(`“${truncatedTitle}”`, size / 2, 230);

  // 5. THE VERDICT BADGE (The most important part)
  const guiltyParty = verdict.guilty_party.toUpperCase();
  const badgeWidth = size - 300;
  const badgeHeight = 110;
  const badgeX = (size - badgeWidth) / 2;
  const badgeY = 320;

  // Render a glow behind the badge
  ctx.shadowColor = "#ef444450"; // red-500 with 50% opacity
  ctx.shadowBlur = 40;
  ctx.fillStyle = "#ef4444"; // red-500
  
  // Custom rounded rectangle for the badge
  const r = 20; // border-radius
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

  // Reset shadow for subsequent elements
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // Verdict Text
  ctx.fillStyle = "#ffffff";
  ctx.font = "black 65px Geist";
  ctx.textAlign = "center";
  ctx.fillText(`VERDICT: ${guiltyParty}`, size / 2, badgeY + 75);

  // 6. THE STATS SECTION (Toxicity, Red Flags)
  const statsY = badgeY + badgeHeight + 100;
  const statsWidth = size - 300;
  const statsX = (size - statsWidth) / 2;

  ctx.textAlign = "left";
  ctx.fillStyle = "#d4d4d8"; // text-zinc-300
  ctx.font = "bold 42px Geist";
  ctx.fillText(`📊 BLAME SPLIT:`, statsX, statsY);
  ctx.fillText(`☠️ TOXICITY:`, statsX, statsY + 65);
  ctx.fillText(`🚩 RED FLAGS:`, statsX, statsY + 130);

  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.font = "black 42px Geist";
  const statsRightX = statsX + statsWidth;
  ctx.fillText(verdict.blame_split, statsRightX, statsY);
  ctx.fillText(`${verdict.toxicity_score}/100`, statsRightX, statsY + 65);
  ctx.fillText(`${verdict.red_flag_count}`, statsRightX, statsY + 130);

  // 7. THE SENTENCE (THE FIX!): Multi-Line Wrapping
  const sentenceY = statsY + 230;
  const sentenceWidth = size - 200;
  const sentenceX = size / 2; // Center-aligned wrapping
  const sentenceLineHeight = 55;

  ctx.textAlign = "center";
  ctx.fillStyle = "#e2b714"; // Gavel Gold
  ctx.font = "black 42px Geist";
  ctx.fillText("THE SENTENCE:", sentenceX, sentenceY);

  ctx.fillStyle = "#ffffff";
  ctx.font = "italic 38px Geist";
  
  // Use our new wrapText function instead of fillText
  // The first argument is the ctx, the second is the text to wrap, 
  // the third and fourth are the initial x and y,
  // the fifth is the max width, and the sixth is the line height.
  // It returns the final y position, so we know where to draw the watermark.
  const finalSentenceY = wrapText(
    ctx, 
    verdict.sentence, 
    sentenceX, 
    sentenceY + 70, 
    sentenceWidth, 
    sentenceLineHeight
  );

  // 8. THE WATERMARK
  ctx.textAlign = "center";
  ctx.fillStyle = "#52525b"; // text-zinc-600
  ctx.font = "bold 28px Geist";
  // Dynamically place the watermark based on where the sentence ended.
  ctx.fillText("internetcourt.app", size / 2, size - 80);

  // 9. TRIGGER THE DOWNLOAD
  const link = document.createElement("a");
  link.download = `verdict-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};