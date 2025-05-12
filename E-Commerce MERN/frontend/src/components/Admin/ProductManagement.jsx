import { Link } from "react-router-dom";
const ProductManagement = () => {
  const products = [
    {
      _id: 124578,
      name: "Product 1",
      price: 100,
      sku: "123456781234",
    },
    {
      _id: 124579,
      name: "Product 2",
      price: 200,
      sku: "123456781234",
    },
    {
      _id: 124580,
      name: "Product 3",
      price: 300,
      sku: "123456781234",
    },
  ];

  const handleDelete = (id) => {
    if (FaWindows.confirm("Are you sure you went to delete the product?")) {
      console.log("Delete Product with id: ", id);
      // Call your delete API here
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 ">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer "
                >
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-4">{product.price}</td>
                  <td className="px-4">{product.sku}</td>
                  <td className="px-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1.5 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
