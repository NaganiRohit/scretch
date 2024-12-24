import React, { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri'; // Import the "Add" icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Shop = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  useEffect(() => {
    // Check if the token exists in cookies
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));

    if (!token) {
      // If no token, redirect to the home page
      navigate('/'); // Redirect using useNavigate
      return;
    }

    // Fetch products from the API
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [navigate]); // Adding navigate as dependency to trigger rerender on redirect

  return (
    <div className="w-full h-auto flex items-start px-10 py-5 text-md bg-white">
      {/* Sidebar */}
      <div className="w-[20%] flex h-screen flex-col items-start">
        {/* Sort By Section */}
        <div className="flex items-center gap-2">
          <h3>Sort by</h3>
          <form action="/shop">
            <select className="border-[1px] px-2 py-1" name="sortby">
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
            </select>
          </form>
        </div>

        {/* Links Section */}
        <div className="flex flex-col mt-20">
          <a className="block w-fit mb-2" href="">New Collection</a>
          <a className="block w-fit mb-2" href="">All Products</a>
          <a className="block w-fit mb-2" href="">Discounted Products</a>
        </div>

        {/* Filter Section */}
        <div className="mt-32">
          <a className="block w-fit mb-2" href="">Filter by :</a>
          <a className="block w-fit mb-2" href="">Availability</a>
          <a className="block w-fit mb-2" href="">Discount</a>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-[100%] flex flex-col gap-5 h-screen">
        <div className="flex items-start gap-5 flex-wrap text-xl">
          {products.map((product) => (
            <div key={product._id} className="w-48 bg-black h-auto">
              {/* Product Image */}
              <div
                className={`w-full h-40 flex items-center justify-center`}
                style={{ backgroundColor: product.bgcolor }}
              >
                <img
                  className="h-[8rem]"
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt="Product"
                />
              </div>

              {/* Product Details */}
              <div
                className="flex text-sm justify-between h-16 items-center px-4 py-4"
                style={{
                  backgroundColor: product.panelcolor,
                  color: product.textcolor,
                }}
              >
                <div>
                  <h3>{product.name}</h3>
                  <h4>
                    ₹ {product.price}{' '}
                    <span
                      className="inline-block px-1 text-sm rounded-full"
                      style={{
                        backgroundColor: product.textcolor,
                        color: product.bgcolor,
                      }}
                    >
                      {product.discount}%
                    </span>
                  </h4>
                </div>
                <a
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white"
                  href={`/addtocart/${product._id}`}
                >
                  <RiAddLine className="text-black text-xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
