-- Supabase menus 테이블에 맞춘 업데이트된 메뉴 데이터
-- 기존 데이터 삭제 후 새 데이터 삽입

DELETE FROM menus;

-- 샌드위치 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('s1', '불고기', 'sandwiches', '달콤한 불고기와 신선한 야채의 조화', '/sandwich/bulgogi-sandwich.png', 8900, true),
('s2', '치킨바질', 'sandwiches', '바질 향이 가득한 치킨 샌드위치', '/sandwich/chicken-basil-sandwich.png', 8500, true),
('s3', '리코타 단호박', 'sandwiches', '부드러운 리코타 치즈와 달콤한 단호박', '/sandwich/danhobak-sandwich.png', 8500, true),
('s4', '통새우', 'sandwiches', '탱글탱글한 통새우가 가득', '/sandwich/shrimp-sandwich.png', 7500, true),
('s5', '에그양배추', 'sandwiches', '고소한 계란과 아삭한 양배추', '/sandwich/egg-cabbage-sandwich.png', 6500, true),
('s6', '클럽', 'sandwiches', '클래식한 클럽 샌드위치', '/sandwich/club-sandwich.png', 5900, true),
('s7', '땅콩 딸기잼', 'sandwiches', '고소한 땅콩버터와 달콤한 딸기잼', '/sandwich/peanut-strawberry-jam-sandwich.jpg', 2700, true),
('s8', '모닝빵 에그', 'sandwiches', '부드러운 모닝빵과 계란', '/sandwich/morning-bread-egg-sandwich.jpg', 2700, true),
('s9', '훈제오리 당근', 'sandwiches', '훈제오리와 아삭한 당근의 조화', '/sandwich/smoked-duck-carrot.jpg', 8500, true),
('s10', '불닭', 'sandwiches', '매콤한 불닭소스', '/sandwich/buldak-sandwich.jpg', 8500, true),
('s11', '치아바타 햄치즈', 'sandwiches', '치아바타 빵에 햄과 치즈', '/sandwich/ciabatta-ham-cheese-sandwich.jpg', 6900, true),
('s12', '대만풍', 'sandwiches', '대만식 특제 샌드위치', '/sandwich/daeman-sandwich.jpg', 4900, true),
('s13', '햄치즈', 'sandwiches', '햄치즈 샌드위치', '/sandwich/hamcheese-sandwich.png', 2700, true),
('s14', '치킨텐더', 'sandwiches', '치킨텐더 샌드위치', '/sandwich/chicken-tender-sandwich.jpg', 6900, true);

-- 샐러드 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('sa1', '모둠', 'salads', '다양한 재료의 모듬 샐러드', '/salad/mixed-salad.png', 9900, true),
('sa2', '새우', 'salads', '탱글탱글한 새우 샐러드', '/salad/shrimp-salad.png', 9500, true),
('sa3', '불고기', 'salads', '달콤한 불고기 샐러드', '/salad/bulgogi-salad.png', 9500, true),
('sa4', '멕시칸', 'salads', '매콤한 멕시칸 샐러드', '/salad/mexican-salad.png', 9500, true),
('sa5', '훈제연어', 'salads', '고급스러운 훈제연어 샐러드', '/salad/smoked-salmon-salad.png', 9500, true),
('sa6', '리코타치즈', 'salads', '부드러운 리코타 치즈 샐러드', '/salad/ricotta-salad.png', 9500, true),
('sa7', '돼지고기', 'salads', '고소한 돼지고기 샐러드', '/salad/pork-salad.png', 8900, true),
('sa8', '지중해풍파스타', 'salads', '올리브와 페타치즈의 지중해 파스타 샐러드', '/salad/mediterranean-pasta-salad.png', 8900, true),
('sa9', '훈제오리단호박', 'salads', '고소한 훈제오리와 달콤한 단호박 샐러드', '/salad/smoked-duck-pumpkin-salad.png', 7900, true),
('sa10', '가라아게', 'salads', '바삭한 가라아게 치킨 샐러드', '/salad/garage-salad.png', 7900, true),
('sa11', '닭가슴살', 'salads', '담백한 닭가슴살 샐러드', '/salad/chicken-salad.png', 7900, true),
('sa12', '새우 포케', 'salads', '새우 포케 샐러드', '/salad/shrimp-poke-salad.png', 12000, true),
('sa13', '불고기 포케', 'salads', '불고기 포케 샐러드', '/salad/bulgogi-poke-salad.png', 12000, true),
('sa14', '훈제연어 포케', 'salads', '훈제연어 포케 샐러드', '/salad/smoked-salmon-poke-salad.png', 12000, true),
('sa15', '훈제오리 단호박 포케', 'salads', '훈제오리 단호박 포케 샐러드', '/salad/smoked-duck-pumpkin-poke-salad.png', 10500, true),
('sa16', '새우 분짜', 'salads', '새우 분짜 샐러드', '/salad/shrimp-bun-cha-salad.png', 12000, true),
('sa18', '불고기 분짜', 'salads', '불고기 분짜 샐러드', '/salad/bulgogi-bun-cha-salad.png', 12000, true),
('sa17', '돼지고기 분짜', 'salads', '돼지고기 분짜 샐러드', '/salad/pork-bun-cha-salad.png', 11500, true),
('sa19', '훈제오리 단호박 분짜', 'salads', '훈제오리 단호박 분짜 샐러드', '/salad/smoked-duck-pumpkin-bun-cha-salad.png', 10500, true);

-- 파니니 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('p1', '아보카도 새우 파니니', 'panini', '아보카도와 신선한 새우의 파니니', '/panini/avocado-shrimp-panini.png', 16000, true),
('p2', '불닭 파니니', 'panini', '매콤한 불닭 파니니', '/panini/buldak-panini.png', 14900, true),
('p3', '불고기 파니니', 'panini', '달콤한 불고기 파니니', '/panini/bulgogi-panini.png', 14900, true),
('p4', '훈제오리 파니니', 'panini', '고소한 훈제오리 파니니', '/panini/smoked-duck-panini.png', 14900, true),
('p5', '본레스햄 파니니', 'panini', '본레스햄 파니니', '/panini/boneless-ham-panini.png', 13900, true),
('p6', '용산 파니니', 'panini', '용산 스타일 파니니', '/panini/yongsan-panini.png', 9500, true),
('p7', '치킨바질 파니니', 'panini', '바질 향이 가득한 치킨 파니니', '/panini/chicken-basil-panini.png', 14900, true);

-- 도시락 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('l1', '도시락 박스 1', 'lunchbox', '컵과일 + 샌드위치 + 쿠키 + 팩 음료', '/lunchbox/lunchbox-1.png', 9500, true),
('l2', '도시락 박스 2', 'lunchbox', '컵과일 + 샌드위치 + 쿠키 + 팩 음료', '/lunchbox/lunchbox-2.png', 13000, true),
('l3', '도시락 박스 3', 'lunchbox', '다양한 구성 가능, 매장 문의', '/lunchbox/lunchbox-3.png', 99999, true);

-- 음료 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('b1', '아이스 아메리카노', 'beverages', '캔 포장, 500ml', NULL, 4500, true),
('b2', '아이스 라떼', 'beverages', '캔 포장, 500ml', NULL, 4900, true),
('b3', '딸기 바나나', 'beverages', '캔 포장, 500ml', NULL, 5900, true),
('b4', '블루베리 바나나', 'beverages', '캔 포장, 500ml', NULL, 5900, true),
('b5', '아몬드 바나나', 'beverages', '캔 포장, 500ml', NULL, 5900, true),
('b6', '아보카도 바나나', 'beverages', '캔 포장, 500ml', NULL, 5900, true),
('b7', '디톡스주스', 'beverages', '건강한 디톡스주스 (400ml)', '/beverage/detox-juice.png', 6500, true),
('b8', '오렌지 착즙주스', 'beverages', '신선한 오렌지 착즙주스 (200ml)', '/beverage/orange-juice.png', 5900, true),
('b9', '자몽 착즙주스', 'beverages', '상큼한 자몽 착즙주스 (200ml)', NULL, 5900, true),
('b10', '몽지 착즙주스', 'beverages', '오렌지 + 자몽 믹스 (200ml)', NULL, 5900, true);

-- 디저트 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('d1', '그릭 요거트 (꿀&그래놀라)', 'desserts', '진한 그릭 요거트 (70g)', '/dessert/greek-yogurt.jpg', 3900, true),
('d2', '컵과일 (half)', 'desserts', '딸기, 블루베리, 라즈베리 등', '/dessert/cup-fruit.png', 3900, true),
('d3', '컵과일 (full)', 'desserts', '딸기, 블루베리, 라즈베리 등', '/dessert/cup-fruit.png', 4900, true);

-- 케이터링 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('c1', '박스 케이터링', 'catering', '(문의 필요) 파티와 모임을 위한 케이터링 박스', '/catering/breakfast-pack-catering.jpg', 99999, true),
('c2', '회사 조식 서비스', 'catering', '(문의 필요) 직장인을 위한 건강한 조식 서비스', '/catering/breakfast-full-catering.jpg', 99999, true),
('c3', '벌크과일 박스', 'catering', '(문의 필요) 대용량 과일 박스', '/catering/fruit-catering1.jpg', 99999, true),
('c4', '결제 테스트', 'catering', '결제 테스트', NULL, 100, true);

-- 식사류 메뉴 추가
INSERT INTO menus (id, name, category, description, image, price, is_available) VALUES
('m1', '에그마요 유부초밥', 'meals', '에그마요 유부초밥', '/meals/eggmayo.png', 4200, true),
('m2', '게살 유부초밥', 'meals', '게살 유부초밥', '/meals/crab.png', 4200, true),
('m3', '참치 유부초밥', 'meals', '참치 유부초밥', '/meals/tuna.png', 4200, true),
('m4', '제육 유부초밥', 'meals', '제육 유부초밥', '/meals/yangnyeom.png', 4500, true),
('m5', '김치스팸 유부초밥', 'meals', '김치스팸 유부초밥', '/meals/kimchi-spam.png', 4500, true),
('m6', '불고기 유부초밥', 'meals', '불고기 유부초밥', '/meals/bulgogi.png', 4500, true);