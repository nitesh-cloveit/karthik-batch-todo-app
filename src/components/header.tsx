// component name should be in PascalCase
function Header() {
  const appName = "Todo App"
  return(
    <header>
      <h1>{appName}</h1>
    </header>
  )
}

export default Header;

// Named vs Default Exports