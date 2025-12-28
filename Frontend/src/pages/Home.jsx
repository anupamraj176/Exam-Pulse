import HeroSection from '../components/home/HeroSection';
import LiveTicker from '../components/home/LiveTicker';
import ExamCategories from '../components/home/ExamCategories';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <LiveTicker />
      <ExamCategories />
      {/* More sections coming... */}
    </div>
  );
};

export default Home;