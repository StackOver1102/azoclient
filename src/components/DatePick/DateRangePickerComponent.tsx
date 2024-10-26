import { useEffect, useRef } from 'react';
import $ from 'jquery';
import moment from 'moment';

// Khai báo tạm thời cho TypeScript để nhận diện plugin jQuery daterangepicker
declare global {
  interface JQuery {
    daterangepicker: (options?: any, callback?: (start: any, end: any, label: any) => void) => JQuery;
  }
}

function DateRangePickerComponent({ onDateChange }: { onDateChange: (start: string, end: string) => void }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      $(inputRef.current).daterangepicker({
        opens: 'right',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        locale: {
          format: 'YYYY/MM/DD',
        },
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        },
      }, function (start, end, label) {
        const startDate = start.format('YYYY/MM/DD');
        const endDate = end.format('YYYY/MM/DD');
        onDateChange(startDate, endDate); // Gọi hàm callback để truyền dữ liệu lên cha
      });
    }
  }, [onDateChange]);

  return (
    <div className="relative inline-block">
      <input
        ref={inputRef}
        type="text"
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-blue-500"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
  );
}

export default DateRangePickerComponent;
