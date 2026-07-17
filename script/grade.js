/* ==========================================================================
   grade.js  —  강의 3과목 성적 평균 계산
   * HTML / CSS / JavaScript 세 과목 점수를 prompt 로 연속 입력받는다.
   * 세 과목의 총점과 평균을 구해 60점 이상이면 합격, 미만이면 불합격.
   * 평균 점수에 따라 A ~ F 등급도 함께 매긴다.
   * 최종 결과(총점 · 평균 · 등급 · 합격여부)를 alert 창으로 보여준다.
   ========================================================================== */

function startGrade() {
  // 1) 과목 이름 배열과 총점 변수를 미리 준비
  var subjects = ["Data Structures", "Algorithms", "Operating Systems"];
  var total = 0;

  // 2) 과목 수(배열 길이)만큼 반복하며 점수를 연속 입력받아 총점에 더한다
  for (var i = 0; i < subjects.length; i++) {
    // prompt 는 문자열을 돌려주므로 Number 로 숫자 변환한다
    // (변환하지 않으면 "80" + "90" 처럼 문자열이 이어붙어 총점이 틀린다)
    var score = Number(prompt(subjects[i] + " 점수를 입력하세요."));
    total += score;
  }

  // 3) 평균 점수 = 총점 / 과목 수
  var average = total / subjects.length;

  // 4) 합격 여부 판정 (평균 60점 이상이면 합격, 미만이면 불합격)
  var result;
  if (average >= 60) {
    result = "합격입니다!";
  } else {
    result = "불합격입니다!";
  }

  // 5) 평균 점수로 등급 매기기 (A ~ F)
  var gradeLevel;
  if (average >= 90) {
    gradeLevel = "A";
  } else if (average >= 80) {
    gradeLevel = "B";
  } else if (average >= 70) {
    gradeLevel = "C";
  } else if (average >= 60) {
    gradeLevel = "D";
  } else {
    gradeLevel = "F";
  }

  // 6) 결과를 alert 창으로 한 번에 출력
  alert(
    "총점: " + total + "점, " +
    "평균: " + average + "점, " +
    "등급: " + gradeLevel + ", " +
    "결과: " + result
  );
}
