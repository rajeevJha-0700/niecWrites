import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full mb-4 md:mb-5">
        {label && (
          <label 
            className="block text-sm font-medium text-gray-700 mb-1 pl-1 md:text-base" 
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={`${className} w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white text-gray-800 placeholder-gray-400
                     sm:px-4 sm:py-3
                     md:text-base
                     lg:px-4 lg:py-3.5`}
          ref={ref} 
          {...props} 
          id={id}
        />
      </div>
    );
  }
);

export default Input;