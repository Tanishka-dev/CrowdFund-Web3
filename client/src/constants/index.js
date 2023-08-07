import { createCampaign, dashboard, logout, profile } from "../assets";

export const navlinks = [
   {
      name: "dashboard",
      imgUrl: dashboard,
      link: "/dashboard",
   },
   {
      name: "logout",
      imgUrl: logout,
      link: "/logout",
   },
   {
      name: "profile",
      imgUrl: profile,
      link: "/profile",
   },
   {
      name: "campaign",
      imgUrl: createCampaign,
      link: "/create-campaign",
   },
];
