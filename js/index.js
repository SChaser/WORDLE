const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  // 맞췄을 때
  const displayGameover = () => {
    const div = document.createElement("div");
    div.classList.add("over");
    div.innerText = "정답입니다.";
    document.body.appendChild(div);
  };
  // 틀렸을 때
  const displayWrong = () => {
    const div = document.createElement("div");
    div.classList.add("wrong");
    div.innerText = "틀렸습니다. 다시 도전하세요.";
    document.body.appendChild(div);
  };

  const nextline = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  // 맞췄을 때
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  // 뒤로가기 기능 해주는 구간
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  //틀렸을 때
  const Wrong = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayWrong();
    clearInterval(timer);
  };
  //엔터키 기능
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const keyboard = document.querySelector(`.keyboard-column[data-key=']`);

      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) {
      gameover();
    } else if (attempts === 5) {
      Wrong();
    } else nextline();
  };

  // 키보드에도 동일하게 정답 표시가 표시 되게 구현

  // 눌렀을 때 소문자를 대문자로 바꿔주는 구간
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  // 웹에있는 키보드 눌렀을 때 값 입력하게
  const handleClick = (event) => {
    const key = event.target.getAttribute("data-key");
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (key === "BACK") handleBackspace();
    else if (index === 5) {
      if (key === "ENTER") handleEnterKey();
      else return;
    } else if (key !== null && key !== "ENTER") {
      thisBlock.innerText = key;
      index++;
    }
  };

  // 타이머 설정 구간
  const startTimer = () => {
    const 시작_시간 = new Date();
    // 일월 연도 추가
    function setTime() {
      const 일 = new Date().getDate().toString();
      const 월 = (new Date().getMonth() + 1).toString();
      const 연도 = new Date().getFullYear().toString();
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${연도}년 ${월}월 ${일}일 ${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleClick);
}

appStart();
