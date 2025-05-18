import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'

export const metadata: Metadata = {
  title: 'User Admin Dashboard',
  description: '사용자 정보 조회/수정/삭제',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryClientProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
