import { useEffect, useRef } from "react";
import $ from "jquery";
import moment from "moment";

interface DateRangePickerOptions {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  opens?: string;
  locale?: {
    format?: string;
  };
  ranges?: {
    [key: string]: [moment.Moment, moment.Moment];
  };
  callback?: (start: moment.Moment, end: moment.Moment, label: string) => void;
}
// Khai báo tạm thời cho TypeScript để nhận diện plugin jQuery daterangepicker
declare global {
  interface JQuery {
    daterangepicker: (
      options?: DateRangePickerOptions,
      callback?: (start: Date, end: Date, label: string) => void
    ) => JQuery;
  }
}

function DateRangePickerComponent({
  start,
  end,
  onDateChange,
}: {
  start: string;
  end: string;
  onDateChange: (start: string, end: string) => void;
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      $(inputRef.current).daterangepicker(
        {
          opens: "right",
          startDate: start
            ? moment(start, "YYYY/MM/DD").toDate()
            : moment().startOf("month").toDate(),
          endDate: end
            ? moment(end, "YYYY/MM/DD").toDate()
            : moment().endOf("month").toDate(),
          locale: {
            format: "YYYY/MM/DD",
          },
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, "days"),
              moment().subtract(1, "days"),
            ],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [
              moment().subtract(1, "month").startOf("month"),
              moment().subtract(1, "month").endOf("month"),
            ],
          },
        } as DateRangePickerOptions,
        function (start: moment.Moment, end: moment.Moment) {
          const startDate = start.format("YYYY/MM/DD");
          const endDate = end.format("YYYY/MM/DD");
          onDateChange(startDate, endDate); // Gọi hàm callback để truyền dữ liệu lên cha
        } as unknown as (start: Date, end: Date) => void
      );
    }
  }, [onDateChange, start, end]);

  return (
    <div className="relative inline-block">
      <input
        ref={inputRef}
        type="text"
        className="block h-[42px] appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-blue-500"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default DateRangePickerComponent;
