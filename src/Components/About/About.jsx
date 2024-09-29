import cloudConnection from "../../assets/cloud-connection.svg";
import cloudChange from "../../assets/cloud-change.svg";
import about from "../../assets/about1.svg";
import about2 from "../../assets/about2.svg";
import { Link } from "react-router-dom";
import "./About.css";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";

const About = () => {
  // translate
  const { language, setLanguage } = useLanguage();

  return (
    <section id="about" className="px-20 about mt-5">
      <div className="container space-y-5">
        <div className="flex flex-wrap about-content">
          {/* Left Section */}
          <div className="w-full sm:w-1/3 p-3">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              {t[language].Our}{" "}
              <span className="text-main">{t[language].Services}</span>
            </h3>
            <p className="text-gray-400 mb-8">{t[language].Services_desc}</p>
            <div>
              <a
                className="rounded-md border brdr-main px-3 py-2 text-main"
                href="https://undraw.co/"
              >
                {t[language].LearnMore}
              </a>
            </div>
          </div>

          {/* Right Section */}

          <div className=" h-[240px] w-full sm:w-2/3 p-3 px-3 mt-0 flex flex-wrap justify-around text-center right-section">
            {/* First Box */}
            <div className="flex flex-col justify-end">
              <div className="w-[250px] shadow p-2 pb-4 bg-white rounded-md relative lg:mb-0 box order-2 lg:order-1 ">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-md bg-main p-2">
                  <img src={cloudConnection} alt="Cloud Connection" />
                </div>
                <h4 className="text-lg font-bold mt-8">{t[language].Erp}</h4>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <div>
                  <Link
                    className="bg-main text-white lg:mx-0 font-bold rounded-md my-3 py-2 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out absolute -bottom-9 left-10 "
                    to="/erp"
                  >
                    {t[language].Subscribe}
                  </Link>
                </div>
              </div>
            </div>

            {/* Second Box (Middle Box) */}
            <div className="middleBox">
              <div className="w-[250px] shadow p-2 pb-4 bg-white rounded-md relative lg:mb-0 box mb-4">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-md bg-main p-2">
                  <img src={cloudChange} alt="Cloud Change" />
                </div>
                <h4 className="text-lg font-bold mt-8">
                  {t[language].DataTransfer}
                </h4>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <div>
                  <button className="inline-block bg-main text-white lg:mx-0 font-bold rounded-md my-3 py-2 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out absolute -bottom-9 left-10 ">
                    {t[language].Subscribe}
                  </button>
                </div>
              </div>
            </div>

            {/* Third Box */}
            <div className="flex flex-col justify-end lastBox">
              <div className="w-[250px] shadow-md p-2 pb-4 bg-white rounded-md relative mb-16 lg:mb-0 box order-3 lg:order-3">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-md bg-main p-2">
                  <img src={cloudConnection} alt="Cloud Connection" />
                </div>
                <h4 className="text-lg font-bold mt-8">
                  {t[language].EmailAndHosting}
                </h4>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <div>
                  <button className="inline-block bg-main text-white lg:mx-0 font-bold rounded-md my-3 py-2 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out absolute -bottom-9 left-10 ">
                    {t[language].Subscribe}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image and Text Row 1 */}
        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-3 mt-6">
            <img src={about} alt="About 1" />
          </div>
          <div className="w-full sm:w-1/2 p-3 mt-20">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              at ipsum eu nunc commodo posuere et sit amet ligula.
            </p>
          </div>
        </div>

        {/* Image and Text Row 2 */}
        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-3 mt-20">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              at ipsum eu nunc commodo posuere et sit amet ligula.
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-3 mt-6">
            <img src={about2} alt="About 2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
