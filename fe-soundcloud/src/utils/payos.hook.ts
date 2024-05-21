import { PayOSConfig } from "payos-checkout";

export const payOSConfig: PayOSConfig = {
    RETURN_URL: "http://localhost:3000", // required
    ELEMENT_ID: "", // required
    CHECKOUT_URL: "", // required
    onSuccess: (event: any) => {
      //TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
    },
    onCancel: (event: any) => {
      //TODO: Hành động sau khi người dùng Hủy đơn hàng
    },
    onExit: (event: any) => {
      //TODO: Hành động sau khi người dùng tắt Pop up
    }
  };