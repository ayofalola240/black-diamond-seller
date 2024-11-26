// "use server";

import { createAxiosClient } from "@/lib/api";
import { formatError } from "@/lib/utils";

// import { formatError } from "@/lib/utils";
// import { cookies } from "next/headers";
// import { createAxiosClient } from "@/lib/api";

// const setCookie = (cookieHeaders: string[] | undefined) => {
//   const cookieStore = cookies();
//   if (cookieHeaders) {
//     cookieHeaders.forEach((cookie: string) => {
//       const [cookieName, ...rest] = cookie.split("=");
//       const [cookieValue, ...options] = rest.join("=").split(";");

//       const parsedOptions: {
//         [key: string]: string | boolean | number | Date | undefined;
//       } = {};

//       options.forEach((opt) => {
//         const [key, value] = opt.trim().split("=");
//         const lowercaseKey = key.toLowerCase();

//         if (lowercaseKey === "max-age") {
//           parsedOptions.maxAge = parseInt(value);
//         } else if (lowercaseKey === "expires") {
//           parsedOptions.expires = new Date(value);
//         } else if (lowercaseKey === "path") {
//           parsedOptions.path = value;
//         } else if (lowercaseKey === "httponly") {
//           parsedOptions.httpOnly = true;
//         } else if (lowercaseKey === "secure") {
//           parsedOptions.secure = true;
//         } else if (lowercaseKey === "samesite") {
//           parsedOptions.sameSite = value;
//         }
//       });

//       cookieStore.set(cookieName, cookieValue, parsedOptions);
//     });
//   }
// };

// export async function logout() {
//   try {
//     cookies().delete("blackDiamondMerchant");
//     cookies().delete("session.sig");
//     cookies().delete("session");
//     return { message: "success" };
//   } catch (error: any) {
//     return {
//       error: formatError(error),
//     };
//   }
// }

// export async function login(values: any) {
//   try {
//     const client = createAxiosClient();
//     const res = await client.post("/auth/login", values);
//     return res;
//     return { message: "success" };
//   } catch (error: any) {
//     return {
//       error: formatError(error),
//     };
//   }
// }
