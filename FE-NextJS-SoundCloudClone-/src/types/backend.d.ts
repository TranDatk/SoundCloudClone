import { IUser } from "./next-auth";

export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IGenre {
        _id: string;
        name: string;
        description: string;
    }

    interface Itembase {
        _id: string;
    }

    interface ITrack extends Itembase {
        genre: IGenre;
        user: IUser;
        description: string;
        photo: string;
        title: string;
        url: string;
        like: number;
        view: number;
    }

    interface IVerify {
        isVerify: boolean;
        message: string;
    }

    interface IComment extends Itembase {
        commentText: string;
        moment: number;
        user: IUser;
        track: ITrack;
        createdAt: string;
    }

    interface IFollow {
        isFollow: boolean;
    }

    interface ILike extends Itembase {
        like: boolean;
        user: IUser;
        track: ITrack;
    }

    interface IPlaylist extends Itembase {
        title: string;
        description: string;
        status: boolean;
        track: ITrack[];
        user: IUser;
    }

    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IUserBackend {
        access_token: string;
        refresh_token: string;
        user: IUser;
    }

    interface IPayment {
        status: string;
        orderCode: string;
        user: IUser;
    }


    interface ICreatePaymentResponse {
        bin: string;
        checkoutUrl: string;
        accountNumber: string;
        accountName: string;
        amount: number;
        description: string;
        orderCode: number;
        qrCode: string;
    }

    interface ICancelPaymentResponse {
        id: string;
        orderCode: number;
        amount: number;
        amountPaid: number;
        amountRemaining: number;
        status: string;
        createdAt: Date;
        transactions: string[];
        canceledAt: Date;
        cancellationReason: string;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        results?: T;
    }

    interface IShareTrack extends ITrack {
        isPlaying: boolean;
    }

    interface ITrackContext {
        currentTrack: IShareTrack;
        setCurrentTrack: (track: IShareTrack) => void;
    }


    interface IShareUser extends IUser {
        isPrenium: boolean;
        haveUserAccessed: boolean;
    }

    interface IUserContext {
        currentUser: IShareUser;
        setCurrentUser: (user: IShareUser) => void;
    }
}
