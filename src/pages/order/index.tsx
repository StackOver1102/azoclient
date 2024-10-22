import Header from "@/components/Header/Header";
import SelectDropdown from "@/components/Select/Select";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { RootState } from "@/libs/redux/store";
import OrderService, { BodyCreateOrder } from "@/services/OrderService";
import ProductService, {
  Product,
  ResponseProduct,
} from "@/services/ProductService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import { TypeHearder } from "@/types/enum";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const userLogin = useSelector((state: RootState) => state.user);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [service, setService] = useState<Product[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resetSelected, setResetSelected] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [link, setLink] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<Boolean>(false);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: ProductService.fetchProducts,
  });

  // Lấy platform và set giá trị mặc định
  useEffect(() => {
    if (data) {
      const platformsSet = new Set<string>();

      data.forEach((entry: ResponseProduct) => {
        entry.products.forEach((product) => {
          platformsSet.add(product.platform);
        });
      });

      const platformArray = Array.from(platformsSet);
      setPlatforms(platformArray);

      if (platformArray.length > 0) {
        setSelectedPlatform(platformArray[0]); // Chọn giá trị platform đầu tiên
      }
    }
  }, [data]);

  // Lọc category dựa trên platform đã chọn và set giá trị mặc định
  useEffect(() => {
    if (data && selectedPlatform) {
      const categorySet = new Set<string>();
      const productSet = new Set<Product>();

      data.forEach((entry: ResponseProduct) => {
        const filteredProducts = entry.products.filter(
          (product) => product.platform === selectedPlatform
        );

        if (filteredProducts.length > 0) {
          categorySet.add(entry._id);
          filteredProducts.forEach((product) => productSet.add(product));
        }
      });

      const categoryArray = Array.from(categorySet);
      setCategory(categoryArray);
      setService(Array.from(productSet));

      if (categoryArray.length > 0) {
        setSelectedCategory(categoryArray[0]); // Chọn giá trị category đầu tiên
      }
    }
  }, [data, selectedPlatform]);

  // Lọc service dựa trên category và platform đã chọn
  useEffect(() => {
    if (data && selectedPlatform && selectedCategory) {
      const productSet = new Set<Product>();

      data.forEach((entry: ResponseProduct) => {
        if (entry._id === selectedCategory) {
          const filteredProducts = entry.products.filter(
            (product) => product.platform === selectedPlatform
          );

          filteredProducts.forEach((product) => productSet.add(product));
        }
      });

      const serviceArray = Array.from(productSet);
      setService(serviceArray);
      setResetSelected(false);

      if (serviceArray.length > 0) {
        setProduct(serviceArray[0]); // Chọn giá trị service đầu tiên
      }
    }
  }, [data, selectedPlatform, selectedCategory]);

  const handleSelect = (selected: string | null) => {
    setSelectedPlatform(selected);
  };

  const handleSelectCategory = (selected: string | null) => {
    if (service) {
      setService([]);
      setResetSelected(true);
    }
    setSelectedCategory(selected);
  };

  const handleSelectProduct = (selected: Product | string | null) => {
    setProduct(selected as Product);
  };

  const mutation = useMutationHooks(
    async (userData: BodyCreateOrder) => {
      return await OrderService.createOrder(userData);
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: () => {
        setShowLoader(false);
        showSuccessToast("Create order successful");
      },
      onError: () => {
        setShowLoader(false);
        showErrorToast("Create order Failed");
      },
      onSettled: () => {
        setShowLoader(false);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!userLogin.access_token){
      showErrorToast("Please login.");
      router.push("/signin")
      return
    }
    // Validate form
    if (!product || !link || !quantity) {
      showErrorToast("Please fill in both fields.");
      return;
    }
    
    const totalMoney = quantity * product.rate

    if(totalMoney > userLogin.money){
      showErrorToast(`You do not have enough money. Your balance: ${userLogin.money}, required: ${totalMoney}.`);
      return;
    }

    const data = {
      service: product.value,
      link,
      quantity
    };

    try {
      await mutation.mutateAsync(data);
    } catch (error: any) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      // showErrorToast(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Header
          logo="/images/logo4.png"
          userInfo={userLogin}
          type={TypeHearder.OTHE}
        />

        {/* New Order Heading */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-900">New order</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%,40%] p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[30%,70%]">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Social media
                  </label>
                  <SelectDropdown
                    badge={false}
                    data={platforms}
                    onSelect={handleSelect}
                    resetSelected={resetSelected}
                  />
                </div>
                <div className="xl:pl-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <SelectDropdown
                    badge={false}
                    data={category}
                    onSelect={handleSelectCategory}
                    resetSelected={resetSelected}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Service
                </label>
                <SelectDropdown
                  badge={true}
                  data={service}
                  onSelect={handleSelectProduct}
                  resetSelected={resetSelected}
                />
              </div>

              {/* Link Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Link
                </label>
                <textarea
                  placeholder="Enter your link"
                  className="w-full p-2 border border-gray-300 rounded-md resize-y" // Sử dụng resize-y để cho phép kéo dài chiều cao
                  rows={3} // Số dòng mặc định
                  onChange={(e) => setLink(e.target.value)}
                ></textarea>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder={`From ${product?.min} to ${product?.max}`}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  className="w-full p-3 bg-blue-600 text-white rounded-md"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4">
            {" "}
            {/* Sử dụng flexbox cho layout */}
            {/* Khung 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-blue-400 flex items-center">
              <img
                src="https://cdn.mypanel.link/sw177w/3y6jfcfgmm14jned.gif"
                className="w-10 h-10 "
                alt="icon"
              />
              <h2 className="text-xl font-bold text-blue-500 text-center flex-1">
                {product?.label}
              </h2>
            </div>
            {/* Khung 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-cyan-300">
              <h2 className="text-xl font-semibold mb-4">⚠️ Note:</h2>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
