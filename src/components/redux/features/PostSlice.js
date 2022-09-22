import {createAsyncThunk,createSlice}  from "@reduxjs/toolkit"

export const getPost=createAsyncThunk('post/getPost',
async({id})=>{
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res=>res.json())
}
)
export const deletePost=createAsyncThunk('post/deletepost',
async({id})=>{
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method:"DELETE"
    }).then(res=>res.json())
}
)
export const createpost=createAsyncThunk('post/createpost',
async({values})=>{
    return fetch(`https://jsonplaceholder.typicode.com/posts`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            title:values.title,
            body:values.body
        })
    }).then(res=>res.json())
}
)
export const updatepost=createAsyncThunk('post/updatepost',
async({id,title,body})=>{
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            title,
            body
        })
    }).then(res=>res.json())
}
)
const PostSlice=createSlice({
    name:"post",
    initialState:{
        loading:false,
        post:[],
        error:null,
        edit:false
    },
    reducers:{
    setEdit:(state,action)=>{
   state.body=action.payload.body
   state.edit=action.payload.edit
    },
    },
   extraReducers :{
        [getPost.pending]:(state,action)=>{
            state.loading=true;
        },
        [getPost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.post=[action.payload]
        },
        [getPost.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        [deletePost.pending]:(state,action)=>{
            state.loading=true;
        },
        [deletePost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.post=action.payload
        },
        [deletePost.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },[createpost.pending]:(state,action)=>{
            state.loading=true;
        },
        [createpost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.post=[action.payload]
        },
        [createpost.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        [updatepost.pending]:(state,action)=>{
            state.loading=true;
        },
        [updatepost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.post=[action.payload]
        },
        [updatepost.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
    }
})
export default PostSlice.reducer;
export const {setEdit}=PostSlice.actions