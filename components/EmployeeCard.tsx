// components/EmployeeCard.js
const EmployeeCard = ({ imageSrc, name, title }) => {
    return (
      <div className="bg-white p-5 shadow-md rounded flex flex-col items-center text-center">
        <img
          src={imageSrc}        
          alt={name}
          className="w-24 h-24 mb-4"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{title}</p>
      </div>
    );
  };
  
  export default EmployeeCard;
  