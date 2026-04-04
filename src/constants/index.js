const getQty = (cart, productId) => {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      return cart[i].quantity;
    }
  }
  return 0;
};

const getPrice = (products, productId) => {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      return products[i].price;
    }
  }
  return 0;
};

export const SPECIAL_OFFERS = [
  {
    id: 'cheese-bogof',
    name: 'Cheese Buy One Get One Free',
    description: 'Buy a block of cheese, get a second block free',
    badge: 'BOGOF',
    calculate: function (cart, products) {
      var qty = getQty(cart, 'cheese');
      var price = getPrice(products, 'cheese');

      // Every 2nd item is free
      var freeItems = Math.floor(qty / 2);
      return freeItems * price;
    },
  },

  {
    id: 'soup-bread-deal',
    name: 'Soup & Bread Deal',
    description: 'Buy a tin of soup, get a loaf of bread half price',
    badge: '½ PRICE',
    calculate: function (cart, products) {
      var soupQty = getQty(cart, 'soup');
      var breadQty = getQty(cart, 'bread');
      var breadPrice = getPrice(products, 'bread');

      var eligibleDeals = Math.min(soupQty, breadQty);
      var saving = eligibleDeals * breadPrice * 0.5;

      return Number(saving.toFixed(2));
    },
  },

  {
    id: 'butter-third-off',
    name: 'Butter ⅓ Off',
    description: 'Get a third off all butter this week',
    badge: '⅓ OFF',
    calculate: function (cart, products) {
      var qty = getQty(cart, 'butter');
      var price = getPrice(products, 'butter');

      var saving = qty * price * (1 / 3);

      return Number(saving.toFixed(2));
    },
  },
];