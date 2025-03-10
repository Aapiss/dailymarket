import React, { useState } from "react";
import Swal from "sweetalert2";
import useCart from "../utils/store/usecart";
import { supabase } from "../utils/SupaClient";

const formatHarga = (harga) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);
};

const CheckoutButton = ({ cart, totalHarga, navigate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const clearCart = useCart.getState().clearCart;

  const confirmCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart is Empty!",
        text: "Please add items to your cart before checking out.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const productList = cart
      .map(
        (item) =>
          `<div class="swal-product">
              <span>${item.quantity}×</span> 
              <span>${item.barang.nama_barang}</span> 
              <span>${formatHarga(item.barang.harga * item.quantity)}</span>
            </div>`
      )
      .join("");

    Swal.fire({
      title: "Confirm Checkout",
      html: `
          <div class="swal-container">
            <div class="swal-products">${productList}</div>
            <div class="swal-total">
              <b>Total Price: ${formatHarga(totalHarga)}</b>
            </div>
          </div>
        `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Checkout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCheckout();
      }
    });
  };

  const handleCheckout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const { data: user } = await supabase.auth.getUser();
    if (!user) {
      Swal.fire("PLease login first", "", "info");
      setIsProcessing(false);
      return;
    }

    console.log(user);

    // Ambil full_name dari Supabase
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.user.id)
      .single();

    if (profileError || !profile) {
      Swal.fire("Failed to fetch profile", "Please try again", "error");
      setIsProcessing(false);
      return;
    }

    const itemDetails = cart.map((item) => ({
      id: item.barang_id,
      price: item.barang.harga,
      quantity: item.quantity,
      name: item.barang.nama_barang,
    }));

    const orderId = `ORDER-${new Date().getTime()}`;
    const transactionDetails = {
      order_id: orderId,
      gross_amount: totalHarga,
    };

    const customerDetails = {
      first_name: profile.full_name,
    };

    console.log(customerDetails);

    const response = await fetch(
      "https://midtrans-lac.vercel.app/api/payment/checkout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionDetails,
          customerDetails,
          itemDetails,
        }),
      }
    );

    const { token } = await response.json();

    window.snap.pay(token, {
      onSuccess: async (midtransResponse) => {
        const paymentChannel =
          midtransResponse.payment_type || "Tidak Diketahui";

        const { error: riwayatError } = await supabase.from("riwayat").insert(
          cart.map((item) => ({
            profile_id: user.user.id,
            barang_id: item.barang_id,
            quantity: item.quantity,
            status: "Success",
            order_id: orderId,
            total_harga: cart.reduce(
              (total, item) => total + item.barang.harga * item.quantity,
              0
            ),
            payment_channel: paymentChannel,
          }))
        );

        if (riwayatError) {
          console.error(riwayatError);
          Swal.fire(
            "Something went wrong when updating history",
            riwayatError.message,
            "error"
          );
          setIsProcessing(false);
          return;
        }

        // Perbarui stok barang
        for (const item of cart) {
          const { error: stockError } = await supabase
            .from("barang")
            .update({
              stok: item.barang.stok - item.quantity,
            })
            .eq("id", item.barang_id);

          if (stockError) {
            console.error(stockError);
            Swal.fire(
              `Failed to update stock for ${item.item.nama_barang}`,
              stockError.message,
              "error"
            );
            setIsProcessing(false);
            return;
          }
        }

        await supabase
          .from("keranjang")
          .delete()
          .eq("profile_id", user.user.id)
          .in(
            "barang_id",
            cart.map((item) => item.barang_id)
          );

        Swal.fire({
          title: "Payment Success!",
          html: `<p>Your payment has been successfully processed.</p><p><strong>Order ID:</strong> ${orderId}</p>`,
          icon: "success",
          showCancelButton: true,
          cancelButtonText: "Close",
          confirmButtonText: "Copy Order ID",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigator.clipboard.writeText(orderId);
            Swal.fire(
              "Copied!",
              "Order ID has been copied to clipboard.",
              "success"
            ).then(() => navigate("/history"));
          } else {
            navigate("/history");
          }
        });
      },

      onPending: () => {
        Swal.fire(
          "Pembayaran Tertunda",
          "Silakan selesaikan pembayaran Anda.",
          "warning"
        );
      },
      onError: () => {
        Swal.fire(
          "Pembayaran Gagal",
          "Terjadi kesalahan saat memproses pembayaran.",
          "error"
        );
      },
    });
  };

  return (
    <div className="mt-6">
      <button
        onClick={confirmCheckout}
        className={`relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full shadow-xl transition-all duration-300 ease-in-out transform active:scale-95 w-full text-lg font-semibold tracking-wide h-12 min-w-[180px] ${
          isProcessing
            ? "opacity-60 cursor-not-allowed"
            : "hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl"
        }`}
        disabled={isProcessing}
      >
        <div className="flex items-center space-x-2">
          {isProcessing && (
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}

          <span>{isProcessing ? "Processing..." : "Checkout"}</span>
        </div>
      </button>
    </div>
  );
};

export default CheckoutButton;
