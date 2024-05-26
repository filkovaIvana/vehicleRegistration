import React from "react";
import "./App.css";
import AppNavbar from "./AppNavbar";

type Props = {
  profileType: string;
};

const HomeNavigationTools = (props: Props) => (
  <div>
    <AppNavbar />
    {/* <ProfileSidebar profileType={props.profileType} /> */}
  </div>
);

export default HomeNavigationTools;
