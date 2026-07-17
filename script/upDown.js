/* ==========================================================================
   upDown.js  —  숫자 맞추기(Up & Down) 게임
   * 컴퓨터가 1~50 사이 비밀 숫자를 정하면, 사용자가 prompt 로 맞춘다.
   * 입력값이 정답보다 크면 "Down!", 작으면 "Up!", 같으면 축하 후 종료.
   * index.html 의 빨간 카드를 누르면 startUpDown() 이 실행된다.
   ========================================================================== */

function startUpDown() {
  // 1) 컴퓨터가 1~50 사이 무작위 정수 하나를 생성
  var computerNum = Math.floor(Math.random() * 50) + 1;

  // 몇 번 만에 맞췄는지 세는 카운터
  var count = 0;

  // 2) 정답을 맞출 때까지 반복
  while (true) {
    var input = prompt("1 ~ 50 사이의 숫자를 입력하세요!");

    // 사용자가 '취소'를 누르면 (null) 게임을 중단
    if (input === null) {
      break;
    }

    var userNum = Number(input);

    // 숫자가 아닌 값을 넣으면 다시 입력받음 (NaN 이 정답으로 오인되는 것 방지)
    if (isNaN(userNum)) {
      alert("숫자를 입력해주세요!");
      continue;
    }

    count++;

    // 3) 입력값과 정답 비교
    if (userNum > computerNum) {
      alert("Down!");
    } else if (userNum < computerNum) {
      alert("Up!");
    } else {
      // 4) 정답! 시도 횟수를 알리고 게임 종료
      alert("축하합니다! " + count + "번 만에 맞추셨습니다.");
      break;
    }
  }
}
