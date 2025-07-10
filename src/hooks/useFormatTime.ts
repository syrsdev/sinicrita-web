import dayjs from "dayjs";

export const formatTimestamp = (timestamp: string): string => {
  const now = dayjs();
  const time = dayjs(timestamp);

  const diffHours = now.diff(time, "hour");

  if (diffHours < 24) {
    return time.format("hh:mm A");
  } else {
    return time.format("D MMM YY");
  }
};
