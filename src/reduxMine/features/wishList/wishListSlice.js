import { api } from "../../api/api";

const wishListSlice = api.injectEndpoints({
    endpoints: ((builder) => ({
        addToWishList: builder.mutation({
            query: ((productId) => ({
                url: `api/v1/wishList`,
                method: "POST",
                body: {productId : productId},
                headers: {
                    authorization: `${localStorage.getItem('accessToken')}`,
                },
            })),
            invalidatesTags: ["wishList"],
        }),
        getWishList: builder.query({
            query: (() => ({
                url: `/api/v1/wishList`,
                headers: {
                    authorization: `${localStorage.getItem('accessToken')}`,
                },
            })),
            providesTags: ["wishList"]
        }),
        deleteFromWishList: builder.mutation({
            query: ((productId) => ({
                url: `/api/v1/wishList/${productId}`,
                method: "DELETE",
                headers: {
                    authorization: `${localStorage.getItem('accessToken')}`
                }
            })),
            invalidatesTags: ["wishList"]
        })
    })),
});

export const { useAddToWishListMutation, useDeleteFromWishListMutation, useGetWishListQuery } = wishListSlice;