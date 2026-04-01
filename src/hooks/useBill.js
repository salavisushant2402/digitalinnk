import { useMemo } from 'react';
import { useAppSelector } from './useRedux';
import { calculateBill } from '../utils/pricing';
import { PRODUCTS, SPECIAL_OFFERS } from '../constants';

const EMPTY_BILL = {
  lines: [],
  subtotal: 0,
  totalSavings: 0,
  total: 0,
  offerLines: [],
};

export const useBill = () => {
  const items = useAppSelector((state) => state.cart.items);

  return useMemo(() => {
    if (items.length === 0) return EMPTY_BILL;
    return calculateBill(items, PRODUCTS, SPECIAL_OFFERS);
  }, [items]);
};
