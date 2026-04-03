/**
 * Format pence to a currency string  e.g. 135 → "£1.35"
 */
export const formatCurrency = (pence) => {
  return `£${(pence).toFixed(2)}`;
};

/**
 * Raw subtotal before any offers
 */
export const calculateSubtotal = (cart, products) => {
  return cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);
};

/**
 * Full bill including special offers
 * Returns { lines, subtotal, totalSavings, total, offerLines }
 */
export const calculateBill = (cart, products, offers) => {
  const itemsInCart = cart.filter((i) => i.quantity > 0);

  const productLines = itemsInCart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      label: `${product.name} × ${item.quantity}`,
      amount: product.price * item.quantity,
      type: 'product',
    };
  });

  const subtotal = productLines.reduce((s, l) => s + l.amount, 0);

  const offerLines = offers
    .map((offer) => ({
      offerId: offer.id,
      label: offer.name,
      saving: offer.calculate(itemsInCart, products),
    }))
    .filter((o) => o.saving > 0);

  const totalSavings = offerLines.reduce((s, o) => s + o.saving, 0);

  return {
    lines: [
      ...productLines,
      ...offerLines.map((o) => ({
        label: o.label,
        amount: -o.saving,
        type: 'offer',
      })),
    ],
    subtotal,
    totalSavings,
    total: subtotal - totalSavings,
    offerLines,
  };
};

/**
 * Total number of items in cart
 */
export const getCartItemCount = (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);
