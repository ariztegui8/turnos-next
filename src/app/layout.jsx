import Drawer from "@/components/Drawer"
import Navbar from "@/components/Navbar"
import './globals.css'
import Providers from "./Providers"

export const metadata = {
  title: 'Turnos',
  description: 'Turnos',
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
