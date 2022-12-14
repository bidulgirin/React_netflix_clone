import React from "react";
import styled from "styled-components";
//styled 를 컴포넌트 안쪽이 아닌 바깥쪽에 선언해야 경고가 없어진다!
const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
  border-top: 1px solid rgb(25, 25, 25);
  width: 100%;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 20px 20px;
    padding-bottom: 30px;
  }
`;
const FooterContent = styled.div``;

const FooterLinkContainer = styled.div`
  width: 500px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const FooterLinkTitle = styled.h1`
  color: gray;
  font-size: 17px;
`;
const FooterLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 35px;

  @media (max-width: 768px) {
    marign-top: 26px;
  }
`;

const FooterLink = styled.a`
  color: gray;
  font-size: 14px;
  width: 110px;
  margin-bottom: 21px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const FooterDescContainer = styled.div`
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;
const FooterDescRights = styled.h2`
  color: white;
  font-size: 14px;
  text-align: center;
`;
function Footer() {
  return (
    <div>
      <FooterContainer>
        <FooterContent>
          <FooterLinkContainer>
            <FooterLinkTitle>
              <FooterLinkContent>
                <FooterLink href="#">넷플릭스 소개</FooterLink>
                <FooterLink href="#">고객 센터</FooterLink>
                <FooterLink href="#">미디어 센터</FooterLink>
                <FooterLink href="#">이용약관</FooterLink>
                <FooterLink href="#">개인정보</FooterLink>
                <FooterLink href="#">회사정보</FooterLink>
                <FooterLink href="#">문의하기</FooterLink>
                <FooterLink href="#">법적 고지</FooterLink>
              </FooterLinkContent>
            </FooterLinkTitle>
          </FooterLinkContainer>
        </FooterContent>
      </FooterContainer>
    </div>
  );
}

export default Footer;
