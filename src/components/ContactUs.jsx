import React, { useRef } from "react";
import CustomBtn from "./CustomBtn";
import emailjs from "@emailjs/browser";
import { useToast } from "../context/ToastContext";

const SERVICE_ID = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY;

function ContactUs() {
  const {showToast} = useToast();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          showToast("Info", "Info", "Email send successfully.");
          e.target.reset();
        },
        (error) => {
            showToast("Error", "Error", JSON.stringify(error));
        }
      );
  };
  return (
    <section className="w-screen h-full bg-color-bg text-color-text">
      <div className="py-8 px-4 mx-auto max-w-screen-md bg">
        <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-center">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 text-center text-color-text text-sm font-normal">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form
          onSubmit={sendEmail}
          className="space-y-8 bg-color-bg-1 p-8 rounded-lg"
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm bg-color-bg-2 text-sm rounded-lg block w-full p-2.5"
              placeholder="Dev Leo"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-color-bg-2 text-sm rounded-lg block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="block p-3 w-full text-sm bg-color-bg-2 rounded-lg shadow-sm"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="block p-2.5 w-full text-sm bg-color-bg-2 rounded-lg shadow-sm"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <CustomBtn label={"Send message"} btnType={"submit"} />
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
