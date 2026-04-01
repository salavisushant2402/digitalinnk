import styled from 'styled-components';
import { Tag } from 'lucide-react';
import { SPECIAL_OFFERS } from '../constants';

const Panel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #f0e0c0;
  padding: 20px;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const PanelTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
`;

const OffersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OfferRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const BADGE_STYLES = {
  'apples-10-off':  { bg: '#d8f3dc', color: '#1a4731', border: '#1a473133' },
  'soup-bread-deal':{ bg: '#fde8d5', color: '#e07b39', border: '#e07b3933' },
  'milk-3for2':     { bg: '#e8f0fd', color: '#2d5da1', border: '#2d5da133' },
};

const Badge = styled.span`
  flex-shrink: 0;
  font-family: 'DM Mono', monospace;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid ${({ $offerId }) => BADGE_STYLES[$offerId]?.border ?? '#cccccc'};
  background: ${({ $offerId }) => BADGE_STYLES[$offerId]?.bg ?? '#f5f5f5'};
  color: ${({ $offerId }) => BADGE_STYLES[$offerId]?.color ?? '#555555'};
  margin-top: 2px;
  letter-spacing: 0.04em;
`;

const OfferDesc = styled.p`
  font-size: 0.875rem;
  color: #555555;
  line-height: 1.4;
`;

export default function SpecialOffersPanel() {
  return (
    <Panel>
      <PanelHeader>
        <Tag size={16} color="#e07b39" strokeWidth={2.5} />
        <PanelTitle>This Week's Offers</PanelTitle>
      </PanelHeader>

      <OffersList>
        {SPECIAL_OFFERS.map((offer) => (
          <OfferRow key={offer.id}>
            <Badge $offerId={offer.id}>{offer.badge}</Badge>
            <OfferDesc>{offer.description}</OfferDesc>
          </OfferRow>
        ))}
      </OffersList>
    </Panel>
  );
}
