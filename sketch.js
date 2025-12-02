let cam;
let filterGif;
let camStarted = false;

function preload() {
  filterGif = loadImage("ipad live 3.gif"); // GIF 파일 경로 확인
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(20);
  text("터치하여 카메라 시작", width / 2, height / 2);
}

function draw() {
  background(0);

  if (camStarted && cam) {
    // GIF 원본 비율 계산
    let gifWidth = filterGif.width;
    let gifHeight = filterGif.height;

    // 화면 크기에 맞춰 스케일링 (원본 비율 유지)
    let scaleFactor = min(width / gifWidth, height / gifHeight);
    let drawWidth = gifWidth * scaleFactor;
    let drawHeight = gifHeight * scaleFactor;

    let drawX = (width - drawWidth) / 2;
    let drawY = (height - drawHeight) / 2;

    // 카메라 미러링
    push();
    translate(width, 0);
    scale(-1, 1);
    image(cam, drawX, drawY, drawWidth, drawHeight);
    pop();

    // GIF 중앙 정렬, 원본 비율 유지
    image(filterGif, drawX, drawY, drawWidth, drawHeight);
  }
}

// 터치 이벤트로 카메라 시작 (iOS Safari 대응)
function touchStarted() {
  if (!camStarted) {
    cam = createCapture({
      video: { facingMode: "user" },
      audio: false
    });
    cam.elt.setAttribute('playsinline', ''); // 전체화면 방지
    cam.hide();
    camStarted = true;
  }
}

// 창 크기 변경 시 반응형
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}