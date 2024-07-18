import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CancelComponent from '@/components/payment/cancel.component';
import { sendRequest } from '@/utils/api';
import { getServerSession } from 'next-auth';

const CancelPage = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
    const session = await getServerSession(authOptions)

    if (searchParams?.status === 'CANCELLED') {
        const resPayment = await sendRequest<IBackendRes<ICancelPaymentResponse>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/${searchParams?.orderCode}`,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
            nextOption: {
                next: { tags: ['payment'] }
            }
        });
    }
    return (
        <CancelComponent />
    );
};

export default CancelPage;
