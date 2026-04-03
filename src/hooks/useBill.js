import { useAppSelector } from './useRedux';

const EMPTY_BILL = {
  lines: [],
  subtotal: 0,
  totalSavings: 0,
  total: 0,
  offerLines: [],
};

export const useBill = () => {
    const items = useAppSelector((state) => state.cart.items);
    const bill  = useAppSelector((state) => state.cart.bill);

    if (items.length === 0 || !bill) return EMPTY_BILL;
    return {
      subtotal:bill.subtotal,
      totalSavings: bill.savings,
      total:bill.total,
      offerLines:(bill.offers || []).map((o) => ({
        offerId: o.id,
        label:   o.description,
        saving:  o.saving,
      })),
    };
};