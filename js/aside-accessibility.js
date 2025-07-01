document.addEventListener("DOMContentLoaded", function () {

    const lowScreenBtn = document.getElementById("lowScreenBtn");
    const footer = document.getElementById("footer");
    const container = document.querySelector(".container");

    const label = lowScreenBtn?.querySelector(".lowScreenBtn-label");
    const lowIcon = document.querySelector(".lowScreenBtn-icon");
    const highIcon = document.querySelector(".highScreenBtn-icon");

    const accessibilityAudio = document.getElementById("accessibilityAudio");
    const voicePauseBtn = document.querySelector(".voice-pauseBtn");
    const voicePlayBtn = document.querySelector(".voice-playBtn");
    const voiceReplayBtn = document.querySelector(".voice-replayBtn");


    const savedVoice = localStorage.getItem("voiceMode");
    if (savedVoice === "voiceOffMode") {
        if (accessibilityAudio) {
            accessibilityAudio.pause();
            accessibilityAudio.currentTime = 0;
        }

        voicePauseBtn && (voicePauseBtn.style.display = "none");
        voicePlayBtn && (voicePlayBtn.style.display = "flex");
    } else {
        tryPlayAudio();
    }

    function tryPlayAudio() {
        if (!accessibilityAudio) return;

        setTimeout(() => {
            accessibilityAudio.play().then(() => {
            voicePauseBtn.style.display = "flex";
            voicePlayBtn.style.display = "none";
            localStorage.setItem('voiceMode', 'voiceOnMode');
            }).catch((err) => {
                console.warn("자동 재생 실패:", err);
                voicePlayBtn.style.display = "flex";
                voicePauseBtn.style.display = "none";
                
            });
        }, 500);
        
    }

    voicePauseBtn.addEventListener("click", () => {
        accessibilityAudio.pause();
        voicePauseBtn.style.display = "none";
        voicePlayBtn && (voicePlayBtn.style.display = "flex");
        localStorage.setItem('voiceMode', 'voiceOffMode');

    });

    voicePlayBtn.addEventListener("click", () => {
        if (accessibilityAudio && (accessibilityAudio.ended || accessibilityAudio.currentTime === accessibilityAudio.duration)) {
            accessibilityAudio.currentTime = 0;
        }
        accessibilityAudio.play();
        voicePauseBtn && (voicePauseBtn.style.display = "flex");
        voicePlayBtn && (voicePlayBtn.style.display = "none");
        localStorage.setItem('voiceMode', 'voiceOnMode');
    });

    voiceReplayBtn.addEventListener("click", () => {
        if (!accessibilityAudio) return;
        accessibilityAudio.currentTime = 0;
        accessibilityAudio.play();
        voicePauseBtn && (voicePauseBtn.style.display = "flex");
        voicePlayBtn && (voicePlayBtn.style.display = "none");
        localStorage.setItem('voiceMode', 'voiceOnMode');
    });




    accessibilityAudio?.addEventListener("ended", () => {
        voicePlayBtn && (voicePlayBtn.style.display = "flex");
        voicePauseBtn && (voicePauseBtn.style.display = "none");
        localStorage.setItem('voiceMode', 'voiceOffMode');
    });

    if (lowScreenBtn && footer && container) {
        const moveFooter = (toTop) => {
            // 애니메이션 클래스 초기화
            footer.classList.remove("moving-in", "moving-out");

            // 부드러운 전환을 위해 클래스 추가 → DOM 재배치까지 delay
            footer.classList.add("moving-out");

            setTimeout(() => {
                if (toTop) {
                    container.insertBefore(footer, container.firstChild);
                    footer.dataset.moved = "true";
                    localStorage.setItem("lowScreenState", "true");
                    label && (label.innerText = "높은 화면");
                    lowIcon && (lowIcon.style.display = "none");
                    highIcon && (highIcon.style.display = "block");
                } else {
                    container.appendChild(footer);
                    footer.dataset.moved = "false";
                    localStorage.setItem("lowScreenState", "false");
                    label && (label.innerText = "낮은 화면");
                    lowIcon && (lowIcon.style.display = "block");
                    highIcon && (highIcon.style.display = "none");
                }

                // 이동 후 부드러운 진입 애니메이션
                requestAnimationFrame(() => {
                    footer.classList.remove("moving-out");
                    footer.classList.add("moving-in");
                });
                }, 300); // out 애니메이션 지속 시간과 맞춰야 함
            };

            lowScreenBtn.addEventListener("click", function () {
                const isMoved = footer.dataset.moved === "true";
                moveFooter(!isMoved);
            });

            const savedLowScreenState = localStorage.getItem("lowScreenState") === "true";
            moveFooter(savedLowScreenState);
        }
});



const homeBtn = document.querySelector(".main__controls--homeBtn");



homeBtn.addEventListener("click", () => {
    const page = document.querySelector(".page");
            
    page.classList.add("fade-out");

    setTimeout(function () {
        location.replace('/pages/main.html');
    }, 500); // 0.5초
});