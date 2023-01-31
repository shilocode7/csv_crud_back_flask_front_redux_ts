import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Dimonds } from '../../models/Dimond';
import { getDimonds,addDimond,updDimond} from './dimondAPI';

export interface DimondsState {
    dimonds: Dimonds[]
    updateFlag:boolean
}

const initialState: DimondsState = {
    dimonds: [],
    updateFlag: false
};

export const getDimondsAsync = createAsyncThunk(
    'student/getDimonds',
    async () => {
        const response = await getDimonds();
        return response.data;
    }
);


export const updDimondAsync = createAsyncThunk(
    'student/updStudent',
    async (new_dimondt: Dimonds) => {
        const response = await updDimond(new_dimondt);
        return response.data;
    }
);
export const addDimondAsync = createAsyncThunk(
    'student/addDimond',
    async (new_dimondt: Dimonds) => {
        const response = await addDimond(new_dimondt);
        return response.data;
    }
);



export const dimondSlice = createSlice({
    name: 'dimonds',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getDimondsAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                //   state.status = 'idle';
                  state.dimonds = action.payload;
            }) .addCase(addDimondAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                //   state.status = 'idle';
                  state.dimonds.push( action.payload);
            }) .addCase(updDimondAsync.fulfilled, (state, action) => {
                // console.log(action.payload)
                //   state.status = 'idle';
                  state.updateFlag =! state.updateFlag;
            });

    },
});

export const { } = dimondSlice.actions;
export const selectDimonds = (state: RootState) => state.dimond.dimonds
export const selectUpdate = (state: RootState) => state.dimond.updateFlag
export default dimondSlice.reducer;
