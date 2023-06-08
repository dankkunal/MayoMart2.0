import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { BsGithub, BsInstagram } from "react-icons/bs";

const About = () => {
  return (
    <Layout title="About | Kaniby">
      <div className=" row aboutme">
        <div className="col-md-6 ">
          <img
            src="/images/Kaniby.jpg"
            alt="contactus"
            style={{ width: "50%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className=" p-2 text-black text-center">About Me</h1>
          <p className="text-justify mt-10 p-10">
            I'm a final year Computer Science Engineering student at National
            Institute of Technology, Kurukshetra. I'm a full stack web developer
            and a competitive programmer. I have worked on various projects and
            I'm always ready to learn new technologies and implement them in my
            projects. You can contact me through the following details.
          </p>
          <p className="mt-3">
            <BiMailSend /> : kunalbehlba@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 8168496409
          </p>
          <p className="mt-3">
            <BsGithub /> : @dankkunal
          </p>
          <p className="mt-3">
            <BsInstagram /> : @dankkunal
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
