"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--header-bg, transparent);
  backdrop-filter: var(--header-backdrop, none);
  box-shadow: var(--header-shadow, none);
  transition: all ${theme.transitions.normal};
`;

const Nav = styled.nav`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  transition: transform ${theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 1.5rem;
  gap: 4rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: ${theme.colors.text.primary};
  transition: color ${theme.transitions.fast};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${theme.colors.primary};
    transform: scaleX(0);
    transition: transform ${theme.transitions.fast};
  }

  &:hover {
    color: ${theme.colors.primary};

    &::after {
      transform: scaleX(1);
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
  }

  span {
    width: 100%;
    height: 3px;
    background-color: ${theme.colors.text.primary};
    transition: all ${theme.transitions.fast};
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background-color: ${theme.colors.surface};
  box-shadow: ${theme.shadows.md};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MobileNavLink = styled(Link)`
  font-weight: 500;
  color: ${theme.colors.text.primary};
  padding: 10px;
  transition: all ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.background};
    border-radius: 8px;
  }
`;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;

      // CSS 변수를 사용하여 스타일 업데이트
      if (isScrolled) {
        document.documentElement.style.setProperty(
          "--header-bg",
          "rgba(255, 255, 255, 0.95)"
        );
        document.documentElement.style.setProperty(
          "--header-backdrop",
          "blur(10px)"
        );
        document.documentElement.style.setProperty(
          "--header-shadow",
          theme.shadows.sm
        );
      } else {
        document.documentElement.style.setProperty(
          "--header-bg",
          "transparent"
        );
        document.documentElement.style.setProperty("--header-backdrop", "none");
        document.documentElement.style.setProperty("--header-shadow", "none");
      }
    };

    handleScroll(); // 초기값 설정
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "홈" },
    { href: "/menu", label: "메뉴" },
    { href: "/about", label: "소개" },
    { href: "/contact", label: "문의" },
    { href: "/order", label: "주문" },
  ];

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <LogoWrapper onClick={() => router.push("/")}>
          <Image
            src="/EzySaladLogo.png"
            alt="EzySalad Logo"
            width={150}
            height={50}
          />
        </LogoWrapper>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <MenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span />
          <span />
          <span />
        </MenuButton>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
}
