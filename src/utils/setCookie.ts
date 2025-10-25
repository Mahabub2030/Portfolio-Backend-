// import { Response } from "express";

// export const setAuthCookie = (res: Response, accessToken: string) => {
//   if (accessToken) {
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "none",
//     });
//   }
// };

// import Cookies from "js-cookie";

// Cookies.set("accessToken", result.data.accessToken, {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
// });
