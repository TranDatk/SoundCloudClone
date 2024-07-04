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


    interface backendResponse {
        access: string;
        refresh: string;
        user: IUser;
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

    interface IComment extends Itembase {
        comment_text: string;
        moment: number;
        user: IUser;
        fk_tracks: ITrack;
        created_date: string;
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
        tracks: ITrack[];
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


    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface IShareTrack extends ITrack {
        isPlaying: boolean;
    }

    interface ITrackContext {
        currentTrack: IShareTrack;
        setCurrentTrack: (track: IShareTrack) => void;
    }
}
