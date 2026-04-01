import styled, { keyframes } from 'styled-components';
import { ShoppingBasket } from 'lucide-react';
import { useAppSelector } from '../hooks/useRedux';
import { getCartItemCount } from '../utils/pricing';

const pop = keyframes`
  0%   { transform: scale(0.9); }
  60%  { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledHeader = styled.header`
  background-color: #1a4731;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
`;

const Inner = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrap = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
`;

const BrandTagline = styled.p`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 2px;
`;

const CartBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 8px 16px;
  animation: ${pop} 0.2s ease-out;
`;

const CartCount = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
`;

export default function Header() {
  const items = useAppSelector((state) => state.cart.items);
  const count = getCartItemCount(items);

  return (
    <StyledHeader>
      <Inner>
        <Brand>
          <IconWrap>
            <ShoppingBasket size={22} color="#ffffff" strokeWidth={2} />
          </IconWrap>
          <BrandText>
            <BrandName>Digitalinnk Smart Basket</BrandName>
            <BrandTagline>Fresh deals, every week</BrandTagline>
          </BrandText>
        </Brand>

        {count > 0 && (
          <CartBadge>
            <ShoppingBasket size={15} color="rgba(255,255,255,0.8)" />
            <CartCount>
              {count} {count === 1 ? 'item' : 'items'}
            </CartCount>
          </CartBadge>
        )}
      </Inner>
    </StyledHeader>
  );
}
