export async function downloadWatermarkedImage(imageSrc: string, filename: string) {
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."));
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(img, 0, 0);

  const badgeW = Math.round(canvas.width * 0.34);
  const badgeH = Math.round(badgeW * 0.32);
  const pad = Math.round(canvas.width * 0.035);
  const x = pad;
  const y = canvas.height - badgeH - pad;
  const r = badgeH * 0.5;

  ctx.fillStyle = "rgba(20, 26, 23, 0.55)";
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + badgeW, y, x + badgeW, y + badgeH, r);
  ctx.arcTo(x + badgeW, y + badgeH, x, y + badgeH, r);
  ctx.arcTo(x, y + badgeH, x, y, r);
  ctx.arcTo(x, y, x + badgeW, y, r);
  ctx.closePath();
  ctx.fill();

  const qrSize = badgeH * 0.6;
  const qrX = x + badgeH * 0.2;
  const qrY = y + (badgeH - qrSize) / 2;
  const cells = 5;
  const cell = qrSize / cells;
  ctx.fillStyle = "rgba(246, 244, 238, 0.92)";
  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const isCorner = (row < 2 && col < 2) || (row < 2 && col > cells - 3) || (row > cells - 3 && col < 2);
      if (isCorner || (row + col) % 2 === 0) {
        ctx.fillRect(qrX + col * cell, qrY + row * cell, cell * 0.86, cell * 0.86);
      }
    }
  }

  ctx.fillStyle = "rgba(246, 244, 238, 0.95)";
  ctx.font = `600 ${Math.round(badgeH * 0.32)}px "Cormorant Garamond", serif`;
  ctx.textBaseline = "middle";
  ctx.fillText("CHAEUN", qrX + qrSize + badgeH * 0.22, y + badgeH / 2);

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
