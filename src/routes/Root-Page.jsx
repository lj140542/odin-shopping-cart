import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootPage() {
  return (
    <>
      <Header />
      <main className="grid py-8 px-12 w-screen max-w-6xl">
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
}