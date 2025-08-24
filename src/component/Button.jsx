function Button({
  children,
  assign, 
  buttonType = 'button',
  className = "",
  variant = "primary",
  ...otherProps
}) {
  
  const baseStyles = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
 
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500 bg-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };
  
 
  const sizeStyles = "px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-base";
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles} ${className}`} 
      type={buttonType} 
      {...otherProps}
    >
      {assign}{children}
    </button>
  );
}

export default Button;