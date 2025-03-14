// Button.jsx
const Button = ({ children, variant = "primary", onClick, className = "", ...props }) => {
    // Define button styles based on variant
    const styles = {
      primary: "bg-[#1E4DB7] text-white hover:bg-[#0D0C1D]",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
      text: "text-blue-600 hover:text-blue-800"
    };
  
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 font-medium rounded-md transition-colors ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;