import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentPost:null,
    loading:false,
    error:false,
    message:''
}


export const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        fetchPostStart:(state)=>{
            state.loading = true
        },
        fetchPostSuccess:(state, action)=>{
            state.loading = false
            state.currentPost = action.payload
        },
        fetchPostFailure:(state, action)=>{
            state.error = true
            state.loading = false
            state.message = action.payload
        },
        likeReducer:(state, action)=>{
            if(!state.currentPost.likedBy?.includes(action.payload)){
                state.currentPost.likedBy.push(action.payload);

                state.currentPost.dislikedBy.splice(
                    state.currentPost.dislikedBy.findIndex((userId) => userId === action.payload), 1
                )
            }
        },
        dislikeReducer:(state, action)=>{
            if(!state.currentPost.dislikedBy?.includes(action.payload)){
                state.currentPost.dislikedBy.push(action.payload);

                state.currentPost.likedBy.splice(
                    state.currentPost.likedBy.findIndex((userId) => userId === action.payload), 1
                )
            }
        }
    }
})

export const {
    fetchPostStart,
    fetchPostSuccess,
    fetchPostFailure,
    likeReducer,
    dislikeReducer
} = postSlice.actions

export default postSlice.reducer;