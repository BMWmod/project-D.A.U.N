// components/CardGrid.js
import EmployeeCard from './EmployeeCard';

const CardGrid = () => {
  return (
    <div className="grid grid-cols-10 sm:grid-cols-5 md:grid-cols-3 gap-30 p-15 w-full">
      <EmployeeCard
        imageSrc="/krotov.png"
        name="Секресвин"
        title="Добавил краш в ЭК"
      />
    
    </div>
  );
};

export default CardGrid;