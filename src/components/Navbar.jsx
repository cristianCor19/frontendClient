import {  useState, useEffect,Fragment, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon,  XMarkIcon } from '@heroicons/react/24/outline'
import { Link} from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { useProduct } from "../context/ProductContext";



const navigation = [
  { name: 'Inicio', href: '/', current: false },
  { name: 'Portátiles', href: '/portatiles', current: false },
  { name: 'Monitores', href: '/monitores', current: false },
  { name: 'Partes Pc', href: '/partesPc', current: false },
  { name: 'Perifericos', href: '/perifericos', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {
  const {isAuthenticated, profile, logout} = useSession()
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [propSearch, setPropSearch] = useState('');
  const { countProducts, total,onDeleteProduct, cartProducts, getProductsCart, getSearchProduct, getFavorites} = useProduct();
  const cartProductsRef = useRef(null);

  const getDisplayName = () => {
    if (!profile) {
      return 'Cargando...';
    }
    return profile.name && profile.lastname 
      ? `${profile.name} ${profile.lastname}` 
      : 'Usuario';
  };

  const getDataCart = () => {
    getProductsCart()
    
  };

  const searchProduct = () => {
    if(propSearch){
      getSearchProduct(propSearch)
      setPropSearch('')
    }
  }


  useEffect(() => {
    //Verificar si los clics se realizo fuera de la ventana emergente del carrito
    const handleClickOutside = (event) => {
      
      //verifica si el clic ocurio afuera del elemento que esta referenciado, aclaracion en react, esto se hace con useRef(), 
      if (cartProductsRef.current && !cartProductsRef.current.contains(event.target)) {
        //si el clic ocrrio afuera cambia el estado del elemento active, cerrando la ventana emergente
        
        setActive(false);
      }
    };

    //agrega el event listener al documento para detectar los clics fuera de la ventana del carrito
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, [])



   // Recuperar el estado de apertura desde localStorage al cargar el componente
  useEffect(() => {
    const storedOpenState = localStorage.getItem('menuOpen');
    setOpen(storedOpenState === 'true');
  }, []);

  // Actualizar el estado de apertura en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('menuOpen', open.toString());
  }, [open]);

  return (
    <Disclosure as="nav" className="bg-gray-800 navbar-main">
      {({ open: disclosureOpen }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8 navbar-margin">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                
                <Link to={'/'} className='text-gray-300 hover:bg-gray-700 hover:text-white     rounded-md px-3 py-0 font-medium title-main'>Infotect <br /> Solutions
                </Link>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    
                      <Link to={'/'} className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-0 font-medium title-main'>
                        Infotect <br /> Solutions
                      </Link>
                      <div className="relative ">

                        <input type="text" className='input-search mt-4' placeholder='Buscar productos,marcas y demas' value={propSearch}
                        onChange={(e) => setPropSearch(e.target.value)}/>
                        <button className='p-0 bg-white icon-search' onClick={() =>{

                          searchProduct()
                        }
                        }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        </button>
                      </div>
                    
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 sm:pt-2">
              <Link to={'/favorite_products'} className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium mt-3.5' onClick={getFavorites}>Favoritos</Link>
              <div className='container-icon'>
                        <div
                          className='container-cart-icon'
                          onClick={(event) => {
                            event.stopPropagation();
                            isAuthenticated ? setActive(!active) : setActive(active)
                            getDataCart()
                            
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='icon-cart'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                            />
                          </svg>
                          <div className='count-products'>
                            <span id='contador-productos'>{
                            isAuthenticated ? (
                              <>
                              {countProducts}
                              </>
                            ): (
                              <>
                              0
                              </>
                            )
                            }
                            </span>
                          </div>
                        </div>

                        <div
                          className={`container-cart-products ${
                            active ? '' : 'hidden'
                          }`} ref={cartProductsRef}
                        >
                          {cartProducts.length ? (
                            <>
                              <div className='row-product'>
                                {cartProducts.map(product => (
                                  <div className='cart-product' key={product._id}>
                                    <div className='info-cart-product'>
                                      <span className='cantidad-producto-carrito'>
                                        {product.quantity}
                                      </span>
                                      <p className='titulo-producto-carrito'>
                                        {product.name}
                                      </p>
                                      <span className='precio-producto-carrito'>
                                        ${product.price}
                                      </span>
                                    </div>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      strokeWidth='1.5'
                                      stroke='currentColor'
                                      className='icon-close'
                                      onClick={()=> onDeleteProduct(product.
                                        product_id)}
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M6 18L18 6M6 6l12 12'
                                      />
                                    </svg>
                                  </div>
                                ))}
                              </div>

                              <div className='cart-total '>
                                <h3>Total:</h3>
                                <span className='total-pagar '>${total}</span>
                              </div>

                             
                              <Link to={'/cartPage'} onClick={() => {
                                setActive(false)
                              }}>
                              
                                <button className='btn-clear-all'>
                                  Ver carrito
                                </button>
                              </Link>
                            </>
                          ) : (
                            <p className='cart-empty'>El carrito está vacío</p>
                          )}
                        </div>
                      </div>
                {
                  isAuthenticated ? (
                    <>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src=""
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            

                            <Menu.Item>
                                {({ active }) => (
                                  <p
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    
                                    {getDisplayName()}
                                    
                                  
                                  </p>
                                )}
                              </Menu.Item> 
                          
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={'/profile'}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Mi perfil
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link to={'/'} onClick={() =>{
                                    logout()
                                  }}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Cerrar sesion
                                </Link>

                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <>
                      
                      <Link to={'/login'} className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>Login</Link>
                      
                    </>
                  )
                }

            
                  

                
              </div>
            </div>
          </div>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8 navbar-margin">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    
                  )}
                </Disclosure.Button>
                  <div className="relative">

                    <input type="text" className='input-search mt-0' placeholder='Buscar productos,marcas y demas' value={propSearch}
                    onChange={(e) => setPropSearch(e.target.value)}/>
                    <button className=' bg-white icon-search' onClick={() =>{

                      searchProduct()
                    }
                    }>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                  </button>
                  </div>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-5 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-1 pt-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar