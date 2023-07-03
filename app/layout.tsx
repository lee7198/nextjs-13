import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContext>
          <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen m-auto bg-white">
              <NavBar />
              {children}
            </main>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
