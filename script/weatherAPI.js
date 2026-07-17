/* ==========================================================================
   weatherAPI.js  —  데이터를 책임지는 모듈
   * Open-Meteo 무료 API(키 불필요)로 특정 좌표의 "현재 날씨"를 가져온다.
   * fetch() + async/await 로 서버에 비동기 요청을 보내고,
   * 온도(temperature_2m) / 습도(relative_humidity_2m)만 골라서 돌려준다.
   * 화면(DOM) 은 전혀 건드리지 않는다 → 화면 담당은 realtimeInfo.js.
   ========================================================================== */

// Open-Meteo 예보 엔드포인트 (현재값만 요청)
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * 위도/경도로 현재 날씨(온도·습도)를 비동기로 가져온다.
 * @param {number|string} lat 위도
 * @param {number|string} lon 경도
 * @returns {Promise<{temperature:number, humidity:number, units:{temperature:string, humidity:string}}>}
 */
export async function fetchWeather(lat, lon) {
  // 1) 요청 URL 조립: 현재 온도와 상대습도를 함께 달라고 요청한다
  const url =
    `${BASE_URL}?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m`;

  // 2) 서버에 요청을 보내고 응답을 기다린다 (다운로드가 끝날 때까지 await)
  const response = await fetch(url);

  // 3) HTTP 상태가 정상(200~299)이 아니면 에러를 던진다 → 호출한 쪽에서 catch
  if (!response.ok) {
    throw new Error(`날씨 API 요청 실패 (HTTP ${response.status})`);
  }

  // 4) 본문(JSON)을 자바스크립트 객체로 변환한다 (이 과정도 비동기라 await)
  const data = await response.json();

  // 5) 필요한 값만 추려서 깔끔한 형태로 돌려준다
  //    (current: 실제 값, current_units: "°C" / "%" 같은 단위 문자열)
  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    units: {
      temperature: data.current_units.temperature_2m,   // 예: "°C"
      humidity: data.current_units.relative_humidity_2m, // 예: "%"
    },
  };
}
