// components/CardGrid.js
import EmployeeCard from './EmployeeCard';

const CardGrid = () => {
  return (
    <div className="grid grid-cols-10 sm:grid-cols-5 md:grid-cols-3 gap-30 p-15 w-full">
      <EmployeeCard
        imageSrc="/krotov.png"
        name="John Doe"
        title="Сын сатаны"
      />
      <EmployeeCard
        imageSrc="https://via.placeholder.com/150"
        name="Jane Smith"
        title="Product Manager"
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
    </div>
  );
};

export default CardGrid;