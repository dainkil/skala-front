/* ==========================================================================
   realtimeInfo.js  —  화면을 책임지는 모듈
   * weatherAPI.js 에서 데이터 가져오는 함수를 import 해서 사용한다.
   * <select id="city"> 가 바뀔 때마다(change 이벤트):
   *   1) 선택한 도시 이름 + 위도/경도 좌표를 즉시 화면에 표시하고
   *   2) 날씨를 받아오는 동안 "로딩 중..." 메시지를 띄운 뒤
   *   3) 응답이 오면 실시간 온도·습도로 화면을 다시 그린다.
   * 모든 출력은 <div id="weather-box"> 에 innerHTML 로 그린다.
   ========================================================================== */

import { fetchWeather } from "./weatherAPI.js";

// 1) 조작할 DOM 요소를 미리 잡아둔다
const citySelect = document.getElementById("city");
const weatherBox = document.getElementById("weather-box");
const mapEl = document.getElementById("city-map");

// Leaflet 지도(전역 L 은 index.html 의 CDN 스크립트가 제공). 한 번만 만들고 재사용한다.
let map = null;
let marker = null;

function showCityOnMap(name, lat, lon) {
  // 지도 컨테이너나 Leaflet 이 없으면(다른 페이지 등) 조용히 넘어간다
  if (!mapEl || !window.L) return;
  const coords = [Number(lat), Number(lon)];
  mapEl.classList.add("is-visible");

  if (!map) {
    // 최초 1회: 지도 생성 + 타일 + 마커
    map = L.map(mapEl, { scrollWheelZoom: false }).setView(coords, 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    marker = L.marker(coords).addTo(map);
  } else {
    // 이후: 부드럽게 이동 + 마커 위치만 갱신
    map.setView(coords, 11);
    marker.setLatLng(coords);
  }

  marker.bindPopup(name).openPopup();
  // 숨김→표시 직후엔 컨테이너 크기가 0 이었을 수 있으므로 크기 재계산
  setTimeout(() => map.invalidateSize(), 0);
}

function hideCityMap() {
  if (mapEl) mapEl.classList.remove("is-visible");
}

// select 나 box 가 없는 페이지에서 실수로 로드돼도 터지지 않게 방어
if (citySelect && weatherBox) {
  // 2) 도시가 바뀔 때마다 실행 (async: 안에서 await 를 쓰기 위해)
  citySelect.addEventListener("change", async (event) => {
    // 현재 선택된 <option> 에서 이름과 좌표(data-* 속성)를 읽어온다
    const option = event.target.selectedOptions[0];
    const name = event.target.value;
    const lat = option.dataset.lat;
    const lon = option.dataset.lon;

    // "Select a city…" 같은 빈 옵션을 고르면 박스를 비우고 지도도 숨긴다
    if (!name || !lat || !lon) {
      weatherBox.innerHTML = "";
      hideCityMap();
      return;
    }

    // 좌표를 알게 된 즉시 지도에 도시 위치를 표시한다
    showCityOnMap(name, lat, lon);

    // 3) 좌표를 먼저 즉시 카드로 표시하고 + 온도는 "…" 로딩 상태로 표시
    //    (fetch 응답을 기다리는 동안 사용자가 빈 화면을 보지 않게 함)
    weatherBox.innerHTML = `
      <div class="wb-card">
        <div class="wb-tile wb-tile--temp">
          <span class="wb-label">TEMP</span>
          <span class="wb-temp">…</span>
          <span class="wb-city">${name}</span>
        </div>
        <div class="wb-tile wb-tile--hum">
          <span class="wb-label">HUMIDITY</span>
          <span class="wb-value">…</span>
        </div>
        <div class="wb-tile wb-tile--geo">
          <span class="wb-label">LAT / LON</span>
          <span class="wb-value">${lat}</span>
          <span class="wb-sub">${lon}</span>
        </div>
      </div>
    `;

    // 4) 실제 날씨 데이터를 비동기로 요청 (성공/실패를 try/catch 로 처리)
    try {
      const weather = await fetchWeather(lat, lon);

      // 5) 다운로드 완료 → 진짜 실시간 온도·습도 카드로 다시 그린다
      weatherBox.innerHTML = `
        <div class="wb-card">
          <div class="wb-tile wb-tile--temp">
            <span class="wb-label">TEMP</span>
            <span class="wb-temp">${weather.temperature}${weather.units.temperature}</span>
            <span class="wb-city">${name}</span>
          </div>
          <div class="wb-tile wb-tile--hum">
            <span class="wb-label">HUMIDITY</span>
            <span class="wb-value">${weather.humidity}${weather.units.humidity}</span>
          </div>
          <div class="wb-tile wb-tile--geo">
            <span class="wb-label">LAT / LON</span>
            <span class="wb-value">${lat}</span>
            <span class="wb-sub">${lon}</span>
          </div>
        </div>
      `;
    } catch (error) {
      // 네트워크 오류 등으로 실패하면 좌표 카드는 유지한 채 에러 타일 표시
      weatherBox.innerHTML = `
        <div class="wb-card">
          <div class="wb-tile wb-tile--geo">
            <span class="wb-label">LAT / LON</span>
            <span class="wb-value">${lat}</span>
            <span class="wb-sub">${lon}</span>
          </div>
          <div class="wb-tile wb-tile--error">
            <span class="wb-label">ERROR</span>
            <span class="wb-sub">${error.message}</span>
          </div>
        </div>
      `;
    }
  });
}
