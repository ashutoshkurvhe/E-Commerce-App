import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";;
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    //Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) { 
      setIsSidebarOpen(false);

    }
  }

  useEffect(() => {
    // Add Event linstener for click
    document.addEventListener("mousedown", handleClickOutside);
    //clean event listener
    return () => { 
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: "1",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=1",
              altText: "Stylish-Jacket",
            },
          ],
        },
        {
          _id: "2",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=2",
              altText: "Stylish-Jacket",
            },
          ],
        },
        {
          _id: "3",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=3",
              altText: "Stylish-Jacket",
            },
          ],
        },
        {
          _id: "4",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=4",
              altText: "Stylish-Jacket",
            },
          ],
        },
        {
          _id: "5",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=5",
              altText: "Stylish-Jacket",
            },
          ],
        },
        {
          _id: "6",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=6",
              altText: "Stylish-Jacket",
            },
          ],
        },
        {
          _id: "7",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=7",
              altText: "Stylish-Jacket",
            },
          ],
        },
        {
          _id: "8",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=8",
              altText: "Stylish-Jacket",
            },
          ],
        },
      ];setProducts(fetchedProducts);
    },1000)
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2"/> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0  z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort Option */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />

      </div>
    </div>
  );
}

export default CollectionsPage
