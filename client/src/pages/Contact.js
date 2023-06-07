import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="contactus">
        <div className="col-md-4">
          <h1 className=" p-2 text-black text-center">CONTACT US</h1>
          <p className="text-justify mt-10 p-10">
            Any query and info about product will be resolved in 3 working days.
            Feel free to call anytime as we are 24x7 avaialible.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@mayomart.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
