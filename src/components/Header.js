import { memo } from "react";

function Header() {
  console.log(123);
  return (
    <header className="header">
      <div className="header__logo"></div>
    </header>
  );
}

export default memo(Header);
