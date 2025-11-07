import React from 'react';
import Banner from '../components/home/Banner';
import Reviews from '../components/home/Reviews';
import Blogs from '../components/home/Blogs';

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner />
      <Reviews />
      <Blogs />
    </div>
  );
};

export default HomePage;
