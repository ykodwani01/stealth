import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_URL = 'http://localhost:8000/api';
export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    bookSlot: builder.mutation<void, { gameId: string; people: number; time: string; date: string }>({
      query: ({ gameId, people, time, date }) => ({
        url: `/book/${gameId}`,
        method: 'POST',
        body: { people, time, date },
      }),
    }),
  }),
});

export const { useBookSlotMutation } = bookingApi;