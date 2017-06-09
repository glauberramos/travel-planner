export function formatDate(date) {
  return date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + (date.getDate() + 1)).slice(-2);
}

export function formatDateBeautifully(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate() + 1;
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return day + ' ' + monthNames[month] + ' ' + year;
}

export function daysUntil(date) {
  var now = new Date(),
      dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      days = (dateEnd - now) / 1000/60/60/24;

  return Math.round(days);
}
