import dayjs from "dayjs";

const formatDate = (dt) => dayjs(dt).format("MMM DD YYYY");
const formatTime = (dt) => dayjs(dt).format("HH:mm");

const formatDuration = (pt) => {
  const match = pt.match(/PT(\d+H)?(\d+M)?/);
  const h = match[1] ? match[1].replace("H", "hr ") : "";
  const m = match[2] ? match[2].replace("M", "min") : "";
  return h + m;
};

/**
 * 將 ISO 日期時間字串轉換為更易讀的格式
 * @param {string} dateTimeString - ISO 格式日期時間 (如 2025-05-25T10:30:00)
 * @returns {string} 格式化後的日期時間 (如 10:30 AM, May 25, 2025)
 */
const formatDateTime = (dateTimeString) => {
  return dayjs(dateTimeString).format("h:mm A, MMM D, YYYY");
};

/**
 * 檢測物件是否為空
 * @param {any} obj - 要檢測的物件
 * @returns {boolean} - 如果為空則返回 true，否則返回 false
 */
const isEmptyObject = (obj) => {
  // 檢查 null 或 undefined
  if (obj == null) {
    return true;
  }

  // 如果是物件類型，檢查是否有任何自己的可枚舉屬性
  if (typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).length === 0;
  }

  // 如果是陣列，檢查長度
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  // 其他類型返回 false
  return false;
};

/**
 * 根據指定的IATA代碼篩選並組合出發和到達信息
 * @param {Array} segments - 航班段落數組
 * @param {string} departure - 出發IATA代碼
 * @param {string} arrival - 到達IATA代碼
 * @returns {Object|null} - 包含匹配的出發和到達信息的組合對象，如果未找到則返回null
 */
function combineFlightInfo(segments, departure, arrival) {
  let departureInfo = null;
  let arrivalInfo = null;
  
  // 遍歷所有段落以查找匹配的出發和到達信息
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    
    if (segment.arrival.iataCode === departure) { // ! 返程，應該是這樣，要再確認下資料結構
      departureInfo = segment.arrival;
    }
    
    if (segment.arrival.iataCode === arrival) { // 出發
      arrivalInfo = segment.arrival;
    }
    
    // 如果兩者都找到，可以停止搜索
    if (departureInfo && arrivalInfo) {
      break;
    }
  }
  
  // 如果兩部分都找到了，返回組合對象
  if (departureInfo && arrivalInfo) {
    return {
      departure: departureInfo,
      arrival: arrivalInfo
    };
  }
  
  return null; // 如果出發或到達信息未找到，則返回null
}

// 計算時間差 (單位：分鐘)
function calculateStayTime(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  return endTotalMinutes - startTotalMinutes;
}

// 幫每個行程加上 stay_time
function addStayTimeToItineraries(schedule) {
  return schedule.map(day => {
    const updatedItinerary = day.itinerary.map(spot => ({
      ...spot,
      stay_time: calculateStayTime(spot.start_time, spot.end_time)
    }));
    return {
      ...day,
      itinerary: updatedItinerary
    };
  });
}

export {
  formatDate,
  formatTime,
  formatDuration,
  formatDateTime,
  isEmptyObject,
  combineFlightInfo,
  addStayTimeToItineraries,
};
