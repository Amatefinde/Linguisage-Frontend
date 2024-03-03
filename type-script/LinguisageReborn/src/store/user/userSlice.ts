import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import UserData from "../../types/UserInterface.ts";


interface UserState {
    last_book_id: number | null,
    userData: UserData | null,
}


const initialState: UserState = {
    last_book_id: null,
    userData: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserData>) => {state.userData = action.payload},
        logOut: (state) => {state.userData = null},
    },
})

export const {setUser, logOut} = userSlice.actions;
export default userSlice.reducer;