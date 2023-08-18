import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { useDispatch } from "react-redux";
import { setTheme } from "../reducer";
const Icon = ({ styles, imgUrl, name, isActive, handleClick, isDark }) => {
   console.log(isDark);
   return (
      <div
         className={`w-[48px] h-[48px] rounded-[10px] cursor-pointer  ${
            isActive &&
            isActive === name &&
            (isDark ? "bg-[#2c2f32]" : "bg-[#D9D9E3]")
         } flex justify-center items-center ${styles}`}
         onClick={handleClick}
      >
         {!isActive ? (
            <img src={imgUrl} alt="fund_logic" className="w-1/2 h-1/2" />
         ) : (
            <img
               src={imgUrl}
               alt="fund_logic"
               className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
            />
         )}
      </div>
   );
};
const SideBar = () => {
   const navigate = useNavigate();
   const [isActive, setisActive] = useState("dashboard"); //dashboard is active by default
   const [isDark, setisDark] = useState(true);
   const dispatch = useDispatch();
   return (
      <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
         <Link to="/">
            <Icon
               styles={`w-[52px] h-[52px] ${
                  isDark ? "bg-[#2c2f32]" : "bg-[#D9D9E3]"
               }`}
               imgUrl={logo}
               isDark={isDark}
            />
         </Link>
         <div
            className={`flex-1 flex flex-col justify-between items-center
         rounded-[20px] w-[76px] py-4 mt-12 ${
            isDark ? `bg-[#1c1c24]` : `bg-[#ECECF1]`
         }`}
         >
            <div className="flex flex-col justify-center items-center gap-3">
               {navlinks.map((link) => (
                  <Icon
                     key={link.name}
                     {...link}
                     isActive={isActive}
                     handleClick={() => {
                        setisActive(link.name);
                        navigate(link.link);
                     }}
                     isDark={isDark}
                  />
               ))}
            </div>
            <Icon
               styles={`${
                  isDark ? "bg-[#2c2f32]" : "bg-[#D9D9E3]"
               }  shadow-secondary`}
               imgUrl={sun}
               handleClick={() => {
                  setisDark((prev) => !prev);
                  dispatch(setTheme(isDark));
               }}
               isDark={isDark}
            />
         </div>
      </div>
   );
};

export default SideBar;
