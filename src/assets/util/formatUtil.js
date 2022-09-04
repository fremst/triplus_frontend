export default {
  install(Vue) {
    Vue.config.globalProperties.$getFormattedDate = dateFormatter.getFormattedDate;
    Vue.config.globalProperties.$getFormattedDateOnly = dateFormatter.getFormattedDateOnly;
    Vue.config.globalProperties.$getFormattedCurrency = currencyFormatter.getFormattedCurrency;
  }
};

export const dateFormatter = {
  getFormattedDate: date => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    if (date) {
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " (" + week[date.getDay()] + ")";
    } else {
      return "";
    }
  },
  getFormattedDateOnly: date => {
    if (date) {
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    } else {
      return "";
    }
  }
};

export const currencyFormatter = {
  getFormattedCurrency: value => {
    if (value) {
      return value.toLocaleString("ko-KR") + " 원";
    } else {
      return "-";
    }
  }
};
