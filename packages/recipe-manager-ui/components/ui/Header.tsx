const Header = () => {
  return (
    <header className="bg-blue-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#" className="text-xl font-semibold">Recipe Manager</a>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-200">Startseite</a></li>
            <li><a href="#" className="hover:text-blue-200">Rezepte</a></li>
            <li><a href="#" className="hover:text-blue-200">Login</a></li>
            <li><a href="#" className="hover:text-blue-200">Kontakt</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header