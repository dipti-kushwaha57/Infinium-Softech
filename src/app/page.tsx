import { Banner } from "@/components/Banner/Banner";
import { Ecosystem } from "@/components/Ecosystem/Ecosystem";
import { Why } from "@/components/Why/Why";
import { InsideProduct } from "@/components/InsideProduct/InsideProduct";

export default function Home() {
  return (
    <main className="main">
      <Banner />
      <Ecosystem />
      <Why />
      <InsideProduct />
    </main>
  );
}
