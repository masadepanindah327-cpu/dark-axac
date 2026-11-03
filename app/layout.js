import './globals.css'

export const metadata = {
  title: 'Dark Axac | Absolute Core',
  description: 'Unrestricted AI Interface',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
