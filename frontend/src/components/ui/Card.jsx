// components/ui/card.js
const Card = ({ className, children }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg bg-white ${className}`}>
      {children}
    </div>
  );
};

export { Card };
