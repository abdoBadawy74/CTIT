import About from "../Components/About/About";
import ContactComponent from "../Components/Contact/Contact";
import FooterComponent from "../Components/Footer/Footer";
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
      <ServicesComponent />
      <ContactComponent />
      <FooterComponent/>
    </div>
  );
}
