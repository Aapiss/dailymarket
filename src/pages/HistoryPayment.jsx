import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/tailus/Header";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../utils/SupaClient";

const formatHarga = (harga) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);
};

const HistoryPayment = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk search

  useEffect(() => {
    const fetchRiwayat = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error("Failed to get user:", userError);
        return;
      }

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from("riwayat")
        .select(
          "order_id, total_harga, status, created_at, payment_channel, quantity, barang(nama_barang, harga), profiles(full_name)"
        )
        .eq("profile_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch history:", error);
      } else {
        const groupedRiwayat = data.reduce((acc, item) => {
          if (!acc[item.order_id]) {
            acc[item.order_id] = {
              ...item,
              barang: [],
            };
          }
          acc[item.order_id].barang.push({
            nama_barang: item.barang.nama_barang,
            harga: item.barang.harga,
            quantity: item.quantity,
          });
          return acc;
        }, {});

        setRiwayat(Object.values(groupedRiwayat));
      }
    };

    fetchRiwayat();
  }, []);

  const filteredRiwayat = riwayat.filter((item) =>
    item.order_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDetail = (item) => {
    const productList = item.barang
      .map(
        (barang) => `
        <li>
          ${barang.nama_barang} - ${formatHarga(barang.harga)} x ${
          barang.quantity
        } = 
          <strong>${formatHarga(barang.harga * barang.quantity)}</strong>
        </li>
      `
      )
      .join("");

    Swal.fire({
      title: "Detail Transaction",
      html: `
          <div class="text-left text-sm leading-relaxed">
            <p class="mb-2"><strong>Order ID:</strong> ${item.order_id}</p>
            <p class="mb-2"><strong>Status:</strong> 
              <span class="px-2 py-1 rounded-md text-xs font-medium ${
                item.status === "Success"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              }">
                ${item.status}
              </span>
            </p>
            <p class="mb-2"><strong>Date:</strong> ${new Intl.DateTimeFormat(
              "id-ID",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            ).format(new Date(item.created_at))}</p>
            <p class="mb-2"><strong>Payment Channel:</strong> ${
              item.payment_channel || "Tidak Diketahui"
            }</p>
            <p class="mb-2"><strong>Total Price:</strong> ${formatHarga(
              item.total_harga
            )}</p>
      
            <div class="mt-3">
              <p class="font-semibold mb-2 dark:text-gray-100">List Item:</p>
              <ul class="border rounded-md bg-gray-100 dark:bg-gray-900 dark:border-gray-700 p-2 text-xs dark:text-gray-200">
                ${item.barang
                  .map(
                    (barang) => `
                  <li class="flex justify-between border-b py-1 border-gray-300 dark:border-gray-700 last:border-none">
                    <span>${barang.nama_barang}</span>
                    <span class="font-medium">${formatHarga(barang.harga)} x ${
                      barang.quantity
                    } = <strong>${formatHarga(
                      barang.harga * barang.quantity
                    )}</strong></span>
                  </li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        `,
      customClass: {
        popup:
          "w-80 md:w-96 bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg dark:shadow-gray-700",
        title: "text-lg font-bold",
        confirmButton:
          "bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 text-sm rounded-md",
      },
      confirmButtonText: "Tutup",
      confirmButtonColor: "#f97316",
    });
  };

  return (
    <div className="p-5 dark:bg-blue-900 min-h-screen">
      <Helmet>
        <title>Online Shop | History</title>
      </Helmet>
      <Header />
      <h1 className="mt-20 text-3xl font-bold text-center text-blue-800 dark:text-white mb-6">
        History Payment
      </h1>

      <div className="mb-4 flex justify-center">
        <div className="relative w-full max-w-md"></div>
      </div>

      <div className="w-full overflow-x-auto max-w-full">
        <table className="w-full bg-white dark:bg-blue-800 shadow-md rounded-lg overflow-hidden text-[10px] sm:text-xs md:text-sm">
          <thead className="bg-gradient-to-r from-blue-300 to-blue-400 text-white">
            <tr>
              <th className="py-2 px-3 text-left uppercase">No</th>
              <th className="py-2 px-3 text-left uppercase">Order ID</th>
              <th className="py-2 px-3 text-left uppercase hidden sm:table-cell">
                Total Price
              </th>
              <th className="py-2 px-3 text-left uppercase">Status</th>
              <th className="py-2 px-3 text-center uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiwayat.length > 0 ? (
              filteredRiwayat.map((item, index) => (
                <tr
                  key={item.order_id}
                  className="border-b border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-200"
                >
                  <td className="py-2 px-3 text-blue-800 dark:text-gray-300 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2 px-3 text-blue-800 dark:text-gray-300">
                    {item.order_id}
                  </td>
                  <td className="py-2 px-3 text-blue-800 dark:text-gray-300 hidden sm:table-cell">
                    {formatHarga(item.total_harga)}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold ${
                        item.status === "Success"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => showDetail(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-[10px] sm:text-xs transition-all duration-200"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-300"
                >
                  Data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPayment;
