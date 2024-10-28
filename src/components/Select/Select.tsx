import { useState, useEffect, useRef } from "react";
import CustomImage from "../Image/Image";
import Badge from "../Badge/Badge";

interface PropsSelect<T> {
  badge: boolean;
  data: T[] | string[];
  onSelect?: (selected: T | string | null) => void;
  resetSelected?: boolean;
  id?: string;
  image: boolean;
  className?: string;
}
interface OptionType {
  value: string;
  label: string;
  rate: number;
}
export default function SelectDropdown<T>(props: PropsSelect<T>) {
  const { badge, data, onSelect, resetSelected, image, className } = props;
  const [selectedOption, setSelectedOption] = useState<T | string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho search term
  const dropdownRef = useRef<HTMLDivElement>(null);

  const randomInt = Math.floor(Math.random() * 10) + 1;

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Reset selectedOption khi resetSelected thay đổi
  useEffect(() => {
    if (resetSelected) {
      setSelectedOption(null); // Reset selectedOption về null
    }
  }, [resetSelected]);

  // Chọn giá trị mặc định (giá trị đầu tiên) nếu chưa có selectedOption
  useEffect(() => {
    if (!selectedOption && data.length > 0 && onSelect) {
      setSelectedOption(data[0]); // Chọn giá trị đầu tiên trong data
      onSelect(data[0]); // Gọi onSelect để cập nhật giá trị mặc định
    }
  }, [data, selectedOption, onSelect]);

  // Lọc dữ liệu dựa trên search term
  const filteredData = data.filter((option) => {
    if (typeof option === "string") {
      return option.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (typeof option === "object" && option !== null) {
      const obj = option as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      return obj.label.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  const renderOptionContent = (option: T | string) => {
    if (typeof option === "string") {
      return <span className="text-nowrap">{option}</span>;
    } else if (typeof option === "object" && option !== null) {
      const obj = option as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      return (
        <div className="flex flex-col">
          <div className="sm:flex items-center">
            <span className="font-bold mr-2">{obj.value}</span>
            <span>{obj.label} - </span>
            <span className="text-blue-500 font-bold ml-2">{obj.rate}</span>
          </div>
          {badge && (
            <div className="mt-1 flex flex-wrap">
              <Badge badges={obj.badges} />
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const handleOptionSelect = (option: T | string) => {
    setSelectedOption(option);
    if (onSelect) onSelect(option); // Gọi callback khi chọn một option
    setIsOpen(false);
  };

  const selectedOptionText =
    typeof selectedOption === "string"
      ? selectedOption
      : `${(selectedOption as OptionType)?.value} - ${
          (selectedOption as OptionType)?.label
        } - ${(selectedOption as OptionType)?.rate}`;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 text-left py-2 px-4 rounded-md shadow-sm flex justify-between items-center focus:outline-none"
      >
        {selectedOption ? (
          <div className="flex items-center">
            {image && (
              <CustomImage
                src="https://cdn.mypanel.link/sw177w/3y6jfcfgmm14jned.gif"
                alt="option"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
            )}
            <span>
              {selectedOptionText}
            </span>
          </div>
        ) : (
          <span>Select a Service</span>
        )}

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
      </button>

      {isOpen && (
        <div
          className={
            className
              ? className
              : "absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          }
        >
          {/* Thêm input để người dùng nhập từ khóa tìm kiếm */}
          <input
            type="text"
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật search term khi nhập
          />

          <ul role="listbox">
            {filteredData.length > 0 ? (
              filteredData.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`select-none relative py-2 pl-4 pr-4 cursor-pointer hover:bg-gray-100 ${
                    typeof selectedOption === "object" &&
                    selectedOption !== null &&
                    (selectedOption as any)?.id === (option as any)?.id // eslint-disable-line @typescript-eslint/no-explicit-any
                      ? "text-blue-500 font-bold"
                      : ""
                  }`}
                  // role="option"
                >
                  <div className="flex items-center">
                    {image && (
                      <CustomImage
                        src="https://cdn.mypanel.link/sw177w/3y6jfcfgmm14jned.gif"
                        alt="option"
                        className="w-6 h-6 mr-2"
                        width={24}
                        height={24}
                      />
                    )}
                    <div className="flex-grow truncate">
                      {renderOptionContent(option)}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="py-2 pl-4 pr-4 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
