"use client";

import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 20px 60px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 40px;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 20px;
  border-left: 4px solid ${theme.colors.accent};
  padding-left: 16px;
`;

const Content = styled.div`
  line-height: 1.7;
  color: ${theme.colors.text.secondary};
  margin-bottom: 20px;
  word-break: keep-all;
  overflow-wrap: break-word;

  p {
    margin-bottom: 16px;
  }

  ul {
    margin: 16px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  strong {
    color: ${theme.colors.text.primary};
    font-weight: 600;
  }
`;

export default function TermsPage() {
  return (
    <Container>
      <Title>교환 및 환불 규정</Title>

      <Section>
        <SectionTitle>1. 교환 환불이 가능한 경우</SectionTitle>
        <Content>
          <ul>
            <li>상품이 파손·오염되었거나 변질된 경우</li>
            <li>주문한 상품과 다른 상품이 배송된 경우</li>
            <li>유통기한이 이미 경과된 상품이 배송된 경우</li>
          </ul>
          <p>
            → 위와 같은 경우, 이지샐러드 매장 전화(02-6031-8927)로 연락
            부탁드립니다.
          </p>
        </Content>
      </Section>

      <Section>
        <SectionTitle>2. 교환 환불이 불가능한 경우</SectionTitle>
        <Content>
          <ul>
            <li>고객의 단순 변심(맛, 기호, 개인적인 이유)</li>
            <li>상품 수령 후 보관 부주의로 인한 변질</li>
            <li>상품 개봉 후 일부 섭취한 경우</li>
            <li>배송 완료 후 연락 지연으로 신선도가 저하된 경우</li>
          </ul>
        </Content>
      </Section>

      <Section>
        <SectionTitle>3. 신청 방법</SectionTitle>
        <Content>
          <p>고객센터(전화·이메일·카카오톡 등)를 통해 접수</p>
          <p>주문번호, 문제 상황 사진을 반드시 첨부</p>
          <p>확인 후 환불(결제취소/계좌 환불) 또는 재배송으로 처리</p>
        </Content>
      </Section>

      <Section>
        <SectionTitle>4. 배송 관련 규정</SectionTitle>
        <Content>
          <ul>
            <li>
              신선식품 특성상 수취인 부재·주소 불명·연락 불가 등으로 인한 반송
              시 환불·재배송 불가
            </li>
            <li>
              택배사 과실로 인한 배송 지연으로 인한 신선도 저하는 업체에서
              책임지고 재발송 처리 <br />
              (단, 천재지변 등 불가항력 사유는 제외됩니다.)
            </li>
          </ul>
        </Content>
      </Section>

      <Section>
        <SectionTitle>5. 주문 취소</SectionTitle>
        <Content>
          <p>
            30분 이내라면 주문 후 빠르게 취소가 가능하지만, 출고 단계로 넘어간
            경우에는 취소가 불가합니다. 수령 후 하자가 있는 경우에만 교환·환불
            절차를 진행할 수 있습니다.
          </p>
        </Content>
      </Section>

      <Section>
        <SectionTitle>관련 법령</SectionTitle>
        <Content>
          <p style={{ fontSize: "1.2rem" }}>
            <strong>
              「전자상거래 등에서의 소비자보호에 관한 법률」 (전자상거래법)
            </strong>
          </p>
          <p>
            전자상거래법 제17조에 따라 소비자는 계약일 또는 상품 수령일로부터
            7일 이내에 청약 철회가 가능합니다.
          </p>
          <p>
            단, 신선식품은 청약철회가 제한될 수 있습니다(제17조 제2항 제5호).
          </p>

          <p style={{ fontSize: "1.2rem" }}>
            <strong>「소비자분쟁해결기준」 (공정거래위원회 고시)</strong>
          </p>
          <p>식품(신선식품 포함) 관련 기준</p>
          <p>
            변질, 부패, 이물질 혼입 등 하자가 있을 경우 → 무상 교환 또는 환불
            가능
          </p>
          <p>단순 변심 → 환불·교환 불가 (신선식품의 특성상)</p>

          <p style={{ fontSize: "1.2rem" }}>
            <strong>「식품위생법」</strong>
          </p>
          <p>
            신선식품 유통 및 판매 시 위생·품질 관리 책임을 판매자가 지도록 규정
          </p>
          <p>
            만약 상품이 변질·부패된 상태로 배송된다면, 이는 판매자의 책임으로
            교환·환불 대상이 됩니다.
          </p>
        </Content>
      </Section>
    </Container>
  );
}
