import { Role } from '@/types/enum';
import { createSlice } from '@reduxjs/toolkit';

export interface UserSlice {
    _id: string
    email: string;
    age: number;
    address: string;
    role: Role;
    tokenVersion: number;
    apiKey: string;
    money: number;
    phonenumber: string;
    access_token: string
}
const initialState: UserSlice = {
    _id: "",
    email: "",
    age: 0,
    address: "",
    role: Role.user,
    tokenVersion: 0,
    money: 0,
    apiKey: "",
    access_token: "",
    phonenumber: ""
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                id,
                email,
                age,
                address,
                role,
                tokenVersion,
                money,
                apiKey,
                phonenumber,
                access_token
            } = action.payload;
            state._id = id;
            state.email = email;
            state.address = address;
            state.age = age;
            state.role = role;
            state.tokenVersion = tokenVersion;
            state.access_token = access_token;
            state.money = money,
                state.apiKey = apiKey
            state.phonenumber = phonenumber
        },
        resetUser: (state) => {
            state._id = "";
            state.email = "";
            state.age = 0;
            state.address = "";
            state.role = Role.user;
            state.tokenVersion = 0;
            state.access_token = ""
            state.money = 0,
                state.apiKey = ""
            state.phonenumber = ""
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
