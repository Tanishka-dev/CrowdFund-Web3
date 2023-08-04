import {
   createCampaign,
   dashboard,
   logout,
   payment,
   profile,
   withdraw,
} from "../assets";

export const navlinks = [
   {
      name: "dashboard",
      imgUrl: dashboard,
      link: "/",
   },
   {
      name: "logout",
      imgUrl: logout,
      link: "/",
   },
   {
      name: "payment",
      imgUrl: payment,
      link: "/",
   },
   {
      name: "profile",
      imgUrl: profile,
      link: "/",
   },
   {
      name: "withdraw",
      imgUrl: withdraw,
      link: "/",
   },
   {
      name: "campaign",
      imgUrl: campaign,
      link: "/",
   },
];
