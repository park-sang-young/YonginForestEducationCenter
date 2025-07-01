window.addEventListener('load', function () {
    const subBody = document.querySelector('.sub-body');
    if (subBody) {
        subBody.classList.add('loaded');
    } else {
        console.error('sub-body 요소를 찾을 수 없습니다.');
    }
});

const navBtn = document.querySelectorAll(".main__navigation > ul li button");
const navContents = document.querySelectorAll(".main__contents > div");

navBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        // 이미 active면 아무 동작 안 하고 리턴
        if (this.classList.contains("active")) return;

        // 버튼 초기화
        navBtn.forEach(function (btn) {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        });

        // 콘텐츠 초기화
        navContents.forEach(function (area) {
            area.classList.remove("active");
            area.setAttribute("aria-hidden", "true");
            area.setAttribute("hidden", "");
            area.setAttribute("inert", "");
            area.style.opacity = "0";
            area.style.visibility = "hidden";
        });

        navContents.forEach(function (area) {
            area.style.opacity = "0";
            area.style.transform = "translateX(5.20833vh)";
        });

        // 현재 버튼 활성화
        this.classList.add("active");
        this.setAttribute("aria-selected", "true");


        const target = document.querySelector(`.main__contents--${this.dataset.area}`);

        if (target) {
            // 우선 숨긴 상태로 DOM에 보이게만 하기
            target.classList.add("active");
            target.removeAttribute("aria-hidden");
            target.removeAttribute("inert");
            target.removeAttribute("hidden");
            target.style.opacity = "0";
            target.style.visibility = "hidden";

            // 타겟 콘텐츠 보이게 전환 (애니메이션 유도)
            setTimeout(() => {
                target.style.opacity = "1";
                target.style.visibility = "visible";
                target.style.transform = "translateX(0)";

            }, 50);
        }
    });
});