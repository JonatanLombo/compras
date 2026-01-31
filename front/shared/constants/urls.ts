export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export const SignUpURL = new URL("signup", BaseURL);

export const LoginURL = new URL("login", BaseURL);

export const CategoriesURL = new URL("categories", BaseURL);


