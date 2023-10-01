import React from 'react';
import MyProfile from "../Components/myprofile/MyProfile";
import Projects from "../Components/projects/Projects";
import ContactMe from "../Components/contactMe/ContactMe";

function Root() {

  return (
    <div>
      <MyProfile />
      <Projects />
      <ContactMe />
    </div>
  );
}

export default Root;
