import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

// date format for the short year format - to be used in javascript.
// the date format for database queries is defined in backend/src/models/reports/helpers/index.js
const DATE_FORMAT_SHORT_YEAR = "DD-MMM-YY";

/**
 * Format a date to the format "dd-Mon-yy"
 * e.g. 2021-01-01 -> 01-Jan-21
 *
 * @param   {string | unknown} date - date to be formatted
 * @returns {string}                - formatted date
 */

//Purpose for this is because Openshift is on UTC where this app is currently running from as per 04/25/2024
const formatDate = (date) => date && dayjs(date).utc().format(DATE_FORMAT_SHORT_YEAR);

/**
 * Format a date to the format "dd-Mon-yy"
 *
 * @param   {string | Date | unknown } params - date to be formatted
 * @returns {Date}                            date
 */
const dateFormatter = ({ value = null }) => (null === value ? "" : formatDate(value));

export { formatDate as default, dateFormatter, DATE_FORMAT_SHORT_YEAR };
