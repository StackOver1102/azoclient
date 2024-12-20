import ProductService, { ResponseProduct } from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Badge from "@/components/Badge/Badge";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import Image from "next/image";
export interface Badges {
  label: string;
  bg: string;
  text: string;
}
type Props = {
  token: string | null;
};
function Table(props: Props) {
  const { token } = props;
  const { data, isLoading } = useQuery({
    queryKey: ["product", token],
    queryFn: async () => {
      return await ProductService.fetchProducts();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  return (
    <table className="min-w-full table-fixed border-collapse">
      <tbody>
        {data?.map((item: ResponseProduct) => (
          <>
            {/* First Row */}
            <tr className="bg-gray-100" key={item._id}>
              <td colSpan={10} className="text-xl font-bold whitespace-nowrap">
                <div className="flex items-center">
                  <Image
                    src={
                      item._id.includes("Tiktok")
                        ? "https://cdn.mypanel.link/4cgr8h/ewzs0f9k8ic2932y.gif"
                        : "https://cdn.mypanel.link/sw177w/3y6jfcfgmm14jned.gif"
                    }
                    className="mr-2"
                    width={24}
                    height={24}
                    alt="icon"
                  />
                  <div className="flex flex-col tracking-wide">{item._id}</div>
                </div>
              </td>
            </tr>

            {/* Service Row */}
            {item.products.map((product, index) => {
              return (
                <tr
                  className="service hover:bg-[#E4E6EF] border-b border-b-dashed hover:border-gray-300"
                  key={index}
                >
                  <td className="pl-4 w-full lg:w-1/2 min-w-[250px] whitespace-nowrap">
                    <div className="flex items-center ml-1">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <div className="wrap">
                            <a className="mr-1" href="#" aria-label="Favorite">
                              <i
                                className="fa-regular fa-star"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <span className="font-bold mr-1 tracking-wide">
                              {product.value}
                            </span>
                            - {product.label}
                          </div>
                        </div>
                        <span className="mt-1 space-x-1">
                          <Badge badges={product.badges} />
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-start min-w-[100px] whitespace-nowrap">
                    <span className="text-sm text-gray-500 text-start">
                      <span className="text-gray-800">{product.min}</span> -{" "}
                      <span className="text-gray-800">{product.max}</span>
                    </span>
                  </td>
                  <td
                    className={`text-center ${
                      token ? "min-w-[150px]" : ""
                    } whitespace-nowrap`}
                  >
                    <span className="text-gray-500">$ {product.rate}</span>
                  </td>
                  <td
                    className={`px-1 text-center font-bold min-w-[100px] ${
                      token ? "" : "hidden"
                    } `}
                  >
                    <Link
                      target="_blank"
                      href={`new?service=${product._id}`}
                      className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-sm py-1 px-4 whitespace-nowrap"
                    >
                      Order
                    </Link>
                  </td>
                </tr>
              );
            })}
          </>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
