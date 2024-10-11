import { RootState } from "@/redux/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface conterState {
    value: number;
}

const initialState: conterState = {
    value: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    },
});

export const { increment, decrement, incrementAmount } = counterSlice.actions;
export default counterSlice.reducer;


export const selectCount = (state: RootState) => state?.counter.value;
