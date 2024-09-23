import img2 from "../../assets/image-2.png"

const FooterComponent = () => {
  return (
    <div className="py-8 px-4 sm:px-8 md:px-12 lg:px-24 pt-16">
      <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 flex-wrap">
        <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="pr-8 md:pr-16">
            <h4 className="pb-4 md:pb-8 text-base font-semibold">Company</h4>
            <ul className="space-y-2 md:space-y-4 text-sm text-[#002B54] font-semibold">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
            </ul>
          </div>
          <div className="md:mr-12 mt-2 lg:mt-0">
            <h4 className="pb-4 md:pb-8 text-base font-semibold">Services</h4>
            <div className="grid grid-flow-col-dense gap-y-4 gap-x-6 md:gap-x-10">
              {Array(3)
                .fill()
                .map((_, index) => (
                  <ul
                    key={index}
                    className="space-y-2 text-sm text-[#002B54] font-semibold w-[100px]"
                  >
                    <li>
                      <a href="#">Service 1</a>
                    </li>
                    <li>
                      <a href="#">Service 2</a>
                    </li>
                    <li>
                      <a href="#">Service 3</a>
                    </li>
                    <li>
                      <a href="#">Service 4</a>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
          <div className="mt-2 lg:mt-0">
            <h4 className="pb-4 md:pb-8 text-base font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-4 md:gap-5">
              <p className="border-2 p-3 rounded-lg text-[#002B54] border-r-0">
                United St, Alsahel Albahary
                <br />
                Tema, Sohag
              </p>
              <p className="border-2 p-3 rounded-lg text-[#002B54] border-l-0">
                +20 1123304107 <br />
                sherifaboz43@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#f2f9ff] px-6 py-8 rounded-lg w-full md:w-[338px] md:max-h-[258px]">
          <h4 className="pb-4 text-base font-semibold">Subscribe</h4>
          <div className="py-4 flex items-center">
            <input
              className="p-3 rounded-s-lg border border-[#DCDCDC] focus:outline-none focus:ring-0"
              placeholder="Email address"
              type="email"
            />
            <button className="bg-[#0081FE] p-3 rounded-e-lg">
              <i className="pi pi-arrow-right text-white"></i>
            </button>
          </div>
          <p className="text-xs font-normal mt-4">
            Hello, we are Lift Media. Our goal is to translate the positive
            effects from revolutionizing how companies engage with their clients
            & their team.
          </p>
        </div>
      </div>
      <hr className="my-8 md:my-10 border-gray-200 border-2" />
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <img
          src={img2}
          alt=""
          className="w-24 md:w-[83.6px]"
        />
        <ul className="flex gap-6 md:gap-10">
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
        <div className="flex gap-4">
          <button>
            <i
              className="pi pi-linkedin text-xl p-2 rounded-full border"
              style={{ color: "black" }}
            ></i>
          </button>
          <button>
            <i
              className="pi pi-twitter text-xl p-2 rounded-full border"
              style={{ color: "black" }}
            ></i>
          </button>
          <button>
            <i
              className="pi pi-facebook text-xl p-2 rounded-full border"
              style={{ color: "black" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
