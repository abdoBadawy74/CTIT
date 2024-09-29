import { useEffect, useState } from "react";
import "./Services.css";
import sliderImg1 from "../../assets/slider-img1.svg";
import sliderImg2 from "../../assets/slider-img2.svg";
import sliderImg3 from "../../assets/slider-img3.svg";
import sliderImg4 from "../../assets/slider-img4.svg";
import sliderImg5 from "../../assets/slider-img5.svg";
import sliderImg6 from "../../assets/slider-img6.svg";
import sliderImg7 from "../../assets/slider-img7.svg";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";

const ServicesComponent = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [responsiveOptions, setResponsiveOptions] = useState([]);

   // translate
   const { language, setLanguage } = useLanguage();

  const testProducts = [
    {
      id: "1000",
      name: "Product 1",
      description: "Description for Product 1",
      price: 100,
      status: "INSTOCK",
    },
    {
      id: "1001",
      name: "Product 2",
      description: "Description for Product 2",
      price: 200,
      status: "LOWSTOCK",
    },
  ];

  const sliderImages = [
    sliderImg1,
    sliderImg2,
    sliderImg3,
    sliderImg4,
    sliderImg5,
    sliderImg6,
    sliderImg7,
  ];

  useEffect(() => {
    setTestimonials(testProducts);

    setResponsiveOptions([
      {
        breakpoint: "1199px",
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: "991px",
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 1,
        numScroll: 1,
      },
    ]);
  }, []);

  const getSeverity = (status) => {
    switch (status) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return "unknown";
    }
  };

  return (
    <div id="services" className="my-5">
      <div>
        <div className="pt-10 pb-5 pl-12 flex items-start justify-center flex-col lg:pl-24 lg:w-[699px]">
          <h1 className="uppercase text-blue-500 font-semibold work-heading relative">
            {t[language].Services}
          </h1>
          <h2 className="font-semibold text-xl leading-10 lg:text-3xl -ml-6 text-[#231F20]">
            {t[language].services_head}
          </h2>
        </div>
      </div>
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-12 lg:pl-24 lg:pr-12 -ml-6 gap-7">
        {testimonials.map((product) => (
          <div key={product.id} className="card bg-[#F8F9F9]">
            <svg /* Your SVG content */ />
            <h1 className="font-semibold text-xl pb-5">{product.name}</h1>
            <p className="text-[#6B7A85] text-sm pb-9">{product.description}</p>
            <button className="border border-solid border-1 py-2 px-5 rounded-lg">
              Read more
            </button>
          </div>
        ))}
      </div>
      <button className="block rounded-lg mt-5 py-3 px-5 bg-blue-500 text-white w-auto mx-auto">
        {t[language].ViewAll}
      </button>

      <div className="slider">
        <div className="slide-track">
          {sliderImages.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} alt={`Slider image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
