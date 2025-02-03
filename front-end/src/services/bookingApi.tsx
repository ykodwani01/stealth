import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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