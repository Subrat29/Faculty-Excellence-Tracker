// components/ui/button.js
const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
