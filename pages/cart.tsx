import { useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { XCircleIcon } from "@heroicons/react/outline";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import dynamic from "next/dynamic";

const Cart = () => {
  const router = useRouter();
  const { state, dispatch }: any = useContext(Store);

  const removeItemHandler = (item: any) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = (item: any, qty: any) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <Layout title="shopping-cart">
      <h1 className="text-xl mb-4 font-semibold">Shopping Cart</h1>
      {state.cart.cartItems.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href="/" className="underline">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table-auto min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.cartItems.map((item: any) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item?.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;{item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        className="border-2 rounded-md px-1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {_.range(item.countInStock).map((x: any) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="w-5 h-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {state.cart.cartItems.reduce(
                    (a: number, c: { quantity: number }) => a + c.quantity,
                    0
                  )}
                  ) : ${" "}
                  {state.cart.cartItems.reduce(
                    (a: number, c: { quantity: number; price: number }) =>
                      a + c.quantity * c.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-full"
                  onClick={() => router.push("shipping")}
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
