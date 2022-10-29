import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StHeader>
        <Link href="/">홈</Link>
        <Link href="/add">추가하기</Link>
        <Link href="/todos">리스트</Link>
      </StHeader>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

const StHeader = styled.header`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  margin-bottom: 18px;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
`;
