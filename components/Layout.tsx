import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import DropdownLink from "./DropdownLink";
import { ToastContainer } from "react-toastify";
import { ReactNode, useContext, useState, useEffect } from "react";
import { Store } from "../utils/Store";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

type LayoutProps = {
  title?: string;
  children?: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const { status, data: session } = useSession();
  const { state, dispatch }: any = useContext(Store);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(
      state.cart.cartItems.reduce(
        (quantity: number, item: { quantity: number }) =>
          item.quantity + quantity,
        0
      )
    );
  }, [state.cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Amazona` : "Amazona"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex flex-col min-h-screen justify-between">
        <header className="p-6 shadow-md">
          <nav className="flex justify-between items-center ">
            <Link href="/" className="text-lg font-bold">
              Amazona
            </Link>
            <div className="space-x-3">
              <Link href="/cart" className="text-lg ">
                Cart{" "}
                {cartItemCount > 0 && (
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading..."
              ) : session?.user ? (
                <span className="p-2">
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-600">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>

                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </span>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>Copyright &copy; 2023 Amazona</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
