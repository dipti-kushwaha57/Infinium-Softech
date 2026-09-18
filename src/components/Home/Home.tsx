import { Banner } from "./Banner/Banner";
import { Ecosystem } from "./Ecosystem/Ecosystem";
import { Why } from "./Why/Why";
import { InsideProduct } from "./InsideProduct/InsideProduct";
import { TechStack } from "./TachStack/TechStack";
import { Delivery } from "./Delivery/Delivery";
import { Operators } from "./Operators/Operators";

export function LandingPage() {
  return (
    <div className="landing-page">
      <Banner />
      <Ecosystem />
      <Why />
      <InsideProduct />
      <TechStack />
      <Delivery />
      <Operators />
    </div>
  );
}

export {
  Banner,
  Ecosystem,
  Why,
  InsideProduct,
  TechStack,
  Delivery,
  Operators,
  LandingPage as Home,
};
