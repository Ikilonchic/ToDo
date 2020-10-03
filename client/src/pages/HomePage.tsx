import React from 'react';
import ProjectsList from '../components/ProjectsList';

const HomePage: React.FC = () => {
  return (
    <div>
      <ProjectsList />
      <button type="button" className="btn btn-primary">Primary</button>
    </div>
  );
};

export default HomePage;