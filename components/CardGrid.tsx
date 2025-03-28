// components/CardGrid.js
import EmployeeCard from './EmployeeCard';

const CardGrid = () => {
  return (
    <div className="grid grid-cols-10 sm:grid-cols-5 md:grid-cols-3 gap-30 p-15 w-full">
      <EmployeeCard
        imageSrc="/krotov.png"
        name="Кротов А.М"
        title="Постоянный председатель СБ КНР"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Владимир Лысочерт"
        title="Министр внутренних дел"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Alex Johnson"
        title="UX Designer"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Emma Brown"
        title="Data Analyst"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Chris Davis"
        title="DevOps Engineer"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Sophia Wilson"
        title="HR Specialist"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Luke Martin"
        title="SEO Specialist"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Mia Taylor"
        title="Marketing Manager"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Noah Anderson"
        title="Financial Analyst"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Noah Anderson 2"
        title="Financial Analyst"
      />
    </div>
  );
};

export default CardGrid;