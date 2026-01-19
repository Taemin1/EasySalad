# 이지샐러드 (EzySalad)

**신선한 샐러드와 샌드위치를 위한 프리미엄 배달 서비스**

**URL** : [https://ezysalad.store](https://ezysalad.store)

---

## 📖 프로젝트 소개

이지샐러드는 서울/인천/성남 지역에 신선한 샐러드, 샌드위치, 도시락을 배달하는 온라인 주문 플랫폼입니다. 매일 신선한 재료로 만든 건강한 식사를 회사 단체 주문부터 개인 주문까지 편리하게 제공합니다.

---

## ✨ 주요 특징

- **간편한 주문** - 직관적인 UI/UX로 쉬운 주문
- **안전한 결제** - PortOne 연동을 통한 안전하고 편리한 결제 시스템
- **자동 알림** - 주문 확인 이메일 자동 발송
- **관리 시스템** - 관리자 페이지를 통한 메뉴 관리
- **모바일 최적화** - 반응형 웹을 통한 모바일 화면 최적화 구현

---

## 🛠️ 기술 스택

### FrontEnd

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-D36AC2?style=for-the-badge&logo=emotion&logoColor=white)

### DataBase

![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📂 프로젝트 구조

```
easysalad/
├── public/                 # 정적 파일 (이미지, 로고 등)
├── src/
│   ├── app/               # Next.js App Router 페이지
│   │   ├── page.tsx       # 홈페이지
│   │   ├── menu/          # 메뉴 페이지
│   │   ├── order/         # 주문 페이지
│   │   ├── checkout/      # 결제 페이지
│   │   ├── catering/      # 케이터링 페이지
│   │   ├── about/         # 회사 소개
│   │   ├── contact/       # 문의 페이지
│   │   ├── api/           # API Routes
│   │   └── thisisforadmin/ # 관리자 페이지
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── styles/            # 전역 스타일 및 테마
│   └── lib/               # 유틸리티 함수
├── supabase/              # 데이터베이스 스키마
├── .env                   # 환경 변수 (git에서 제외)
├── package.json           # 프로젝트 의존성
└── README.md              # 프로젝트 문서
```

---

## 🎯 주요 기능

### 1. 메뉴 카탈로그

- 카테고리별 메뉴 분류 (샐러드, 샌드위치, 도시락, 음료, 디저트)
- 상세 메뉴 정보 및 가격
- Full / Half 선택 가능

### 2. 주문 시스템

- 장바구니 기능
- 실시간 수량 조절
- 배송 정보 입력
- 배송 날짜/시간 선택
- 계좌 이체/카드 결제 선택 가능

### 3. 결제

- PortOne 통합 결제 (카드 및 간편결제 지원)
- 안전한 결제 프로세스
- 주문 확인 및 영수증 이메일

### 4. 관리자 대시보드

- 관리자 계정 로그인을 통한 인증
- 메뉴 관리

---

## 📞 연락처

- **이메일**: rlaxoals132@naver.com
