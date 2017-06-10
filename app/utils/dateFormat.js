/* eslint no-bitwise: 0 */
export function formatDate(date) {
  return date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + (date.getDate() + 1)).slice(-2);
}

export function formatDateBeautifully(date) {
  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
  ];

  const day = date.getDate() + 1;
  const month = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[month] + ' ' + year;
}

export function daysUntil(date) {
  const now = new Date();
  const dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const days = (dateEnd - now) / 1000 / 60 / 60 / 24;

  return Math.round(days);
}

export function checkIfNextMonth(date) {
  const now = new Date();
  const month = date.getMonth() + 1;
  const currentMonth = now.getMonth() + 1;

  return currentMonth + 1 === month;
}

export function guidGenerator() {
  const S4 = () => {
     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
