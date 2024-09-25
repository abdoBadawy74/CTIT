import cloudConnection from "../../assets/cloud-connection.svg";
import cloudChange from "../../assets/cloud-change.svg";
import about from "../../assets/about1.svg";
import about2 from "../../assets/about2.svg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="px-20 about mt-5" id="aboutSection">
      <div className="container space-y-5">
        <div className="flex flex-wrap">
          {/* Left Section */}
          <div className="w-full sm:w-1/3 p-3">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Our <span className="text-main">Services</span>
            </h3>
            <p className="text-gray-400 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              interdum dui mollis. Suspendisse nulla:
            </p>
            <div>
              <a
                className="rounded-md border brdr-main px-3 py-2 text-main"
                href="https://undraw.co/"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full sm:w-2/3 p-3 px-3 mt-0 flex flex-wrap justify-around text-center">
            {/* First Box */}
            <div className="lg:w-1/3 w-full shadow-md p-2 bg-white rounded-md relative lg:mb-0 box">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-md bg-main p-2">
                <img src={cloudConnection} alt="Cloud Connection" />
              </div>
              <h4 className="text-lg font-bold mt-8">ERP System</h4>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <div>
                <Link
                  className="inline-block bg-main text-white lg:mx-0 font-bold rounded-md my-3 py-2 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  to="/erp/packages"
                >
                  Subscribe now
                </Link>
              </div>
            </div>

            {/* Second Box */}
            <div className="lg:w-1/3 w-full shadow-md p-2 bg-white rounded-md relative lg:mb-0 box">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-md bg-main p-2">
                <img src={cloudChange} alt="Cloud Change" />
              </div>
              <h4 className="text-lg font-bold mt-8">Data Transfer</h4>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <div>
                <button className="inline-block bg-main text-white lg:mx-0 font-bold rounded-md my-3 py-2 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Subscribe now
                </button>
              </div>
            </div>

            {/* Third Box */}
            <div className="lg:w-1/3 w-full shadow-md p-2 bg-white rounded-md relative mb-16 lg:mb-0 box">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-md bg-main p-2">
                <img src={cloudConnection} alt="Cloud Connection" />
              </div>
              <h4 className="text-lg font-bold mt-8">Email and Hosting</h4>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <div>
                <button className="inline-block bg-main text-white lg:mx-0 font-bold rounded-md my-3 py-2 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Subscribe now
                </button>
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
