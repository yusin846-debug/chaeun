const QR_PATTERN = [
  "1110101110111",
  "1000101000101",
  "1011101011101",
  "0000001000001",
  "1101011101101",
  "0100010100010",
  "1011100011101",
  "0000101110000",
  "1110001010111",
  "1000111000100",
  "0111010111010",
  "1000100010001",
  "1101110101110",
];

function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  return img.decode().then(() => img);
}

export async function downloadWatermarkedImage(imageSrc: string, filename: string) {
  const img = await loadImage(imageSrc);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(img, 0, 0);

  const pad = canvas.width * 0.045;
  const qrSize = canvas.width * 0.12;
  const logoH = qrSize * 0.55;
  const logo = await loadImage("/images/chaeun-logo-official-transparent.png");
  const logoW = logoH * (logo.naturalWidth / logo.naturalHeight);

  const boxW = qrSize + pad * 0.9 + logoW + pad * 0.6;
  const boxH = qrSize + pad * 0.5;
  const boxX = pad * 0.5;
  const boxY = canvas.height - boxH - pad * 0.7;

  ctx.fillStyle = "rgba(246,244,238,0.94)";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(boxX, boxY, boxW, boxH, 14);
  else ctx.rect(boxX, boxY, boxW, boxH);
  ctx.fill();

  const cell = qrSize / QR_PATTERN.length;
  ctx.fillStyle = "#315848";
  QR_PATTERN.forEach((row, y) => {
    row.split("").forEach((v, x) => {
      if (v === "1") ctx.fillRect(boxX + pad * 0.25 + x * cell, boxY + pad * 0.25 + y * cell, cell * 0.85, cell * 0.85);
    });
  });

  ctx.drawImage(logo, boxX + qrSize + pad * 0.5, boxY + (boxH - logoH) / 2, logoW, logoH);

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
