import { Banner } from "@/components/Banner/Banner";
import { Ecosystem } from "@/components/Ecosystem/Ecosystem";
import { Why } from "@/components/Why/Why";
import { InsideProduct } from "@/components/InsideProduct/InsideProduct";
import { TechStack } from "@/components/TachStack/TechStack"
import { Delivery } from "@/components/Delivery/Delivery";

export default function Home() {
  return (
    <main className="main">
      <Banner />
      <Ecosystem />
      <Why />
      <InsideProduct />
      <TechStack />
      <Delivery />
    </main>
  );
}
