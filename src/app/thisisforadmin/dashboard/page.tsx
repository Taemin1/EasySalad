"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";
import { createClient } from "@/../lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { MenuItem } from "@/types/menu";

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  margin-top: 5rem;
  background-color: ${theme.colors.background};
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuSection = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: ${theme.shadows.md};
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: ${theme.colors.surface};
  border-radius: 8px;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`;

const UserDetails = styled.div`
  h3 {
    color: ${theme.colors.text.primary};
    margin-bottom: 5px;
  }
  p {
    color: ${theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid ${theme.colors.background};
    border-radius: 50%;
    border-top-color: ${theme.colors.primary};
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const MenuCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${theme.shadows.sm};
  border: 2px solid ${theme.colors.surface};
  transition: all ${theme.transitions.fast};

  &:hover {
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.primary}40;
  }
`;

const MenuImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: ${theme.colors.surface};
`;

const MenuName = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
`;

const MenuCategory = styled.span`
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: inline-block;
`;

const MenuPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 15px;
`;

const MenuDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ $variant?: "primary" | "danger" | "secondary" }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  flex: 1;

  ${({ $variant = "primary" }) => {
    switch ($variant) {
      case "danger":
        return `
          background-color: #ff6b6b;
          color: white;
          &:hover { background-color: #ff5252; }
        `;
      case "secondary":
        return `
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text.secondary};
          border: 1px solid ${theme.colors.background};
          &:hover { background-color: ${theme.colors.background}; }
        `;
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
          color: white;
          &:hover { transform: translateY(-1px); }
        `;
    }
  }}
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
  padding: 15px 30px;
  font-size: 1rem;
  max-width: 200px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  transform: translateZ(0); /* GPU 가속 */
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.surface};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.surface};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.surface};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.surface};
  border-radius: 8px;
  font-size: 1rem;
  background: ${theme.colors.surface};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const categoryNames: { [key: string]: string } = {
  sandwiches: "샌드위치",
  salads: "샐러드",
  panini: "파니니",
  lunchbox: "샌드위치 도시락 박스",
  beverages: "음료",
  desserts: "디저트",
  meals: "식사류",
};

interface MenuFormData {
  name: string;
  category: string;
  description: string;
  price: string;
  half_price: string;
  image: string;
  size: string[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [menusLoading, setMenusLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuFormData>({
    name: "",
    category: "sandwiches",
    description: "",
    price: "",
    half_price: "",
    image: "",
    size: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 최적화된 onChange 핸들러들
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, name: e.target.value }));
    },
    [],
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, category: e.target.value }));
    },
    [],
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, description: e.target.value }));
    },
    [],
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 숫자 외 문자 제거 (type="number"는 휠 스크롤로 값이 바뀌어 text로 사용)
      const price = e.target.value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, price }));
    },
    [],
  );

  const handleHalfPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const half_price = e.target.value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, half_price }));
    },
    [],
  );

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        size: e.target.value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      }));
    },
    [],
  );

  const loadMenus = async () => {
    try {
      setMenusLoading(true);
      const response = await fetch("/api/admin/menus");
      const result = await response.json();

      if (response.ok) {
        setMenus(result.data);
      } else {
        console.error("Failed to load menus:", result.error);
      }
    } catch (error) {
      console.error("Error loading menus:", error);
    } finally {
      setMenusLoading(false);
    }
  };

  // 로그인 여부는 proxy에서 확인하고, 여기서는 사용자 정보 표시와 관리자 계정 확인 후 메뉴를 불러옴
  useEffect(() => {
    const init = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          router.push("/thisisforadmin/login");
          return;
        }

        if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          await supabase.auth.signOut();
          router.push("/thisisforadmin/login");
          return;
        }

        setUser(user);
        loadMenus();
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/thisisforadmin/login");
      } finally {
        setLoading(false);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddMenu = () => {
    setEditingMenu(null);
    setFormData({
      name: "",
      category: "sandwiches",
      description: "",
      price: "",
      half_price: "",
      image: "",
      size: [],
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditMenu = (menu: MenuItem) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      category: menu.category,
      description: menu.description || "",
      price: menu.price.toString(),
      half_price: menu.halfPrice?.toString() || "",
      image: menu.image || "",
      size: Array.isArray(menu.size) ? menu.size : menu.size ? [menu.size] : [],
    });
    setImageFile(null);
    setImagePreview(menu.image || null);
    setShowModal(true);
  };

  const handleDeleteMenu = async (menuId: string) => {
    if (!confirm("정말로 이 메뉴를 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/admin/menus/${menuId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadMenus();
      } else {
        const result = await response.json();
        alert(`삭제 실패: ${result.error}`);
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("메뉴 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기가 5MB를 초과할 수 없습니다.");
        return;
      }

      setImageFile(file);

      // 이전 프리뷰 URL 정리 (메모리 누수 방지)
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }

      // FileReader 대신 URL.createObjectURL 사용 (더 빠름)
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image || null;

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();

      if (response.ok) {
        return result.data.url;
      } else {
        alert(`이미지 업로드 실패: ${result.error}`);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("메뉴명과 가격은 필수입니다.");
      return;
    }

    setSubmitting(true);

    try {
      // 이미지 업로드
      const imageUrl = await uploadImage();
      if (imageFile && !imageUrl) {
        setSubmitting(false);
        return;
      }

      const menuData = {
        name: formData.name,
        category: formData.category,
        description: formData.description || null,
        price: Number(formData.price),
        half_price: formData.half_price ? Number(formData.half_price) : null,
        image: imageUrl,
        size: formData.size.length > 0 ? formData.size : null,
      };

      const url = editingMenu
        ? `/api/admin/menus/${editingMenu.id}`
        : "/api/admin/menus";

      const method = editingMenu ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      const result = await response.json();

      if (response.ok) {
        setShowModal(false);
        await loadMenus();
        alert(
          editingMenu ? "메뉴가 수정되었습니다." : "메뉴가 추가되었습니다.",
        );
      } else {
        const errorMsg = result.details
          ? `${result.error} (${result.details})`
          : result.error;
        alert(`실패: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error submitting menu:", error);
      alert("처리 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/thisisforadmin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || "A";

  return (
    <Container>
      <Header>
        <Title>관리자 대시보드</Title>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>

      <Content>
        <MenuSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserInfo>
            <UserAvatar>{userInitial}</UserAvatar>
            <UserDetails>
              <h3>관리자</h3>
              <p>{user.email}</p>
            </UserDetails>
          </UserInfo>
        </MenuSection>
        <MenuSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionTitle>🍽️ 메뉴 관리</SectionTitle>
          <AddButton onClick={handleAddMenu}>+ 새 메뉴 추가</AddButton>

          {menusLoading ? (
            <LoadingSpinner />
          ) : (
            <MenuGrid>
              {menus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {menu.image && <MenuImage src={menu.image} alt={menu.name} />}
                  <MenuCategory>
                    {categoryNames[menu.category] || menu.category}
                  </MenuCategory>
                  <MenuName>{menu.name}</MenuName>
                  {menu.description && (
                    <MenuDescription>{menu.description}</MenuDescription>
                  )}
                  <MenuPrice>
                    {menu.price.toLocaleString()}원
                    {menu.halfPrice && (
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginLeft: "8px",
                        }}
                      >
                        (하프: {menu.halfPrice.toLocaleString()}원)
                      </span>
                    )}
                  </MenuPrice>
                  <ButtonGroup>
                    <Button onClick={() => handleEditMenu(menu)}>수정</Button>
                    <Button
                      $variant="danger"
                      onClick={() => handleDeleteMenu(menu.id)}
                    >
                      삭제
                    </Button>
                  </ButtonGroup>
                </MenuCard>
              ))}
            </MenuGrid>
          )}
        </MenuSection>
        \
        {showModal && (
          <Modal
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>
                {editingMenu ? "메뉴 수정" : "새 메뉴 추가"}
              </ModalTitle>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">메뉴명 *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select
                    id="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    required
                  >
                    {Object.entries(categoryNames).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="메뉴 설명을 입력하세요"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="price">가격 *</Label>
                  <Input
                    id="price"
                    type="text"
                    inputMode="numeric"
                    value={formData.price}
                    onChange={handlePriceChange}
                    placeholder="원"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="half_price">하프 가격</Label>
                  <Input
                    id="half_price"
                    type="text"
                    inputMode="numeric"
                    value={formData.half_price}
                    onChange={handleHalfPriceChange}
                    placeholder="원 (선택사항)"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="image">메뉴 이미지</Label>
                  <FileInput
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <ImagePreview src={imagePreview} alt="미리보기" />
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="size">사이즈 (쉼표로 구분)</Label>
                  <Input
                    id="size"
                    type="text"
                    value={formData.size.join(", ")}
                    onChange={handleSizeChange}
                    placeholder="Full, Half"
                  />
                </FormGroup>

                <ModalButtonGroup>
                  <Button
                    type="button"
                    $variant="secondary"
                    onClick={() => setShowModal(false)}
                    disabled={submitting}
                  >
                    취소
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "처리 중..." : editingMenu ? "수정" : "추가"}
                  </Button>
                </ModalButtonGroup>
              </form>
            </ModalContent>
          </Modal>
        )}
      </Content>
    </Container>
  );
}
