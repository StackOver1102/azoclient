import { DataForm } from "@/pages/addfunds";

interface Props {
  data: DataForm;
}
export default function MoMo(props: Props) {
  const { code } = props.data;
  const QR = `https://momosv3.apimienphi.com/api/QRCode?phone=0985822626&amount=0&note=${code}`;

  return (
    <>
      <div className="mb-5 text-sm mt-3">
        <ul className="list-disc ml-8">
          <li>Lưu ý ghi chính xác nội dung chuyển tiền bên dưới.</li>
          <li className="mb-3">Tỉ giá 1$ = 23,000VND</li>
        </ul>
        <p>
          <em style={{ color: "rgb(230, 0, 0)" }} className="text-sm ">
            Hệ thống tự động cập nhật trong vài giây. Nếu quá 5 phút không được
            cập nhật, vui lòng liên hệ ADMIN.
          </em>
        </p>
      </div>
      <div className={"text-center lg:pl-[40%]"}>
        <img src={QR} className="w-[250px] mb-5 " />
      </div>
    </>
  );
}
