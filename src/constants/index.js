export const PRODUCTS = [
  {
    id: 'soup',
    name: 'Soup',
    price: 65,
    unit: 'tin',
    category: 'Pantry',
    description: 'Cream of tomato, per tin',
    image: 'https://sugarspunrun.com/wp-content/uploads/2024/12/Vegetable-soup-recipe-2-of-2.jpg',
  },
  {
    id: 'bread',
    name: 'Bread',
    price: 80,
    unit: 'loaf',
    category: 'Bakery',
    description: 'White sliced, per loaf',
    image: 'https://www.acouplecooks.com/wp-content/uploads/2025/01/Homemade-Sandwich-Bread-0008.jpg',
  },
  {
    id: 'milk',
    name: 'Milk',
    price: 130,
    unit: 'bottle',
    category: 'Dairy',
    description: 'Semi-skimmed, per bottle',
    image: 'https://dairynutrition.ca/sites/dairynutrition/files/image_file_browser/dn_article/2023-03/shutterstock_4305538_1182x788px.jpg',
  },
  {
    id: 'apples',
    name: 'Apples',
    price: 100,
    unit: 'bag',
    category: 'Produce',
    description: 'Royal Gala, per bag',
    image: 'https://images.everydayhealth.com/images/diet-nutrition/apples-101-about-1440x810.jpg?sfvrsn=f86f2644_5',
  },
  {
    id: 'butter',
    name: 'Butter',
    price: 150,
    unit: 'pack',
    category: 'Dairy',
    description: 'Unsalted, per pack',
    image: 'https://cdn.britannica.com/27/122027-050-EAA86783/Butter.jpg',
  },
  {
    id: 'eggs',
    name: 'Eggs',
    price: 210,
    unit: 'dozen',
    category: 'Dairy',
    description: 'Free range, per dozen',
    image: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg',
  },
];

const getQty = (cart, productId) =>
  cart.find((i) => i.productId === productId)?.quantity ?? 0;

const getPrice = (products, productId) =>
  products.find((p) => p.id === productId)?.price ?? 0;

export const SPECIAL_OFFERS = [
  {
    id: 'apples-10-off',
    name: 'Apples 10% Off',
    description: 'Apples are 10% off this week',
    badge: '10% OFF',
    calculate: (cart, products) => {
      const qty = getQty(cart, 'apples');
      const price = getPrice(products, 'apples');
      return Math.round(qty * price * 0.1);
    },
  },
  {
    id: 'soup-bread-deal',
    name: 'Soup & Bread Deal',
    description: 'Buy 2 tins of soup, get a loaf of bread half price',
    badge: '1/2 PRICE',
    calculate: (cart, products) => {
      const soupQty = getQty(cart, 'soup');
      const breadQty = getQty(cart, 'bread');
      const breadPrice = getPrice(products, 'bread');
      const eligibleDeals = Math.min(Math.floor(soupQty / 2), breadQty);
      return Math.round(eligibleDeals * breadPrice * 0.5);
    },
  },
  {
    id: 'milk-3for2',
    name: 'Milk 3 for 2',
    description: 'Buy 3 bottles of milk, pay for 2',
    badge: '3 FOR 2',
    calculate: (cart, products) => {
      const qty = getQty(cart, 'milk');
      const price = getPrice(products, 'milk');
      return Math.floor(qty / 3) * price;
    },
  },
];
