import React from "react";

const FormField = ({
   labelName,
   placeholder,
   value,
   onChange,
   inputType,
   isTextArea,
}) => {
   return (
      <label className="flex-1 width-full flex flex-col">
         {labelName && (
            <span className="text-[#808191] font-epilogue font-medium text-[15px] leading-[22px] mb-[10px]">
               {labelName}
            </span>
         )}
         {isTextArea ? (
            <textarea
               required
               className="rounded-[10px] sm:min-w-[300px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[14px] placeholder:text-[#4b5264] text-white "
               type={inputType}
               value={value}
               placeholder={placeholder}
               onChange={onChange}
               rows="10"
            />
         ) : (
            <input
               required
               className="rounded-[10px] sm:min-w-[300px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[14px] placeholder:text-[#4b5264] text-white "
               type={inputType}
               value={value}
               placeholder={placeholder}
               onChange={onChange}
               step="0.1"
            />
         )}
      </label>
   );
};

export default FormField;
