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
    return dayjs(dateTimeString).format('h:mm A, MMM D, YYYY');
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
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      return Object.keys(obj).length === 0;
    }
    
    // 如果是陣列，檢查長度
    if (Array.isArray(obj)) {
      return obj.length === 0;
    }
    
    // 其他類型返回 false
    return false;
  };

export {
  formatDate,
  formatTime,
  formatDuration,
  formatDateTime,
  isEmptyObject,
};
