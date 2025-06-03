import moment from "moment";

export const currentDate = () => {
  const date = moment().format("YYYY-MM-DD");
  return date;
};

export const currentDateForJourney = () => {
  let time = moment().add(6, "hours"); // Cihaz saatine göre 6 saat ekle
  // Dakikayı en yakın 5’e yuvarla
  let minutes = time.minutes();
  if (minutes >= 56) {
    time.add(1, 'hour').minutes(0);
  } else {
    const remainder = minutes % 5;
    if (remainder !== 0) {
      time.minutes(minutes - remainder + 5);
    }
  }
  const formatted = time.format("YYYY-MM-DD HH:mm");
  return formatted;
};

export const convertDateToMilliSecond = (data) => {
  var myDate = data.split("-");
  var newDateWithMs = new Date(Number(myDate[0]), Number(myDate[1] - 1), Number(myDate[2]));
  return newDateWithMs.getTime();
};
