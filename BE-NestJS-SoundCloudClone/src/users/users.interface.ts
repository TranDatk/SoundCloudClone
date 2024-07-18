import mongoose from "mongoose";

export interface IUser {
    _id: string;
    avatar: string;
    name: string;
    email: string;
    role: {
        _id: string;
        name: string;
    };
    permissions?: {
        _id: string;
        name: string;
        apiPath: string;
        module: string;
    }[];
    type: string;
}