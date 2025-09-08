"use client";

import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 20px 60px;

  h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 200px;
    margin-bottom: 200px;
  }
`;
const Catering = () => {
  return (
    <Container>
      <h1>회사 스낵 서비스 개발 예정</h1>
    </Container>
  );
};

export default Catering;
