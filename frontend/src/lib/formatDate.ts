import moment from "moment";
import type { DateValue } from "reka-ui";

export function formatDate(
  date: string,
  dateFormat: string = "ddd, DD MMMM YYYY HH:mm:ss"
) {
  return moment(date).format(dateFormat);
}