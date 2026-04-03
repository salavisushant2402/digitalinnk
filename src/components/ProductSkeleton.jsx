import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const Card = styled.div`
  height: 260px;
  border-radius: 16px;
  border: 2px solid #f0e0c0;
  padding: 20px;
  background: #fff;
`;

const Box = styled.div`
  height: ${(p) => p.h || "12px"};
  width: ${(p) => p.w || "100%"};
  border-radius: 6px;
  margin-bottom: 10px;

  background: linear-gradient(
    90deg,
    #f0e0c0 25%,
    #f8f2e6 50%,
    #f0e0c0 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

export default function ProductSkeleton() {
  return (
    <Card>
      <Box h="100px" /> {/* image */}
      <Box w="40%" />
      <Box w="70%" />
      <Box w="90%" />
      <Box w="30%" />
      <Box h="30px" /> {/* button */}
    </Card>
  );
}