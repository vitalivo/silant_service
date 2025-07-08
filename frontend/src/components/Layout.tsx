import type React from "react"
import Header from "./Header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>

      {/* Простой и чистый футер */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30"></div>
                  <div className="relative bg-white p-3 rounded-2xl shadow-lg w-16 h-16 flex items-center justify-center overflow-hidden">
                    <img
                      src="/public/images/Logot3.jpg"
                      alt="Силант"
                      className="max-w-10 max-h-10 w-10 h-10 object-contain object-center"
                      style={{ maxWidth: "40px", maxHeight: "40px" }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-astra">СИЛАНТ</h3>
                  <p className="text-gray-400 font-astra">Чебоксарский завод силовых агрегатов</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed font-astra text-lg">
                Ведущий производитель силовых агрегатов и специализированной техники. Обеспечиваем надежность и качество
                на протяжении многих лет работы.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-6 text-xl font-astra">Контакты</h4>
              <div className="space-y-3 text-gray-400 font-astra">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>г. Чебоксары, Россия</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span className="text-blue-400">info@silant.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+7 (8352) 00-00-00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="font-astra">© 2025 Чебоксарский завод "СИЛАНТ". Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

