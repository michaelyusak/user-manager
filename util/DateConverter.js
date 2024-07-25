const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function monthStrToInt(monthStr) {
  let monthInt = 0;

  months.forEach((month, i) => {
    if (month == monthStr) {
      monthInt = i + 1;
    }
  });

  return monthInt > 9 ? monthInt : `0${monthInt}`;
}

function monthIntToStr(monthInt) {
  if (monthInt[0] == 0) {
    monthInt = monthInt[1];
  }

  return months[monthInt - 1];
}

export function convertToIntDate(dateStr) {
  const [date, month, year] = dateStr.split(" ");

  return `${year}-${monthStrToInt(month)}-${date}`;
}

export function convertToStrDate(dateInt) {
  const [year, month, date] = dateInt.split("-");

  return `${date} ${monthIntToStr(month)} ${year}`;
}

export function dateOfInputGenerator() {
  const currentDate = new Date();

  const timeOption = {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  };
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOption);

  return `${currentDate.getDate()} ${monthIntToStr(
    currentDate.getMonth()
  )} ${currentDate.getFullYear()} ${timeFormatter.format(currentDate)}`;
}
