const AdminRoutes = {
  ADMINSIGNIN: "/admin-login",
  ADMINDASHBOARD: "/admin-dashboard",
  ADMINPOSTAPRODUCT: "/post-product",
  ADMINADDCATEGORY: "/Add-Category",
  ADMINALLCATEGORIES: "/categories",
  ADMINADDSUBCATEGORY: "/add-subCategory",
  ADMINALLSUBCATEGORIES: "/SubCategories",
  ADMINPRODUCTSUPDATEDELETEGETLIST : "/admin-productLists",
};

const ROUTES = {
  LANDINGPAGE: "/",
  ABOUTUS: "/about-us",
  CONTACTUS: "/contact-us",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCTS: "/products",
  SINGLEPRODUCT: "/single-product",
  PRODUCTORDER: "/checkout/order-recieved",
  PRIVACYPOLICY: "/privacy-policy",
  FAQ: "/faq",
  TERMSANDCONDITIONS: "/terms-&-conditions",
  MYACCOUNT: "/my-account",
  PRODUCTCARTLIST: "Cart-lists",
  ...AdminRoutes
};

export default ROUTES;
