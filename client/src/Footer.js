import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <PickachuImg
        src={require("./images/pickachu-footer.png").default}
        alt="pickachu"
      />
      <About>
        <LinkTo href="#">Linkedin</LinkTo>

        <LinkTo href="#">Facebook</LinkTo>
        <LinkTo href="#">Github</LinkTo>
      </About>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  flex: 0 0 15%;
  background-color: #1f1d1d;
  /* position: fixed; */
  /* bottom: 0; */
  width: 100%;
  padding: 1.5rem;
  padding-left: 1rem;
  position: relative;
`;

const PickachuImg = styled.img`
  width: 8rem;
  height: 80%;
  position: absolute;
  right: 0;
  top: 0.4rem;
`;

const About = styled.div`
  display: flex;
  height: 100%;
  border-top: 1px solid #eee;
  align-items: center;
  width: 80%;
`;

const LinkTo = styled.a`
  &:not(:first-child) {
    margin-left: 1rem;
  }
  margin-right: 1rem;

  font-size: 1.8rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
`;
