import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Table from "@/components/Table/Table";
import { TypeHearder } from "@/types/enum";

const Order = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        {/* <Header
          logo="/images/logo4.png"
          userInfo={userLogin}
          type={TypeHearder.OTHE}
        /> */}
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
