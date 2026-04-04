import styled, { keyframes } from 'styled-components';
import { ShoppingBag, TrendingDown, Receipt, Trash2 } from 'lucide-react';
import { useBill } from '../hooks/useBill';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { clearCart } from '../redux/actions/cartActions';
import { formatCurrency } from '../utils/pricing';

const fadeUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const Panel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #f0e0c0;
  overflow: hidden;
  animation: ${fadeUp} 0.3s ease-out;
`;

const EmptyPanel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #f0e0c0;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
`;

const EmptyTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #aaaaaa;
  margin-top: 16px;
`;

const EmptySubtitle = styled.p`
  font-size: 0.8rem;
  color: #aaaaaa;
  margin-top: 4px;
`;

const PanelHeader = styled.div`
  background: #1a4731;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PanelHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PanelTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
`;

const ClearBtn = styled.button`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.75rem;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #ffffff;
  }
`;

const PanelBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionLabel = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #aaaaaa;
  margin-bottom: 8px;
`;

const LineRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const LineLabel = styled.span`
  font-size: 0.875rem;
  color: #555555;
`;

const LineQty = styled.span`
  color: #aaaaaa;
  margin-left: 4px;
`;

const LineMoney = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.875rem;
  color: #333333;
`;

const Divider = styled.div`
  border-top: 1px solid #f0e0c0;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const SubtotalLabel = styled.span`
  font-size: 0.875rem;
  color: #888888;
`;

const SubtotalMoney = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.875rem;
  color: #555555;
`;

const OfferBox = styled.div`
  background: #d8f3dc;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OfferBoxHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const OfferBoxLabel = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a4731;
  font-weight: 700;
`;

const AlertBoxLabel = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #d9666b;
  font-weight: 700;
`;

const OfferLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const OfferLineLabel = styled.span`
  font-size: 0.875rem;
  color: #2d6a4f;
`;

const OfferLineSaving = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1a4731;
`;

const SavingsCallout = styled.p`
  text-align: right;
  font-size: 0.75rem;
  color: #1a4731;
`;

const SavingsAmount = styled.span`
  font-family: 'DM Mono', monospace;
  font-weight: 700;
`;

const TotalRow = styled.div`
  border-top: 2px solid #1a1a1a;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
`;

const TotalAmount = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a4731;
`;

const CheckoutBtn = styled.button`
  width: 100%;
  background: #e07b39;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 12px 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #c96a28;
  }
`;

export default function BillPanel() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const products = useAppSelector((state) => state.products.products);
  const bill = useBill();
  const MAX_LIMIT = 20;
  let range = MAX_LIMIT*90/100;

  if (cartItems.length === 0) {
    return (
      <EmptyPanel>
        <ShoppingBag size={48} color="#e8dfc8" strokeWidth={1.5} />
        <EmptyTitle>Your basket is empty</EmptyTitle>
        <EmptySubtitle>Add some products to see your bill</EmptySubtitle>
      </EmptyPanel>
    );
  }

  return (
    <Panel>
      <PanelHeader>
        <PanelHeaderLeft>
          <Receipt size={18} color="rgba(255,255,255,0.8)" />
          <PanelTitle>Your Bill</PanelTitle>
        </PanelHeaderLeft>
        <ClearBtn onClick={() => dispatch(clearCart())} aria-label="Clear basket">
          <Trash2 size={13} strokeWidth={2} />
          Clear
        </ClearBtn>
      </PanelHeader>

      <PanelBody>
        <div>
          <SectionLabel>Items</SectionLabel>
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            const lineTotal = product.price * item.quantity;
            return (
              <LineRow key={item.productId}>
                <LineLabel>
                  {product.name}
                  <LineQty>x {item.quantity}</LineQty>
                </LineLabel>
                <LineMoney>{formatCurrency(lineTotal)}</LineMoney>
              </LineRow>
            );
          })}
        </div>

        <Divider>
          <SubtotalLabel>Subtotal</SubtotalLabel>
          <SubtotalMoney>{formatCurrency(bill.subtotal)}</SubtotalMoney>
        </Divider>

        {bill.offerLines.length > 0 && (
          <OfferBox>
            <OfferBoxHeader>
              <TrendingDown size={14} color="#1a4731" strokeWidth={2.5} />
              <OfferBoxLabel>Savings Applied</OfferBoxLabel>
            </OfferBoxHeader>
            {bill.offerLines.map((offer) => (
              <OfferLine key={offer.offerId}>
                <OfferLineLabel>{offer.label}</OfferLineLabel>
                <OfferLineSaving>-{formatCurrency(offer.saving)}</OfferLineSaving>
              </OfferLine>
            ))}
          </OfferBox>
        )}

        {bill.totalSavings > 0 && (
          <SavingsCallout>
            You save{' '}
            <SavingsAmount>{formatCurrency(bill.totalSavings)}</SavingsAmount> today
          </SavingsCallout>
        )}

        <TotalRow>
          <TotalLabel>Total</TotalLabel>
          <TotalAmount>{formatCurrency(bill.total)}</TotalAmount>
        </TotalRow>

        {
          bill.total >= range && bill.total < MAX_LIMIT && (<AlertBoxLabel>
          You have reached 90% of your daily budget.
        </AlertBoxLabel>)
        }

        <CheckoutBtn onClick={() => alert('Checkout not implemented in this demo')}>
          Proceed to Checkout
        </CheckoutBtn>
      </PanelBody>
    </Panel>
  );
}
