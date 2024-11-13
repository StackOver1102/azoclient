import { useState, useEffect, useRef } from "react";
import CustomImage from "../Image/Image";
import Badge from "../Badge/Badge";
import { Product } from "@/services/ProductService";

interface PropsSelect<T> {
  badge: boolean;
  data: T[] | string[];
  onSelect?: (selected: T | string | null) => void;
  resetSelected?: boolean;
  id?: string;
  image: boolean;
  className?: string;
  defaultValue?: T | string; // Add defaultValue prop
  defaultLabel?: string
  detailData?: Product | null | undefined;
  type?: string
}

interface OptionType {
  value: string;
  label: string;
  rate: number;
}

export default function SelectDropdown<T>(props: PropsSelect<T>) {
  const { badge, data, onSelect, resetSelected, image, className, defaultValue, defaultLabel, detailData, type } = props;
  const [selectedOption, setSelectedOption] = useState<T | string | null>(defaultValue || null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset selectedOption when resetSelected changes
  useEffect(() => {
    if (resetSelected) {
      setSelectedOption(null);
    }
  }, [resetSelected]);

  // Set defaultValue as selectedOption on first render or when defaultValue changes
  useEffect(() => {
    if (!selectedOption && data.length > 0 && onSelect && !defaultLabel && !detailData) {
      setSelectedOption(data[0]); // Chọn giá trị đầu tiên trong data
      onSelect(data[0]); // Gọi onSelect để cập nhật giá trị mặc định
    }
    else if (detailData && !selectedOption && data.length > 0 && onSelect && !defaultLabel && type) {
      if (type === "service") {
        setSelectedOption(detailData as T | string | null);
        onSelect(detailData as T | string | null);
      }
      else if (type === "platforms") {

        setSelectedOption(detailData.platform)
        onSelect(detailData.platform);
      }
      else {
        setSelectedOption(detailData.category)
        onSelect(detailData.category);
      }
    }
  }, [data, selectedOption, onSelect, defaultLabel, detailData, type]);

  // Filter data based on search term
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
            <span className="text-blue-500 font-bold ml-2">{obj.rate} $</span>
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
    if (onSelect) onSelect(option);
    setIsOpen(false);
  };

  const selectedOptionText =
    typeof selectedOption === "string"
      ? selectedOption
      : `${(selectedOption as OptionType)?.value} - ${(selectedOption as OptionType)?.label
      } - ${(selectedOption as OptionType)?.rate} $`;

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
            <span>{selectedOptionText}</span>
          </div>
        ) : (
          <span>{defaultLabel}</span>
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
          <input
            type="text"
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ul role="listbox">
            {filteredData.length > 0 ? (
              filteredData.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`select-none relative py-2 pl-4 pr-4 cursor-pointer hover:bg-gray-100 ${typeof selectedOption === "object" &&
                    selectedOption !== null &&
                    (selectedOption as any)?.id === (option as any)?.id // eslint-disable-line @typescript-eslint/no-explicit-any
                    ? "text-blue-500 font-bold"
                    : ""
                    }`}
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
