const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function formatDate(date: string) {
  const stringToDate = new Date(date);
  return `${stringToDate.getDate()} ${
    monthNames[stringToDate.getMonth()]
  } ${stringToDate.getFullYear()}`;
}
