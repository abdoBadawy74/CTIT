import { useState } from "react";
import "./Contact.css";

const ContactComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
  };

  return (
    <div
      id="contactSection"
      className="mb-5 px-4 lg:px-16 flex gap-3 flex-col lg:flex-row"
    >
      <div className="bg-[#0081FE] px-11 flex justify-center flex-col lg:mt-24 py-10 lg:py-36 rounded-3xl custom-bg w-full">
        <h1 className="uppercase text-2xl md:text-4xl text-white pb-4">
          Contact Us
        </h1>
        <p className="text-white max-w-[557px] lg:text-lg text-base">
          We would love to hear from you! Whether you have a question, feedback,
          or simply want to say hello, feel free to reach out to us using the
          contact information below. Our dedicated team is here to assist you
          and provide the information you need.
        </p>
      </div>
      <div className="flex h-fit flex-col right-48 items-start shadow-lg bg-[#eff6ff] rounded-lg p-7 justify-between md:block lg:absolute z-20">
        <form onSubmit={handleSubmit} className="p-2 w-full h-full">
          <div className="mt-5">
            <input
              type="text"
              className="w-full"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <input
              type="email"
              className="w-full"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <textarea
              placeholder="message"
              className="w-full h-[200px] resize-none"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-2 lg:w-[428px]">
            <button
              type="submit"
              className="rounded-lg py-3 px-10 bg-blue-500 text-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactComponent;
