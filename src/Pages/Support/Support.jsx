import React, { useState } from "react";
import Header from "../../Components/Header";
import FooterComponent from "../../Components/Footer/Footer";
import emoji from "../../assets/Emoji.svg";
import link from "../../assets/Link.svg";
import Picker from "emoji-picker-react";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";

export default function Support() {
  // translate
  const { language, setLanguage } = useLanguage();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle Emoji selection
  const handleEmojiSelect = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false); // Hide picker after emoji is selected
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("File selected:", event.target.files[0]);
  };

  // Handle message input
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle send message
  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear message input
  };

  return (
    <div>
      <Header />
      <div className="bg-[#F8F9F9] h-[70vh]">
        <div>
          <div className="bg-white p-10 chat-content h-[500px] flex flex-col justify-between">
            {/* Message bubbles */}
            <div>
              <div className="senderMsg text-sm flex flex-col items-end">
                <p className="p-3 bg-[#0081FE] text-white w-fit rounded">Hi</p>
                <p className="text-xs">2m ago</p>
              </div>

              <div className="receiverMsg text-sm flex flex-col items-start">
                <p className="p-3 bg-[#F1F1F1] text-black w-fit rounded">
                  Hello
                </p>
                <p className="text-xs">2m ago</p>
              </div>
            </div>
            {/* Chat input and buttons */}
            <div className="btns border p-2 rounded mt-5 flex gap-2 items-center justify-self-end">
              {/* Emoji picker toggle button */}
              <img
                src={emoji}
                alt="emoji"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="cursor-pointer"
              />

              {/* File upload button */}
              <label htmlFor="fileInput">
                <img src={link} alt="link" className="cursor-pointer" />
              </label>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileSelect}
                style={{ display: "none" }} // Hidden file input, triggered by clicking the image
              />

              {/* Message input */}
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder={t[language].Type}
                className="w-full p-2 outline-none"
              />

              {/* Send button */}
              <button
                onClick={handleSendMessage}
                className="bg-[#0081FE] text-white w- p-2 rounded mt-2"
              >
                {t[language].Send}
              </button>
            </div>

            {/* Emoji picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-16 right-16 z-10">
                <Picker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
