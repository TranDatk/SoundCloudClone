import PaymentComponent from "@/components/payment/payment.component";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Thực hiện thanh toán',
    description: 'mô tả',
}

const PaymentPage = () => {
    return (
        <PaymentComponent />
    );
}

export default PaymentPage;