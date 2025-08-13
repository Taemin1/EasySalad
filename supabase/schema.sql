-- EasySalad 데이터베이스 스키마
-- Supabase 콘솔의 SQL Editor에서 실행해주세요

-- 주문 테이블
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    
    -- 배송 정보
    delivery_address TEXT NOT NULL,
    delivery_detail_address TEXT,
    delivery_zip_code VARCHAR(10),
    delivery_date DATE NOT NULL,
    delivery_time VARCHAR(20) NOT NULL,
    
    -- 주문 정보
    total_amount INTEGER NOT NULL,
    delivery_fee INTEGER DEFAULT 3000,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, confirmed, preparing, delivered, cancelled
    
    -- 결제 정보
    payment_id VARCHAR(100), -- 포트원 결제 ID
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed, cancelled
    payment_method VARCHAR(50), -- card, transfer, etc
    paid_at TIMESTAMP WITH TIME ZONE,
    
    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 주문 상품 테이블
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_id VARCHAR(50) NOT NULL,
    menu_name VARCHAR(200) NOT NULL,
    menu_category VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 메뉴 테이블 (현재는 코드에서 관리하지만 나중에 DB로 이관 가능)
CREATE TABLE IF NOT EXISTS menus (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 주문 번호 생성을 위한 시퀀스
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- 주문 번호 자동 생성 함수
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    next_val INTEGER;
    today_str TEXT;
BEGIN
    SELECT nextval('order_number_seq') INTO next_val;
    SELECT TO_CHAR(NOW(), 'YYYYMMDD') INTO today_str;
    RETURN today_str || LPAD(next_val::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;


-- 주문 생성 시 자동으로 주문번호 생성하는 트리거
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER trigger_update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 주문을 생성할 수 있도록 정책 설정
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read menus" ON menus FOR SELECT USING (true);

-- 샘플 메뉴 데이터 삽입 (선택사항)
INSERT INTO menus (id, name, description, price, category, is_available) VALUES 
('chicken-salad', '치킨 샐러드', '신선한 채소와 그릴드 치킨이 어우러진 건강한 샐러드', 12000, 'salads', true),
('tuna-salad', '참치 샐러드', '참치와 신선한 채소로 만든 단백질이 풍부한 샐러드', 11000, 'salads', true),
('club-sandwich', '클럽 샌드위치', '베이컨, 치킨, 채소가 들어간 푸짐한 샌드위치', 9500, 'sandwiches', true),
('lunchbox-1', '프리미엄 도시락 1호', '균형잡힌 영양과 맛을 담은 프리미엄 도시락', 15000, 'lunchbox', true)
ON CONFLICT (id) DO NOTHING;