import "./Pricing.css"

const PricingComponent = () => {
  return (
    <div className="my-5 bg-gray-100" id="pricingSection">
      <div className="py-10 flex justify-center flex-col items-center">
        <h1 className="uppercase text-blue-500 font-semibold heading relative">
          our plans
        </h1>
        <p className="font-semibold text-sm leading-10 lg:text-2xl md:text-center">
          Join us and find the plan that's right for you
        </p>
      </div>
      <span className="cicle"></span>
      <div className="pb-10 px-2 gap-10 grid justify-items-center justify-center grid-cols-1 lg:grid-cols-3 md:max-w-[500px] lg:max-w-[1165px] mx-auto">
        {/* Basic Plan */}
        <div className="card bg-white flex flex-col gap-5">
          <div className="title flex flex-col justify-center items-center">
          <svg
          className="mt-5"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M45 51.2501H42.5V50.6251C42.5 47.8751 40.25 45.6251 37.5 45.6251H31.875V39.9001C31.25 39.9751 30.625 40.0001 30 40.0001C29.375 40.0001 28.75 39.9751 28.125 39.9001V45.6251H22.5C19.75 45.6251 17.5 47.8751 17.5 50.6251V51.2501H15C13.975 51.2501 13.125 52.1001 13.125 53.1251C13.125 54.1501 13.975 55.0001 15 55.0001H45C46.025 55.0001 46.875 54.1501 46.875 53.1251C46.875 52.1001 46.025 51.2501 45 51.2501Z"
            fill="#0081FE"
          />
          <path
            opacity="0.4"
            d="M13.8012 29.1C12.1512 28.475 10.7012 27.45 9.55117 26.3C7.22617 23.725 5.70117 20.65 5.70117 17.05C5.70117 13.45 8.52617 10.625 12.1262 10.625H13.5262C12.8762 11.95 12.5012 13.425 12.5012 15V22.5C12.5012 24.85 12.9512 27.075 13.8012 29.1Z"
            fill="#0081FE"
          />
          <path
            opacity="0.4"
            d="M54.3012 17.05C54.3012 20.65 52.7762 23.725 50.4512 26.3C49.3012 27.45 47.8512 28.475 46.2012 29.1C47.0512 27.075 47.5012 24.85 47.5012 22.5V15C47.5012 13.425 47.1262 11.95 46.4762 10.625H47.8762C51.4762 10.625 54.3012 13.45 54.3012 17.05Z"
            fill="#0081FE"
          />
          <path
            d="M37.5 5H22.5C16.975 5 12.5 9.475 12.5 15V22.5C12.5 32.175 20.325 40 30 40C39.675 40 47.5 32.175 47.5 22.5V15C47.5 9.475 43.025 5 37.5 5ZM37.1 21.125L35.55 23.025C35.3 23.3 35.125 23.85 35.15 24.225L35.3 26.675C35.4 28.175 34.325 28.95 32.925 28.4L30.65 27.5C30.3 27.375 29.7 27.375 29.35 27.5L27.075 28.4C25.675 28.95 24.6 28.175 24.7 26.675L24.85 24.225C24.875 23.85 24.7 23.3 24.45 23.025L22.9 21.125C21.925 19.975 22.35 18.7 23.8 18.325L26.175 17.725C26.55 17.625 27 17.275 27.2 16.95L28.525 14.9C29.35 13.625 30.65 13.625 31.475 14.9L32.8 16.95C33 17.275 33.45 17.625 33.825 17.725L36.2 18.325C37.65 18.7 38.075 19.975 37.1 21.125Z"
            fill="#0081FE"
          />
        </svg>
            <h2 className="py-2">Basic</h2>
            <p className="text-[#0081FE] font-medium">
              30 $<span className="text-xs text-[#8D8D8D]"> / monthly</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i className="pi pi-check-circle" style={{ color: "#0081fe" }}></i>
            <p className="text-[#002B54] font-semibold text-sm">
              Feature 1 Description
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i className="pi pi-check-circle" style={{ color: "#0081fe" }}></i>
            <p className="text-[#002B54] font-semibold text-sm">
              Feature 2 Description
            </p>
          </div>
          <button className="rounded-lg mt-7 py-3 px-5 bg-blue-500 text-white">
            Select
          </button>
        </div>

        {/* Advanced Plan */}
        <div className="card bg-white flex flex-col gap-5">
          <div className="title flex flex-col justify-center items-center">
            <svg
              className="mt-5"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
             <path
            d="M44.7004 15.3001L9.82535 50.1751C8.75035 51.2501 6.95035 51.1501 6.07535 49.9251C4.82535 48.2001 4.57538 45.8001 5.87538 43.7251L12.7754 32.6501C13.7004 31.1751 13.7004 28.7751 12.7754 27.3001L5.87538 16.2251C3.55038 12.5251 6.22536 7.72507 10.5754 7.72507H39.2003C40.9003 7.72507 43.0004 8.90007 43.9004 10.3251L45.0754 12.1751C45.6504 13.2001 45.5254 14.4751 44.7004 15.3001Z"
            fill="#0081FE"
          />
           <path
            opacity="0.4"
            d="M54.0747 32.775L41.1247 50.025C40.2247 51.25 38.2247 52.25 36.6747 52.25H18.7747C16.5497 52.25 15.4247 49.55 16.9997 47.975L45.7747 19.2C46.8997 18.075 48.8247 18.275 49.6747 19.65L54.2997 27.075C55.3247 28.675 55.2247 31.25 54.0747 32.775Z"
            fill="#0081FE"
          />
            </svg>
            <h2 className="py-2">Advanced</h2>
            <p className="text-[#0081FE] font-medium">
              45 $<span className="text-xs text-[#8D8D8D]"> / monthly</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i className="pi pi-check-circle" style={{ color: "#0081fe" }}></i>
            <p className="text-[#002B54] font-semibold text-sm">
              Feature 1 Description
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i className="pi pi-check-circle" style={{ color: "#0081fe" }}></i>
            <p className="text-[#002B54] font-semibold text-sm">
              Feature 2 Description
            </p>
          </div>
          <button className="rounded-lg mt-7 py-3 px-5 bg-blue-500 text-white">
            Select
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="card bg-white flex flex-col gap-5">
          <div className="title flex flex-col justify-center items-center">
            <svg
              className="mt-5"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
            d="M55.0008 14.275V38.225C55.0008 45.125 49.4008 50.725 42.5008 50.725H17.5008C16.3508 50.725 15.2508 50.575 14.1758 50.275C12.6258 49.85 12.1258 47.875 13.2758 46.725L39.8508 20.15C40.4008 19.6 41.2258 19.475 42.0008 19.625C42.8008 19.775 43.6758 19.55 44.3008 18.95L50.7258 12.5C53.0758 10.15 55.0008 10.925 55.0008 14.275Z"
            fill="#0081FE"
          />
          <path
            opacity="0.4"
            d="M36.6 18.4L10.425 44.575C9.225 45.775 7.225 45.475 6.425 43.975C5.5 42.275 5 40.3 5 38.225V14.275C5 10.925 6.925 10.15 9.275 12.5L15.725 18.975C16.7 19.925 18.3 19.925 19.275 18.975L28.225 10C29.2 9.02505 30.8 9.02505 31.775 10L36.625 14.85C37.575 15.825 37.575 17.425 36.6 18.4Z"
            fill="#0081FE"
          />
            </svg>
            <h2 className="py-2">Enterprise</h2>
            <p className="text-[#0081FE] font-medium">
              60 $<span className="text-xs text-[#8D8D8D]"> / monthly</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i className="pi pi-check-circle" style={{ color: "#0081fe" }}></i>
            <p className="text-[#002B54] font-semibold text-sm">
              Feature 1 Description
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i className="pi pi-check-circle" style={{ color: "#0081fe" }}></i>
            <p className="text-[#002B54] font-semibold text-sm">
              Feature 2 Description
            </p>
          </div>
          <button className="rounded-lg mt-7 py-3 px-5 bg-blue-500 text-white">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;
