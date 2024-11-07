import SelectDropdown from "@/components/Select/Select";
import { useMutationHooks } from "@/hooks/useMutationHook";
import OrderService, { BodyCreateOrder } from "@/services/OrderService";
import ProductService, {
  Product,
  ResponseProduct,
} from "@/services/ProductService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import { ApiError } from "@/services/UserService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/Loading/Loading";
import { useUserDetail } from "@/hooks/fetch/useUserDetail";
import { CustomError } from "@/commons/req";
import withAuth from "@/libs/wrapAuth/warpAuth";
import Image from "next/image";

type Props = {
  error: ApiError | null;
  token: string | null;
  isLayout: boolean
  detailProduct?: Product | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const token = context.req.cookies.access_token;
  const { service } = context.query;

  // Redirect unauthenticated users to the signin page
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  let detailProduct: Product | null = null;

  // Only fetch product details if 'service' is provided
  if (service) {
    try {
      const response = await ProductService.getDetail(service as string);
      detailProduct = response.data
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      // You might still set an error prop here if necessary, but we skip it to proceed silently
    }
  }

  return {
    props: {
      error: null,
      token,
      isLayout: true,
      detailProduct
    },
  };
};

const NewOrder = (props: Props) => {
  const { error, token, detailProduct } = props;
  const router = useRouter();

  useEffect(() => {
    if (!token || error?.status === 401) {
      // Show error toast message and redirect
      showErrorToast(
        "Unauthorized: Invalid or expired token, please login again"
      );
      Cookies.remove("access_token");
      router.push("/signin");
    }
  }, [token, error, router]);

  const [platforms, setPlatforms] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [service, setService] = useState<Product[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resetSelected, setResetSelected] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [link, setLink] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: ProductService.fetchProducts,
  });

  const { data: user } = useUserDetail(token!);

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

      setCategory(Array.from(categorySet));
      setService(Array.from(productSet));

      if (categorySet.size > 0) {
        setSelectedCategory(Array.from(categorySet)[0]);
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

      if(detailProduct){
        setProduct(detailProduct)
      }
      else if (serviceArray.length > 0) {
        setProduct(serviceArray[0]); // Chọn giá trị service đầu tiên
      }
    }
  }, [data, selectedPlatform, selectedCategory, detailProduct]);

  const handleSelect = (selected: string | null) => {
    console.log("🚀 ~ handleSelect ~ selected:", selected);
    // setSelectedPlatform(selected);
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
  const queryClient = useQueryClient();

  const mutation = useMutationHooks(
    async ({
      userData,
      token,
    }: {
      userData: BodyCreateOrder;
      token: string;
    }) => {
      try {
        return await OrderService.createOrder(userData, token);
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
        queryClient.refetchQueries({ queryKey: ["cashflows", token] });
        queryClient.invalidateQueries({ queryKey: ["userDetail", token] });
        queryClient.invalidateQueries({ queryKey: ["orders", token] });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!product || !link || !quantity) {
      showErrorToast("Please fill in both fields.");
      return;
    }

    const totalMoney = quantity * product.rate;

    if (user && totalMoney > user.money) {
      showErrorToast(
        `You do not have enough money. Your balance: ${user.money}, required: ${totalMoney}.`
      );
      return;
    }

    const data = {
      service: product.value,
      link,
      quantity,
    };

    try {
      if (!token) return;
      await mutation.mutateAsync({ userData: data, token });
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      // showErrorToast(`Login failed: ${error.message}`);
    }
  };

  return (
    <>
      {(isLoading || showLoader) ? (
        <Loading />
      ) : (
        <>
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
                      image={true}
                      detailData={detailProduct}
                      type="platforms"

                    // resetSelected={resetSelected}
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
                      image={true}
                      detailData={detailProduct}
                      type="category"

                    // resetSelected={resetSelected}
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
                    image={true}
                    detailData={detailProduct}
                    type="service"

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
                <Image
                  src="https://cdn.mypanel.link/sw177w/3y6jfcfgmm14jned.gif"
                  className="w-10 h-10 "
                  alt="icon"
                  width={24}
                  height={24}
                />
                <h2 className="text-xl font-bold text-blue-500 text-center flex-1">
                  {product?.label}
                </h2>
              </div>
              {/* Khung 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-cyan-300">
                <h2 className="text-xl font-semibold mb-4">⚠️ Note:</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.description ?? "",
                  }}
                />
              </div>
            </div>
          </div>

        </>
      )}
    </>
  );
};

export default withAuth(NewOrder);
