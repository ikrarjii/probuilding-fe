import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import WhyAttend from '../components/WhyAttend/WhyAttend';
import Parallax from '../components/Parallax/Parallax';
import ProjectPreparation from '../components/ProjectPreparation/ProjectPreparation';
import Sponsors from '../components/Sponsors/Sponsors';
import News from '../components/News/News';
import BookingForm from '../components/BookingForm/BookingForm';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { lang } = useLanguage();

  return (
    <>
      <Hero />
      <About />
      <WhyAttend />
      <Parallax />
      <ProjectPreparation />
      <Sponsors />
      {lang == 'id' && <News />}
      <BookingForm />
    </>
  );
}
