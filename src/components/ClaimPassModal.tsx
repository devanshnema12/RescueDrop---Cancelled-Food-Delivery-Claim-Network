import React, { useState, useEffect } from 'react';
import { CancelledOrder } from '../types/rescue';
import { X, QrCode, Phone, Navigation, Clock, ShieldCheck, Check, Share2, Copy } from 'lucide-react';

interface ClaimPassModalProps {
  order: CancelledOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimPassModal: React.FC<ClaimPassModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const [copied, setCopied] = useState(false);
  const [pickupTimer, setPickupTimer] = useState(900); // 15 mins countdown

  useEffect(() => {
    const t = setInterval(() => {
      setPickupTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const otp = order.claimCode || '8429';
  const mins = Math.floor(pickupTimer / 60);
  const secs = pickupTimer % 60;

  const copyCode = () => {
    navigator.clipboard?.writeText(otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
        
        {/* Pass Header */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white ${
                order.platform === 'zomato' ? 'bg-[#E23744]' : 'bg-[#FC8019]'
              }`}
            >
              {order.platform === 'zomato' ? 'Zomato Food Rescue' : 'Swiggy GreenBite'}
            </span>
            <span className="text-xs text-amber-400 font-mono">Claim ID: {order.orderNumber}</span>
          </div>

          <h2 className="text-xl font-black text-white">Digital Pickup Pass</h2>
          <p className="text-xs text-stone-300 mt-0.5">Show this OTP at restaurant counter</p>
        </div>

        {/* Pass Body with Ticket Notch style */}
        <div className="p-6 space-y-5 bg-stone-50">
          
          {/* OTP Box */}
          <div className="bg-white border-2 border-dashed border-amber-400 rounded-2xl p-5 text-center shadow-sm">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
              Verification Code (OTP)
            </span>
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="text-4xl font-mono font-black tracking-widest text-stone-900 tabular-nums">
                {otp}
              </span>
              <button
                onClick={copyCode}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
                title="Copy OTP"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Valid for next </span>
              <span className="font-mono font-bold text-stone-900 tabular-nums">
                {mins}:{String(secs).padStart(2, '0')} mins
              </span>
            </div>
          </div>

          {/* QR Code Simulation */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-stone-800">Scan at Counter</div>
              <div className="text-[11px] text-stone-500">
                Direct merchant POS scanner verification
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Security Seal Verified</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-stone-900 rounded-lg p-2 flex items-center justify-center text-white shadow-inner">
              <QrCode className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Restaurant Details */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold text-stone-900">{order.restaurantName}</div>
            <div className="text-xs text-stone-500 leading-snug">{order.restaurantAddress}</div>
            
            <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(order.restaurantName + ' ' + order.restaurantAddress)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Get Directions</span>
              </a>
              <button
                onClick={() => alert(`Calling ${order.restaurantName} at +91 80 4912 3000...`)}
                className="py-2 px-3 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Kitchen</span>
              </button>
            </div>
          </div>

          {/* Environmental Impact Token */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
              🌱
            </div>
            <div className="text-xs">
              <span className="font-bold text-emerald-950">Food Waste Diverted! </span>
              <span className="text-emerald-800">
                You prevented 0.85 kg of fresh culinary preparation from going to a landfill.
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">Status: Awaiting Counter Pickup</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
