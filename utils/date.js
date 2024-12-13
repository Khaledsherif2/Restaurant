export const egyptArabicDate = new Date().toLocaleString("ar-EG", {
  timeZone: "Africa/Cairo",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});
