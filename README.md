# skala-front

SKALA 프론트엔드 과제 저장소 — 순수 HTML / CSS / JavaScript로 만든 여러 페이지와 스크립트 모음입니다.
프레임워크나 빌드 도구 없이 브라우저에서 바로 동작합니다.

## 미리보기

정적 파일이므로 로컬 HTTP 서버로 띄워 확인합니다. (`file://`로 열면 폰트·모듈 스크립트가 정상 동작하지 않을 수 있습니다.)

```bash
# 저장소 루트에서
python -m http.server 8000
# 브라우저에서 http://localhost:8000/html/index.html 접속
```

## 폴더 구조

```
skala-front/
├── html/            # 화면(페이지)
│   ├── index.html         # 메인 · Welcome (다른 페이지로 이동하는 진입점)
│   ├── login.html         # 로그인 폼
│   ├── signUp.html        # 회원가입 폼
│   ├── signUpResult.html  # 회원가입 완료 화면
│   ├── myProfile.html     # 자기소개 포트폴리오
│   ├── myClass.html       # 시간표 (30분 격자 테이블)
│   ├── myTrip.html        # 여행 기록 — 사진 / 영상 / 음악 3구역 카드
│   ├── myHoliday.html     # 휴일 소개 페이지
│   └── media/             # 페이지에서 쓰는 이미지·영상 (baseball.jpeg, trip.mp4)
├── script/          # 순수 JS 실습 스크립트
│   ├── bag.js             # 가방 속 물품 목록 출력
│   ├── grade.js           # 3과목 성적 평균 계산
│   ├── upDown.js          # 숫자 맞추기(Up & Down) 게임
│   ├── weatherAPI.js      # Open-Meteo API로 현재 날씨 데이터 가져오기 (데이터 모듈)
│   └── realtimeInfo.js    # weatherAPI를 불러와 화면에 표시 (뷰 모듈)
├── css/
│   └── style.css          # 전역 폰트만 Geist Pixel로 통일 (색·여백 등은 미변경)
├── font/
│   └── Geist_Pixel/       # Geist Pixel 가변 폰트 (로컬 TTF)
└── .gitignore
```

## 페이지 소개

| 페이지 | 설명 |
| --- | --- |
| `index.html` | 프로젝트 진입점. Profile / Class / Trip 등으로 바로가기 |
| `login.html` · `signUp.html` · `signUpResult.html` | 로그인 / 회원가입 폼과 완료 화면 |
| `myProfile.html` | 데이터 분석가 자기소개 포트폴리오 |
| `myClass.html` | 09:00~19:00 시간표. 30분 단위 `<table>` 격자에 강의 칸을 `colspan`으로 병합 |
| `myTrip.html` | 사진 · 영상 · 음악 3구역 카드 레이아웃의 여행 기록 |
| `myHoliday.html` | 휴일 소개 페이지 |

## 스타일 규칙

- `css/style.css`는 **폰트만** 담당합니다 — 모든 텍스트를 Geist Pixel로 통일하고, 색·크기·여백·정렬 등 다른 스타일은 건드리지 않습니다.
- 각 페이지는 `<link rel="stylesheet" href="../css/style.css">`로 이 파일을 연결합니다.
- 페이지별 레이아웃 스타일은 해당 HTML의 `<style>` 블록 또는 인라인 `style` 속성으로 작성되어 있습니다.
- Geist Pixel에는 한글 글리프가 없어, 한글 텍스트는 브라우저 기본 대체 글꼴로 표시됩니다.

## 기술 스택

- HTML5 / CSS3 / Vanilla JavaScript (ES Modules)
- 외부 API: [Open-Meteo](https://open-meteo.com/) (키 불필요)
- 빌드 도구·의존성 없음
