let touchTimer;

// 터치 이벤트 처리
document.addEventListener('touchstart', function(event) {
    // event.preventDefault(); // 기본 터치 동작을 막음
    
    // 롱탭 방지
    touchTimer = setTimeout(function() {
        event.preventDefault(); // 롱탭이 발생하면 기본 동작을 막음
    }, 500); // 500ms 이상 유지되면 롱탭으로 간주
}, { passive: false });

document.addEventListener('touchmove', function(event) {
    event.preventDefault(); // 드래그 및 터치 이동 방지
}, { passive: false });

// 터치 끝났을 때 타이머 리셋
document.addEventListener('touchend', function() {
    clearTimeout(touchTimer); // 터치가 끝나면 타이머를 리셋
});

// 가변적인 화면 조절
function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', setScreenSize);

// 모든 .btn 클래스를 가진 요소를 가져옴
const buttons = document.querySelectorAll('button');

// 버튼에 대해 클릭 이벤트 리스너를 설정
buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.classList.add('pressed'); // 버튼을 눌렀을 때 .pressed 클래스 추가
    });

    button.addEventListener('mouseup', () => {
        button.classList.remove('pressed'); // 버튼에서 손을 뗐을 때 .pressed 클래스 제거
    });

    // 모바일에서는 터치 이벤트도 처리
    button.addEventListener('touchstart', () => {
        button.classList.add('pressed'); // 터치 시작 시 .pressed 클래스 추가
    });

    button.addEventListener('touchend', () => {
        button.classList.remove('pressed'); // 터치 끝났을 때 .pressed 클래스 제거
    });

    // 터치 이동 시에도 .pressed 클래스를 유지하고 싶다면
    button.addEventListener('touchmove', (e) => {
        // 이동을 하더라도 버튼을 눌렀을 때는 .pressed 유지
        e.preventDefault();
    });
});


document.addEventListener("click", function(e) {
    const ripple = document.createElement("div");
    ripple.className = "touch-effect";
    document.body.appendChild(ripple);

    const size = 200;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.pageX - size / 2}px`;
    ripple.style.top = `${e.pageY - size / 2}px`;

    setTimeout(() => {
        ripple.remove();
    }, 600); // 애니메이션 종료 후 제거
});


// document.querySelector(".main__controls--homeBtn").addEventListener("click",  () => {
//     const nextPage = document.querySelector(".page");
            
//         nextPage.classList.add("fade-out");

//     setTimeout(function () {
//         location.replace('/pages/main.html');
//     }, 500); // 0.5초
    
// });

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });