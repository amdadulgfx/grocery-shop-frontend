import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URI}` }),
  tagTypes: ['authUser', 'getTeams', 'cart', 'wishList', "searchProducts"],
  endpoints: () => ({}),
});