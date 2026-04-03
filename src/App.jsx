import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useAppDispatch } from "./hooks/useRedux";
import { fetchProducts } from "./api";
import { setProducts } from "./redux/actions/productActions";
import { useAppSelector } from '../src/hooks/useRedux';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import BillPanel from './components/BillPanel';
import SpecialOffersPanel from './components/SpecialOffersPanel';
import ProductSkeleton from "./components/ProductSkeleton";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fdfaf4;
`;

const Main = styled.main`
  max-width: 1152px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightCol = styled.div``;

const StickyBill = styled.div`
  position: sticky;
  top: 88px;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 24px;
  margin-top: 32px;
  font-size: 0.75rem;
  color: #aaaaaa;
  border-top: 1px solid #f0e0c0;
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      dispatch(setProducts(data));
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <PageWrapper>
      <Header />
      <Main>
        <Grid>
          <LeftCol>
            <SpecialOffersPanel />
            <section>
              <SectionTitle>Today's Products</SectionTitle>
              <ProductsGrid>
                {
                  loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                      ))
                    : products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                }
              </ProductsGrid>
            </section>
          </LeftCol>

          <RightCol>
            <StickyBill>
              <BillPanel />
            </StickyBill>
          </RightCol>
        </Grid>
      </Main>
    </PageWrapper>
  );
}
