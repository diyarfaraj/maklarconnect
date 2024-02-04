import Home from "./(home)/home/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "MäklarConnect - Från mäklare till mäklare",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
