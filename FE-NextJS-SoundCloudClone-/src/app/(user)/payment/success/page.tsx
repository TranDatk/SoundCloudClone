import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SuccessComponent from '@/components/payment/success.component';
import { sendRequest } from '@/utils/api';
import { getServerSession } from 'next-auth';

const SuccessPage = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
    const session = await getServerSession(authOptions);
    let status = '';

    if (searchParams?.status === 'PAID') {
        const resPayment = await sendRequest<IBackendRes<IPayment>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/check/${searchParams?.orderCode}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
            nextOption: {
                next: { tags: ['payment'] }
            }
        });
        if (resPayment?.data) {
            status = resPayment?.data?.status ?? '';
        }
    }
    return (
        <SuccessComponent status={status} />
    );
};

export default SuccessPage;


