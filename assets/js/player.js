// /assets/js/player.js
// Lógica do player adaptada exatamente do exemplo, compartilhada entre filme e serie

// Para ambas páginas
if (document.getElementById('playerBox')) {
    let clickCount = 0;
    const btn = document.getElementById('btnDesbloquear');
    const playerBox = document.getElementById('playerBox');
    const video = document.getElementById('video');
    const overlay = document.getElementById('overlay');
    const centerPlay = document.getElementById('centerPlay');
    const controls = document.getElementById('controls');
    const playPause = document.getElementById('playPause');
    const playPausePath = document.getElementById('playPausePath');
    const back10 = document.getElementById('back10');
    const forward10 = document.getElementById('forward10');
    const fullscreen = document.getElementById('fullscreen');
    const progress = document.getElementById('progress');
    const progressFilled = document.getElementById('progressFilled');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    
    btn.addEventListener('click', () => {
        clickCount++;
        window.open("https://www.effectivegatecpm.com/eacwhk55f?key=87f8fc919fb5d70a825293b5490713dd", "_blank");
        if (clickCount < 3) {
            btn.textContent = `🔓 Clique ${3 - clickCount} vezes restantes para desbloquear`;
        } else {
            btn.textContent = "✅ Player Desbloqueado!";
            btn.disabled = true;
            playerBox.style.display = "block";
        }
    });
    
    function iniciar() {
        overlay.classList.add("hidden");
        centerPlay.style.opacity = 0;
        controls.classList.remove("hidden");
        video.play();
    }
    
    overlay.addEventListener("click", iniciar);
    centerPlay.addEventListener("click", iniciar);
    
    playPause.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playPausePath.setAttribute("d", "M6 5h4v14H6V5zm8 0h4v14h-4V5z");
        } else {
            video.pause();
            playPausePath.setAttribute("d", "M8 5v14l11-7z");
        }
    });
    
    back10.onclick = () => video.currentTime -= 10;
    forward10.onclick = () => video.currentTime += 10;
    
    let fs = false;
    fullscreen.addEventListener("click", async () => {
        if (!fs) {
            await playerBox.requestFullscreen();
            if (screen.orientation && screen.orientation.lock) {
                try { await screen.orientation.lock("landscape"); } catch(e) {}
            }
            fs = true;
        } else {
            document.exitFullscreen();
            fs = false;
        }
    });
    
    video.addEventListener("timeupdate", () => {
        let p = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = p + "%";
        currentTimeEl.textContent = format(video.currentTime);
        totalTimeEl.textContent = format(video.duration);
    });
    
    progress.addEventListener("click", (e) => {
        const rect = progress.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });
    
    function format(t) {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return m + ":" + (s < 10 ? "0" + s : s);
    }
    
    let hideTimer;
    playerBox.addEventListener("mousemove", () => {
        controls.classList.remove("hidden");
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => controls.classList.add("hidden"), 2500);
    });
    
    // Para serie, a função tocar já lida com src e load
}