import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    bookSlot: builder.mutation<void, string>({
      query: (gameId) => ({
        url: `/book/${gameId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useBookSlotMutation } = bookingApi;