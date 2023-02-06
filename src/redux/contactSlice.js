import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';
//////
axios.defaults.baseURL = "https://63dc3833a3ac95cec5b3798b.mockapi.io/contacts/";
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get("/tasks");
  return response.data;
});


async (_, thunkAPI) => {
  try {
    const response = await axios.get("/tasks");
    // При успішному запиті повертаємо проміс із даними
    return response.data;
  } catch (e) {
    // При помилці запиту повертаємо проміс
    // який буде відхилений з текстом помилки
    return thunkAPI.rejectWithValue(e.message);
  }
};
/////
export const fetchContacts = createAsyncThunk("contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const addContact = createAsyncThunk("contacts/addContact",
    async (newContact, thunkAPI) => {
        console.log("Алёна, а можно ли при кнопке submit на форме получить одним объектом значение всех полей формы, где ключом будет name (или что-то другое) инпута, а значением его value?")
        try {
            const res = await axios.post("/contacts", newContact)
            const {name, phone, id} = res.data
            return {name, phone, id}
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteContact = createAsyncThunk("contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const res = await axios.delete(`/contacts/${contactId}`);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
/////

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63dc3833a3ac95cec5b3798b.mockapi.io/contacts/',
  }),
  // tagTypes: ['Contact'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => 'contacts',
      providesTags: ['Contact'],
    }),
    getContactById: builder.query({
      query: contactId => `contacts/${contactId}`,
      providesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    createContact: builder.mutation({
      query: value => ({
        url: 'contacts',
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactsApi;

export const contactsFilterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: '',
  },
  reducers: {
    setFilter: (state, action) => void (state.value = action.payload),
  },
});

export const { setFilter } = contactsFilterSlice.actions;