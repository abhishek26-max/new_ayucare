import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, Tag, Check, ArrowRight, X } from 'lucide-react';

export default function Cart({ cart, updateQty, removeItem, clearCart, setActiveTab }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal >= 299 || subtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'AYUCARE10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      alert(`🎉 Promo AYUCARE10 applied! ₹${disc} discount added.`);
    } else {
      alert('Invalid Promo Code. Try AYUCARE10 for 10% off!');
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.customerName.value.trim();
    const phone = e.target.customerPhone.value.trim();
    const address = e.target.customerAddress.value.trim();

    const orderPayload = {
      id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      totalAmount: `₹${grandTotal}`,
      date: new Date().toLocaleDateString()
    };

    // Save to LocalStorage for Admin History Dashboard
    const savedOrders = JSON.parse(localStorage.getItem('ayucare_orders') || '[]');
    savedOrders.push(orderPayload);
    localStorage.setItem('ayucare_orders', JSON.stringify(savedOrders));

    // Post to Server API
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
    } catch (err) {}

    // Send WhatsApp notification for medicine order
    const whatsappNumber = '919569141861';
    const itemsText = cart.map(i => `${i.name} (x${i.qty})`).join(', ');
    const rawMsg =
      `📦 *AYUCARE MEDICINE ORDER*\n\n` +
      `*Customer Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Address:* ${address}\n\n` +
      `*Ordered Items:* ${itemsText}\n` +
      `*Total Bill:* ₹${grandTotal}\n` +
      `*Date:* ${new Date().toLocaleDateString()}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(rawMsg)}`;
    window.open(waUrl, '_blank');

    alert(`🎉 Order Placed Successfully!\n\nTotal: ₹${grandTotal}\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nOpening WhatsApp for Order Confirmation.`);
    clearCart();
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 py-8">
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-teal-700" /> Your Shopping Cart
        </h1>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-red-600 hover:text-red-700 font-extrabold border border-red-200 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto" />
          <h2 className="text-xl font-extrabold text-slate-900">Your cart is currently empty!</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">Browse our genuine medicines store and order doorstep delivery.</p>
          <button
            onClick={() => setActiveTab('pharmacy')}
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/30"
          >
            Browse Medicines
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300'; }}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-xl bg-slate-50 p-2 border border-slate-100"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">₹{item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                    <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1 text-slate-600 hover:text-slate-900 font-bold">-</button>
                    <span className="px-3 py-1 text-xs font-extrabold text-slate-900">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1 text-slate-600 hover:text-slate-900 font-bold">+</button>
                  </div>
                  <span className="font-extrabold text-teal-700 text-sm min-w-[60px] text-right">₹{item.price * item.qty}</span>
                  <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-600 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 h-fit shadow-md">
            <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>

            {/* Promo Code Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo (AYUCARE10)"
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 uppercase focus:outline-none font-bold"
              />
              <button
                onClick={applyPromo}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-teal-700 font-extrabold text-xs border border-slate-300"
              >
                Apply
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-slate-900 font-extrabold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-teal-700 font-extrabold">
                  <span>Promo Discount:</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span className="text-slate-900 font-extrabold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold">
                🎉 Free delivery on orders above ₹299!
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-lg font-extrabold text-slate-900">
              <span>Total Amount:</span>
              <span className="text-teal-700">₹{grandTotal}</span>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-sm shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Checkout Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Medicine Delivery Checkout</h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">Cash on Delivery & Instant Delivery in 2 Hours</p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input type="text" name="customerName" required placeholder="Full Name" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                <input type="tel" name="customerPhone" required placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
                <textarea name="customerAddress" rows="3" required placeholder="Full Street Address, Area, Pincode..." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium"></textarea>
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-sm shadow-md shadow-teal-600/30">
                Confirm Medicine Order (₹{grandTotal})
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
