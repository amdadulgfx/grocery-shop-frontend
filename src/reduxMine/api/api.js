import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// http://localhost:5000

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['authUser', 'getTeams'],
  endpoints: () => ({}),
});