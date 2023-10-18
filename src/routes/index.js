const AdminRoutes = {
  ADMINSIGNIN: "/admin-login",
  ADMINDASHBOARD: "/admin-dashboard",
  ADMINPOSTAPRODUCT: "post-product",
  ADMINADDCATEGORY: "add-category",
  ADMINALLCATEGORIES: "categories",
  ADMINADDSUBCATEGORY: "add-subCategory",
  ADMINALLSUBCATEGORIES: "SubCategories",
  ADMINPRODUCTSUPDATEDELETEGETLIST: "admin-productLists",
};

const ROUTES = {
  LANDINGPAGE: "/",
  ABOUTUS: "/about-us",
  CONTACTUS: "/contact-us",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCTS: "/products",
  SINGLEPRODUCT: "/products/:productId",
  PRODUCTORDER: "/checkout/order-recieved",
  CHECKOUT: "/checkout/",
  PRIVACYPOLICY: "/privacy-policy",
  FAQ: "/faq",
  TERMSANDCONDITIONS: "/terms-&-conditions",
  MYACCOUNT: "/my-account",
  PRODUCTCARTLIST: "/carts",
  WISHLISTS: "/wishlists",
  ...AdminRoutes
};

export default ROUTES;
