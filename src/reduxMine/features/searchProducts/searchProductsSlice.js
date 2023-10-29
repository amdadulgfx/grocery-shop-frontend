import { api } from "../../api/api";

const searchProducts = api.injectEndpoints({
  endpoints: ((builder) => ({
      searchProductsList: builder.query({
          query: (({categories}) => ({
              url: `product/searchProduct?searchTerm=${categories?.categoryIds?.join(",")}`,
              method: "GET",
              headers: {
                  authorization: `${localStorage.getItem('accessToken')}`,
              },
          })),
          invalidatesTags: ["searchProducts"],
      }),
  })),
});

export const {useSearchProductsListQuery} = searchProducts