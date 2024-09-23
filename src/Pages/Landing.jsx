import About from "../Components/About/About";
import Header from "../Components/Header";
import Hero from "../Components/Hero/Hero";
import Pricing from "../Components/Pricing/Pricing";
import ServicesComponent from "../Components/Services/Services";
import WorkComponent from "../Components/Work/Work";

export default function Landing() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Pricing />
      <WorkComponent />
      <ServicesComponent/>
    </div>
  );
}
