import HeroSection from '../components/home/HeroSection';
import LiveTicker from '../components/home/LiveTicker';
import ExamCategories from '../components/home/ExamCategories';
import FeaturedResources from '../components/home/FeaturedResources';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <LiveTicker />
      <ExamCategories />
      <FeaturedResources />
    </div>
  );
};

export default Home;