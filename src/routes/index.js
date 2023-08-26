const AdminRoutes = {
  ADMINSIGNIN: "/admin-login",
  ADMINDASHBOARD: "/admin-dashboard",
  ADMINPOSTAPRODUCT: "/post-product",
  ADMINADDCATEGORY: "/Add-Category",
  ADMINALLCATEGORIES: "/categories",
  ADMINADDSUBCATEGORY: "/add-subCategory",
  ADMINALLSUBCATEGORIES: "/SubCategories",
};

const ROUTES = {
  LANDINGPAGE: "/",
  ABOUTUS: "/about-us",
  CONTACTUS: "/contact-us",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCTS: "/products",
  SINGLEPRODUCT: "/single-product",
  PRIVACYPOLICY: "/privacy-policy",
  FAQ: "/faq",
  TERMSANDCONDITIONS: "/terms-&-conditions",
  ...AdminRoutes
};




export default ROUTES;
