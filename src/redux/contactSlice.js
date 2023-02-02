import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

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