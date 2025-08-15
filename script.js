const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const speedRange = document.getElementById('speedRange');
  const speedVal = document.getElementById('speedVal');
  const progress = document.getElementById('progress');
  const overflowText = document.getElementById('overflowText');
  const liquid = document.getElementById('liquid');
  const heartsInJar = document.getElementById('hearts-in-jar');
  const overflowLayer = document.getElementById('overflowLayer');

  let fill = 0;
  let speed = 1;
  let interval;
  let overflowShown = false;

  function updateJar() {
    liquid.setAttribute('y', 90 - (fill * 0.7));
    liquid.setAttribute('height', fill * 0.7);
    progress.textContent = Math.floor(fill) + '%';

    heartsInJar.innerHTML = '';
    const heartCount = Math.floor(40 + (fill / 100) * 160);
    for (let i = 0; i < heartCount; i++) {
      const x = 20 + Math.random() * 60;
      const y = 90 - Math.random() * (70 * (fill / 100) + 6);
      const s = 0.6 + Math.random() * 0.9;
      const r = Math.random() * 25 - 12;
      heartsInJar.innerHTML += `<g transform="translate(${x},${y}) scale(${s}) rotate(${r})">
        <path d="M12 21s-6.716-4.393-9.142-7.27C.88 11.534 1.5 8.5 3.657 6.9 5.813 5.3 8.41 5.86 10 7.6c1.59-1.74 4.187-2.3 6.343-.7 2.157 1.6 2.778 4.635.8 6.83C18.716 16.607 12 21 12 21z" fill="#fff" stroke="#fb7185" stroke-width="1.4"/>
      </g>`;
    }

    if (fill >= 100 && !overflowShown) {
      overflowShown = true;
      clearInterval(interval);
      overflowText.textContent = 'Overflow! Love is everywhere 💗';
      showOverflow();
    }
  }

  function showOverflow() {
    overflowLayer.innerHTML = '';
    for (let i = 0; i < 300; i++) {
      const span = document.createElement('span');
      span.className = 'overflow-heart';
      const size = 12 + Math.random() * 26;
      const left = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = 6 + Math.random() * 8;
      const opacity = 0.4 + Math.random() * 0.6;
      span.style.fontSize = size + 'px';
      span.style.left = left + 'vw';
      span.style.bottom = '-10vh';
      span.style.opacity = opacity;
      span.style.animationDuration = duration + 's';
      span.style.animationDelay = delay + 's';
      span.textContent = Math.random() > 0.5 ? '💖' : '❤️';
      overflowLayer.appendChild(span);
    }
  }

  startBtn.onclick = () => {
    if (fill >= 100) return;
    clearInterval(interval);
    interval = setInterval(() => {
      fill = Math.min(100, fill + 0.5 * speed);
      updateJar();
    }, 40);
  };

  pauseBtn.onclick = () => {
    clearInterval(interval);
  };

  resetBtn.onclick = () => {
    clearInterval(interval);
    fill = 0;
    overflowShown = false;
    updateJar();
    overflowText.textContent = 'Jar will overflow at 100% — get ready! 🎉';
    overflowLayer.innerHTML = '';
  };

  speedRange.oninput = (e) => {
    speed = parseFloat(e.target.value);
    speedVal.textContent = speed.toFixed(1) + 'x';
  };

  updateJar();