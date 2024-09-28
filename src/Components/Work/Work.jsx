import officeContent1 from "../../assets/image-8.jpg";
import officeContent2 from "../../assets/image-7.jpg";
import officeContent3 from "../../assets/image-4.jpg";
import officeContent4 from "../../assets/image-3.jpg";
import officeContent5 from "../../assets/image-6.jpg";
import officeContent6 from "../../assets/image-10.jpg";
import officeContent7 from "../../assets/image-9.jpg";
import officeContent8 from "../../assets/image-5.jpg";

const WorkComponent = () => {
  return (
    <div
      id="work"
      className="mb-5 flex justify-between gap-5 max-h-[765px] pr-5"
    >
      <div className="lg:flex flex-col lg:gap-[187px] overflow-hidden">
        <div>
          <div className="pt-10 pb-5 pl-12 flex items-start justify-center flex-col lg:pl-24 lg:w-[428px] gap-2">
            <h1 className="uppercase text-blue-500 font-semibold work-heading relative">
              Work
            </h1>
            <h2 className="font-extrabold text-xl leading-10 lg:text-3xl -ml-6 text-[#002B54]">
              Some pictures of our work in the real world
            </h2>
          </div>
          <p className="text-[#002B54] pl-12 lg:pl-24 lg:w-[428px] -ml-6">
            There are several photographs showcasing the actual projects or
            achievements that we have accomplished in real-life situations.
          </p>
          <div className="mt-5 pl-12 lg:pl-24 lg:w-[428px] -ml-6">
            <button className="rounded-lg py-3 px-5 bg-blue-500 text-white lg:w-[276px] w-auto">
              Join and subscribe now
            </button>
          </div>
        </div>
        <div className="h-[210px] pl-16 lg:flex hidden gap-4">
          <div>
            <img
              className="hidden w-[170px] lg:block shadow-xl rounded-lg object-cover h-full"
              src={officeContent1}
              alt="office content 2"
            />
          </div>
          <div className="mb-5">
            <img
              className="hidden lg:block shadow-xl rounded-lg w-full object-cover h-full mb-5"
              src={officeContent2}
              alt="office content 2"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-x-4 mt-8 lg:pr-24 grow overflow-hidden">
        <div className="h-[210px] w-[135px] ml-auto justify-self-start">
          <img
            className="hidden lg:block shadow-lg rounded-lg w-full object-cover h-full"
            src={officeContent3}
            alt="office content 2"
          />
        </div>
        <div className="lg:col-span-3 h-[200px]">
          <img
            className="hidden lg:block mt-4 rounded-lg w-full object-cover h-full shadow-sm"
            src={officeContent4}
            alt="office content 1"
          />
        </div>

        <div className="h-[210px] w-[135px] ml-auto self-end my-auto">
          <img
            className="hidden lg:block mt-4 shadow-lg rounded-lg w-full object-cover h-full"
            src={officeContent8}
            alt="office content 2"
          />
        </div>
        <div className="mt-4 lg:col-span-3 h-[312px] rounded-lg shadow-md">
          <img
            className="hidden lg:block rounded-lg w-full object-cover h-full"
            src={officeContent5}
            alt="office content 1"
          />
        </div>

        <div className="mt-4 h-[210px] w-[135px] ml-auto">
          <img
            className="hidden lg:block mt-4 shadow-lg rounded-lg w-full object-cover h-full"
            src={officeContent6}
            alt="office content 2"
          />
        </div>
        <div className="mt-4 lg:col-span-3 h-[312px] rounded-lg shadow-md">
          <img
            className="hidden lg:block rounded-lg w-full object-cover h-full"
            src={officeContent7}
            alt="office content 1"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkComponent;
