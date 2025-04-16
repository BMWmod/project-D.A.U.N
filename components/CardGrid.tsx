// components/CardGrid.js
import EmployeeCard from './EmployeeCard';

const CardGrid = () => {
  return (
    <div className="grid grid-cols-10 sm:grid-cols-5 md:grid-cols-3 gap-30 p-15 w-full">
      <EmployeeCard
        imageSrc="/krotov.png"
        name="Кротов А.М"
        title="Председатель ООБ"
      />
      <EmployeeCard
        imageSrc="/minister3.png"
        name="Сергей Глухарёв"
        title="	Заместитель председателя ООБ"
      />
      <EmployeeCard
        imageSrc="/minister4.png"
        name="Капитан Журов"
        title="Начальник милиции общественной безопасности"
      />
      <EmployeeCard
        imageSrc="/minister2.png"
        name="Гассан Абдуррахман ибн Хоттаб"
        title="Начальник криминальной милиции"
      />
      <EmployeeCard
        imageSrc="/minister6.png"
        name="Константин Крепкий"
        title="Командующий внутренними войсками"
      />
      <EmployeeCard
        imageSrc="/minister5.png"
        name="Алексей Добровольский"
        title="Начальник идеологического управления"
      />
      {/* <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Mia Taylor"
        title="Marketing Manager"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Noah Anderson"
        title="Financial Analyst"
      /> */}
    </div>
  );
};

export default CardGrid;