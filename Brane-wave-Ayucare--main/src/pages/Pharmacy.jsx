import React, { useState } from 'react';
import { Search, ShoppingBag, Plus, Check } from 'lucide-react';

export default function Pharmacy({ addToCart, setActiveTab }) {
  const [search, setSearch] = useState('');
  const [addedItems, setAddedItems] = useState({});

  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      desc: 'Fever & Pain Relief Strips',
      price: 50,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300'
    },
    {
      id: 2,
      name: 'Vitamin C Tablets',
      desc: 'Immunity Booster Strips',
      price: 120,
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=300'
    },
    {
      id: 3,
      name: 'Cough Syrup 100ml',
      desc: 'Relief for Dry & Wet Cough',
      price: 90,
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300'
    },
    {
      id: 4,
      name: 'Glucose Energy Powder',
      desc: 'Instant Energy Drink Mix',
      price: 70,
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=300'
    },
    {
      id: 5,
      name: 'Disprin 500mg',
      desc: 'Fast Headache Relief',
      price: 50,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300'
    },
    {
      id: 6,
      name: 'Dettol Antiseptic 550ml',
      desc: 'Disinfectant & First Aid',
      price: 120,
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300'
    },
    {
      id: 7,
      name: 'Volini Pain Relief Gel',
      desc: 'Joint & Back Pain Relief',
      price: 150,
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300'
    },
    {
      id: 8,
      name: 'Zandu Ayurvedic Balm',
      desc: 'Headache & Cold Relief',
      price: 120,
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=300'
    }
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="space-y-10 py-8">
      
      {/* Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Your Trusted Online Pharmacy</h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">100% Genuine Medicines • 2-Hour Home Delivery • Cash on Delivery</p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines, syrups, gels..."
            className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-600 shadow-md font-medium"
          />
        </div>
      </div>

      {/* Header Action */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">Featured Genuine Medicines</h2>
        <button
          onClick={() => setActiveTab('cart')}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/20"
        >
          View Cart & Checkout
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-xl">
            <div className="space-y-3 text-center">
              <img
                src={p.image}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300'; }}
                alt={p.name}
                className="w-full h-32 object-contain rounded-2xl bg-slate-50 p-2 group-hover:scale-105 transition-transform"
              />
              <div>
                <h3 className="font-extrabold text-base text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{p.desc}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-extrabold text-teal-700 text-base">₹{p.price}</span>
              
              <button
                onClick={() => handleAdd(p)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                  addedItems[p.id]
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20'
                }`}
              >
                {addedItems[p.id] ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Add
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
