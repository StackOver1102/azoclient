import React, { useCallback, useEffect, useState } from "react";
import Badge from "../Badge/Badge";
import DateRangePickerComponent from "../DatePick/DateRangePickerComponent";
import { Orders } from "@/services/OrderService";
import dayjs from "dayjs";
import SelectDropdown from "../Select/Select";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useMutationHooks } from "@/hooks/useMutationHook";
import RefillService from "@/services/RefillService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import { CustomError } from "@/commons/req";
import { useRouter } from "next/router";
import Loading from "../Loading/Loading";

type Props = {
  data: Orders[];
  token: string | null;
};

const StatusSelect = [
  "Pending",
  "Processing",
  "In progress",
  "Completed",
  "Partial",
  "Canceled",
];

const SearchSelect = ["Orders Id", "Links", "Service"];

export default function Table(props: Props) {
  const { data, token } = props;

  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filterStatus, setFilterStatus] = useState<string | null>("");
  const [searchType, setSearchType] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số mục trên mỗi trang
  const [currentItems, setCurrentItems] = useState<Orders[]>([]);
  const router = useRouter();
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ start, end });
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  const handleSelect = (selected: string | null) => {
    setFilterStatus(selected);
    setCurrentPage(1);
  };

  const handleSearchTypeChange = (selectedType: string | null) => {
    setSearchType(selectedType);
  };

  const handleSearchKeywordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang đầu tiên khi thực hiện tìm kiếm
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const mutation = useMutationHooks(
    async ({ orderId, token }: { orderId: string[]; token: string }) => {
      try {
        return await RefillService.createRefill(orderId, token);
      } catch (error) {
        throw error;
      }
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: () => {
        setShowLoader(false);
        // queryClient.refetchQueries({ queryKey: ["cashflows", token] });
        // queryClient.invalidateQueries({ queryKey: ["userDetail", token] });
        showSuccessToast("Create order successful");
      },
      onError: (error: CustomError) => {
        if (error.status) {
          const statusCode = error.status;
          const message = error.data.error;
          if (statusCode === 400) {
            showErrorToast(`${message}.`);
          } else if (statusCode === 401) {
            showErrorToast("Unauthorized: You need to log in again.");
            // persistor.purge();
            router.push("/signin");
          } else if (statusCode === 500) {
            showErrorToast("The server is busy, please try again later.");
          } else {
            showErrorToast(
              `An error occurred: ${error.message || "Unknown error"}`
            );
          }
        } else {
          showErrorToast("The server is busy, please try again later.");
        }
      },
      onSettled: () => {
        setShowLoader(false);
      },
    }
  );

  // Hàm lọc dữ liệu
  const filterData = useCallback(() => {
    let filtered = data;

    // Lọc theo trạng thái
    if (filterStatus) {
      filtered = filtered.filter((item) => item.orderStatus === filterStatus);
    }

    // Lọc theo phạm vi ngày
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(dateRange.end);
      endDate.setHours(0, 0, 0, 0);

      filtered = filtered.filter((item) => {
        const createdAt = new Date(item.createdAt);
        createdAt.setHours(0, 0, 0, 0);
        return createdAt >= startDate && createdAt <= endDate;
      });
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchType && searchKeyword) {
      filtered = filtered.filter((item) => {
        if (searchType === "Orders Id") {
          return item.orderItems.order?.includes(searchKeyword);
        }
        if (searchType === "Links") {
          return item.orderItems.link.includes(searchKeyword);
        }
        if (searchType === "Service") {
          return item.orderItems.name
            ?.toLowerCase()
            .includes(searchKeyword.toLowerCase());
        }
        return true;
      });
    }

    return filtered;
  }, [data, filterStatus, dateRange, searchType, searchKeyword]);

  // Cập nhật dữ liệu hiển thị mỗi khi dữ liệu hoặc bộ lọc thay đổi
  useEffect(() => {
    const filtered = filterData();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setCurrentItems(filtered.slice(indexOfFirstItem, indexOfLastItem));
  }, [filterData, currentPage, itemsPerPage]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        // Bỏ chọn nếu đã có trong danh sách
        return prev.filter((item) => item !== id);
      } else {
        // Thêm vào danh sách nếu chưa có
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Chọn tất cả
      const allIds = currentItems.map((item) => item._id);
      setSelectedItems(allIds);
    } else {
      // Bỏ chọn tất cả
      setSelectedItems([]);
    }
  };

  const handleCopyID = () => {
    navigator.clipboard.writeText(selectedItems.join(", "));
    alert("Copied IDs: " + selectedItems.join(", "));
  };

  const handleRefill = async () => {
    try {
      if (!token) return;

      await mutation.mutateAsync({ orderId: selectedItems, token });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Filter Dropdown - 15% width */}
        {showLoader && <Loading />}
        <div className="relative">
          <SelectDropdown
            data={StatusSelect}
            badge={false}
            image={false}
            onSelect={handleSelect}
            className="fixed z-10 xl:w-[380px] w-[318px] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
            defaultLabel="Select a Service"
          />
        </div>

        {/* Second Filter Dropdown - 15% width */}
        <DateRangePickerComponent
          start={dateRange.start}
          end={dateRange.end}
          onDateChange={handleDateChange}
        />

        {/* Search Type Dropdown - 15% width */}
        <div className="relative">
          <SelectDropdown
            data={SearchSelect}
            onSelect={handleSearchTypeChange}
            badge={false}
            image={false}
            className="fixed z-10 xl:w-[380px] w-[318px] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
            defaultLabel="Select a Type"
          />
        </div>

        {/* Search Input with Search Button - Remaining space */}
        <div className="relative flex-grow">
          <input
            type="text"
            className="bg-white h-[42px] border border-gray-300 text-gray-700 py-2 px-4 w-full rounded leading-tight focus:outline-none focus:ring-blue-500"
            placeholder="Search"
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
          />
          <button
            className="absolute inset-y-0 right-0 bg-blue-500 px-3 flex items-center justify-center rounded-r text-white"
            onClick={handleSearch}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full table-fixed border-collapse shadow-sm rounded-lg text-sm">
        <tbody>
          <tr className="bg-gray-200 rounded-t-lg">
            <th colSpan={10} className="p-2 border-b border-gray-300">
              <div className="flex items-center space-x-2">
                <input
                  className="h-4 w-4 cb-all"
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedItems.length === currentItems.length &&
                    currentItems.length > 0
                  }
                />
                {selectedItems.length > 0 ? (
                  <>
                    <p className="text-sm">
                      {selectedItems.length} row(s) selected
                    </p>
                    <button
                      onClick={handleCopyID}
                      className="bg-blue-500 text-white px-4 py-1 rounded text-xs"
                    >
                      Copy ID
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-1 rounded text-xs" onClick={handleRefill}>
                      Refill
                    </button>
                  </>
                ) : (
                  <label className="ml-2 text-xs text-gray-600">
                    Select All
                  </label>
                )}
              </div>
            </th>
          </tr>

          {currentItems.length > 0 ? (
            currentItems.map((item: Orders, index) => (
              <tr className="bg-white hover:bg-gray-50 border-b" key={index}>
                <td className="border-t border-gray-300 p-2 w-[10%]">
                  <div className="flex items-center whitespace-nowrap">
                    <input
                      className="h-4 w-4 cb-all"
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() =>
                        handleCheckboxChange(item._id)
                      }
                    />
                    <span className="font-bold text-gray-700 text-sm pl-2 truncate">
                      ID: {item.orderItems.order}
                    </span>
                  </div>
                  <p className="m-0 font-bold text-blue-500 text-sm">
                    <span className="text-[#009ef7] whitespace-nowrap">
                      {item.orderStatus}
                    </span>
                  </p>
                  <p className="m-0 text-xs text-gray-500">
                    {dayjs(new Date(item.createdAt)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                  <p className="m-0 text-xs text-gray-500">
                    {dayjs(new Date(item.updatedAt)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </td>

                {/* Middle column - this will automatically fill the remaining width */}
                <td className="border-t border-gray-300 p-2">
                  <div>
                    <p className="m-0 text-gray-700 flex items-center text-sm truncate">
                      <Image
                        src="https://cdn.mypanel.link/4cgr8h/ewzs0f9k8ic2932y.gif"
                        className="w-3 h-3 mr-2"
                        alt="logo"
                        width={12}
                        height={12}
                      />
                      <span className="text-gray-800 font-bold truncate mr-1">
                        {item.orderItems.order}
                      </span>
                      | {item.orderItems.name}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge badges={item.orderItems.badges || []} />
                    </div>
                    <p className="mt-1 text-xs break-words">
                      <React.Fragment key={index}>
                        {item.orderItems.link
                          .split("\n")
                          .map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link}
                              className="text-[#009ef7] truncate block overflow-hidden whitespace-nowrap text-ellipsis max-w-xs"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link}
                            </a>
                          ))}
                      </React.Fragment>
                    </p>
                  </div>
                  <div className="text-right">
                    <Link
                      href="/new?service=2198"
                      className="text-blue-500 font-bold mr-2 text-xs whitespace-nowrap"
                    >
                      Reorder
                    </Link>
                    <Link
                      href="#"
                      className="text-red-500 font-bold text-xs whitespace-nowrap"
                    >
                      Report
                    </Link>
                  </div>
                </td>

                {/* Last column - 10% width */}
                <td className="border-t border-gray-300 p-2 w-[10%]">
                  <p className="font-bold text-sm">
                    <span className="text-gray-600">Charge:</span>
                    <Link
                      href="/cashflow?id=19785587"
                      className="text-blue-500"
                    >
                      $ {item.charge}
                    </Link>
                  </p>
                  <p className="font-bold text-sm">
                    <span className="text-gray-600">Quantity:</span>{" "}
                    {item.orderItems.quantity}
                  </p>
                  <p className="font-bold text-sm">
                    <span className="text-gray-600">Start count:</span>{" "}
                    {item.start_count}
                  </p>
                  <p className="font-bold text-sm">
                    <span className="text-gray-600">Remains:</span>{" "}
                    {item.remains}
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-4 text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
}
