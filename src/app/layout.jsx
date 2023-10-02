import Drawer from "@/components/Drawer"
import Navbar from "@/components/Navbar"
import './globals.css'
import Providers from "./Providers"

export const metadata = {
  title: 'Next Auth Google',
  description: 'Next Auth Google',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <Drawer />
          {children}
        </Providers>
      </body>
    </html>
  )
}
