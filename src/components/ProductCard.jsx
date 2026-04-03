import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Plus, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { addItem, removeItem } from '../redux/actions/cartActions';

const OFFER_PRODUCTS = new Set(['cheese', 'soup', 'butter']);

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid ${({ $active }) => ($active ? '#1a4731' : '#f0e0c0')};
  box-shadow: ${({ $active }) =>
    $active ? '0 4px 20px rgba(26, 71, 49, 0.12)' : 'none'};
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    ${({ $active }) =>
      !$active &&
      css`
        border-color: rgba(26, 71, 49, 0.35);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      `}
  }
`;

const ActiveBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #1a4731;
  border-radius: 16px 16px 0 0;
`;

const OfferBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e07b39;
  color: #ffffff;
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  letter-spacing: 0.06em;
  z-index: 10;
`;

const Body = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
  background: #f9f2e3;
`;

const Category = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ProductName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 2px;
`;

const ProductDesc = styled.p`
  font-size: 0.75rem;
  color: #888888;
  margin-top: 2px;
  flex: 1;
`;

const PriceRow = styled.div`
  margin: 12px 0;
`;

const Price = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a4731;
`;

const PriceUnit = styled.span`
  font-size: 0.7rem;
  color: #aaaaaa;
  margin-left: 4px;
`;

const AddButton = styled.button`
  width: 100%;
  background: #1a4731;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 10px 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.15s ease;

  &:hover {
    background: #2d6a4f;
  }
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fdfaf4;
  border-radius: 12px;
  padding: 4px;
`;

const QtyButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ $variant }) => ($variant === 'add' ? 'transparent' : '#f0e0c0')};
  background: ${({ $variant }) => ($variant === 'add' ? '#1a4731' : '#ffffff')};
  color: ${({ $variant }) => ($variant === 'add' ? '#ffffff' : '#333333')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s, color 0.15s;

  &:hover {
    ${({ $variant }) =>
      $variant === 'add'
        ? css`background: #2d6a4f;`
        : css`border-color: #c0392b; color: #c0392b;`}
  }
`;

const QtyNum = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a4731;
  width: 32px;
  text-align: center;
`;

export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(
    (state) =>
      state.cart.items.find((i) => i.productId === product.id)?.quantity ?? 0
  );

  const handleAdd = useCallback(
    () => dispatch(addItem(product.id)),
    [dispatch, product.id]
  );
  
  const handleRemove = useCallback(
    () => dispatch(removeItem(product.id)),
    [dispatch, product.id]
  );

  return (
    <Card $active={quantity > 0}>
      {OFFER_PRODUCTS.has(product.id) && <OfferBadge>OFFER</OfferBadge>}
      {quantity > 0 && <ActiveBar />}

      <Body>
        <ProductImage src={product.image} alt={product.name} />

        <Category>{product.category}</Category>
        <ProductName>{product.name}</ProductName>
        <ProductDesc>{product.description}</ProductDesc>

        <PriceRow>
          <Price>£{product.price.toFixed(2)}</Price>
          <PriceUnit>/ {product.unit}</PriceUnit>
        </PriceRow>

        {quantity === 0 ? (
          <AddButton onClick={handleAdd} aria-label={`Add ${product.name} to basket`}>
            <Plus size={15} strokeWidth={2.5} />
            Add to Basket
          </AddButton>
        ) : (
          <QtyControls>
            <QtyButton
              $variant="remove"
              onClick={handleRemove}
              aria-label={`Remove one ${product.name}`}
            >
              <Minus size={14} strokeWidth={2.5} />
            </QtyButton>
            <QtyNum>{quantity}</QtyNum>
            <QtyButton
              $variant="add"
              onClick={handleAdd}
              aria-label={`Add another ${product.name}`}
            >
              <Plus size={14} strokeWidth={2.5} />
            </QtyButton>
          </QtyControls>
        )}
      </Body>
    </Card>
  );
}
