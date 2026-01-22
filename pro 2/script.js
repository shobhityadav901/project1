const upload = document.getElementById("upload");
const img = document.getElementById("image");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturate = document.getElementById("saturate");
const smooth = document.getElementById("smooth");
const bgblur = document.getElementById("bgblur");
const passportMode = document.getElementById("passportMode");

const aiBtn = document.getElementById("aiBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Upload Image
upload.addEventListener("change", () => {
  if (!upload.files[0]) return;
  img.src = URL.createObjectURL(upload.files[0]);
});

// Apply live filters
function applyFilters() {
  img.style.filter =
    `brightness(${brightness.value}%)
     contrast(${contrast.value}%)
     saturate(${saturate.value}%)
     blur(${bgblur.value}px)`;
}

document.querySelectorAll("input[type=range]")
  .forEach(slider => slider.addEventListener("input", applyFilters));

// AI Enhance (smart preset)
aiBtn.addEventListener("click", () => {
  brightness.value = 110;
  contrast.value = 115;
  saturate.value = 120;
  bgblur.value = 0;
  applyFilters();
});

// Passport Mode
passportMode.addEventListener("change", () => {
  if (passportMode.value === "passport") {
    brightness.value = 105;
    contrast.value = 110;
    saturate.value = 95;
    bgblur.value = 0;
  }
  applyFilters();
});

// Reset
resetBtn.addEventListener("click", () => {
  brightness.value = 100;
  contrast.value = 100;
  saturate.value = 100;
  smooth.value = 0;
  bgblur.value = 0;
  passportMode.value = "none";
  img.style.filter = "none";
});

// Download enhanced image
downloadBtn.addEventListener("click", () => {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.filter =
    `brightness(${brightness.value}%)
     contrast(${contrast.value}%)
     saturate(${saturate.value}%)
     blur(${smooth.value}px)`;

  ctx.drawImage(img, 0, 0);

  const link = document.createElement("a");
  link.download = "enhanced-photo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
