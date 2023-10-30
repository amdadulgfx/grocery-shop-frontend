import { api } from "../../api/api";

const searchProductsApi = api.injectEndpoints({
    endpoints: ((builder) => ({
        searchProductsList: builder.mutation({
            query: (({keyword, categories, statuses, brands, price, sortBy, sortOrder}) => ({
                // searchTerm=${keyword}&
                // category=${categories}&
                // brands=${brands}&
                // statuses=${statuses}&
                // price=${price}&
                // sortBy=${sortBy}&
                // sortOrder=${sortOrder}
                    // url: `product/searchProduct?searchTerm=${keyword}${categories?.map((id)=> `&category=${id}`)?.join("") || ""} ${statuses.map((value)=> `&${value}`)?.join("") || ""}${brands.map((brand)=> `&brand=${brand}`).join("") || ""}`,
                    url: `product/searchProduct?searchTerm=${keyword?.length > 0 ? keyword : "27"}${categories?.map((id)=> `&category=${id}`)?.join("") || ""}${statuses?.map((value)=> `&${value}=1`)?.join("") || ""}${brands?.map((brand)=> `&brand=${brand?.replace(/ /g, "+")?.replace(/&/g, "%26")}`)?.join("") || ""}`,
                    method: "GET",
                    headers: {
                        authorization: `${localStorage.getItem('accessToken')}`,
                    },
                })),
            invalidatesTags: ["searchProducts"],
        }),
    })),
});

export const { useSearchProductsListMutation } = searchProductsApi;