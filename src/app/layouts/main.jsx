import React from "react";
import countryService from "../service/country.service";

const Main = () => {
  async function data() {
    const { content } = await countryService.get();
    console.log(content);
  }
  data();
  return <h1>Main</h1>;
};

export default Main;
