import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [editId, setEditId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.company
    ) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/customers", form);

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
      });

      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const editCustomer = (customer) => {
    setEditId(customer._id);

    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
    });
  };

  const updateCustomer = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/customers/${editId}`,
        form
      );

      setEditId(null);

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
      });

      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-bold">
          CRM Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">

        {/* Customer Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            {editId
              ? "Update Customer"
              : "Add Customer"}
          </h2>

          <form
            onSubmit={
              editId
                ? updateCustomer
                : addCustomer
            }
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Customer Email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <button
              className="bg-blue-600 text-white p-3 rounded md:col-span-2"
            >
              {editId
                ? "Update Customer"
                : "Add Customer"}
            </button>

          </form>

        </div>

        {/* Customer Table */}
        <div className="bg-white shadow rounded-lg p-4">

          <h2 className="text-2xl font-semibold mb-4">
            Customer List
          </h2>

          <div className="overflow-x-auto">

            <table className="min-w-full border">

              <thead className="bg-gray-200">

                <tr>

                  <th className="p-3 border">
                    Name
                  </th>

                  <th className="p-3 border">
                    Email
                  </th>

                  <th className="p-3 border">
                    Phone
                  </th>

                  <th className="p-3 border">
                    Company
                  </th>

                  <th className="p-3 border">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {customers.map(
                  (customer) => (
                    <tr
                      key={customer._id}
                      className="text-center"
                    >

                      <td className="border p-3">
                        {customer.name}
                      </td>

                      <td className="border p-3">
                        {customer.email}
                      </td>

                      <td className="border p-3">
                        {customer.phone}
                      </td>

                      <td className="border p-3">
                        {customer.company}
                      </td>

                      <td className="border p-3">

                        <div className="flex flex-col md:flex-row gap-2 justify-center">

                          <button
                            onClick={() =>
                              editCustomer(
                                customer
                              )
                            }
                            className="bg-yellow-500 text-white px-3 py-2 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteCustomer(
                                customer._id
                              )
                            }
                            className="bg-red-500 text-white px-3 py-2 rounded"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;