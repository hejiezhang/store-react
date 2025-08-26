
import { Outlet, Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center space-x-12">
              <Link to="/" className="text-2xl font-semibold text-gray-900 hover:text-gray-600">
                Store
              </Link>
              <div className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/cart" 
                className="p-2 text-gray-500 hover:text-gray-700 relative"
              >
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Sign in
              </Link>
              <Disclosure as="div" className="md:hidden">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="p-2 text-gray-500 hover:text-gray-700">
                      {open ? (
                        <XMarkIcon className="h-6 w-6" />
                      ) : (
                        <Bars3Icon className="h-6 w-6" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel className="absolute top-full right-0 w-48 py-2 bg-white shadow-lg rounded-lg">
                      <div className="px-4 py-2 space-y-2">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block text-sm text-gray-700 hover:text-gray-900"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
