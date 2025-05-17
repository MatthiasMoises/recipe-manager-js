const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto text-center px-4">
        <p>&copy; 2025 Meine Webseite. Alle Rechte vorbehalten.</p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li><a href="#" className="hover:text-gray-400">Datenschutz</a></li>
            <li><a href="#" className="hover:text-gray-400">Impressum</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer