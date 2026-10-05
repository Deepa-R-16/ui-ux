import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Ticket, Download, ArrowRight, Smartphone, CreditCard, Building2 } from 'lucide-react';
import { PulseEvent, SelectedTicketBooking, BookedPass } from '../types';

interface CheckoutModalProps {
  event: PulseEvent;
  bookings: SelectedTicketBooking[];
  subtotal: number;
  bookingFee: number;
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (bookedPass: BookedPass) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  event,
  bookings,
  subtotal,
  bookingFee,
  total,
  isOpen,
  onClose,
  onBookingConfirmed
}) => {
  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [name, setName] = useState('Deepak Sundaram');
  const [email, setEmail] = useState('deepak.sundaram@chennai.in');
  const [phone, setPhone] = useState('+91 98401 23456');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [confirmedPass, setConfirmedPass] = useState<BookedPass | null>(null);

  if (!isOpen) return null;

  const totalTickets = bookings.reduce((sum, b) => sum + b.quantity, 0);

  const handlePay = () => {
    setStep('processing');

    setTimeout(() => {
      const generatedPass: BookedPass = {
        bookingId: `MS-CHE-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
        eventId: event.id,
        eventTitle: event.title,
        date: event.fullDate,
        time: event.timeString,
        venue: event.venue,
        neighborhood: event.neighborhood,
        tickets: bookings.map((b) => ({
          name: b.ticketName,
          quantity: b.quantity,
          price: b.price
        })),
        totalAmount: total,
        attendeeName: name,
        attendeeEmail: email,
        attendeePhone: phone,
        bookedAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        qrPayload: `MADRAS-STAGE:${event.id}:${totalTickets}TICKETS:CONFIRMED`,
        gate: 'Gate B (Anna Salai Entrance)',
        zone: bookings[0]?.ticketName || 'General Zone'
      };

      setConfirmedPass(generatedPass);
      onBookingConfirmed(generatedPass);
      setStep('confirmed');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 sm:p-7 shadow-2xl text-slate-900 dark:text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Details & Payment */}
        {step === 'details' && (
          <div>
            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-600 font-bold block mb-1">
                Madras Stage Box Office
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Complete Your Booking
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {event.title} · {event.venue}, {event.neighborhood}
              </p>
            </div>

            {/* Order breakdown */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] mb-5 space-y-2 shadow-sm">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Order Summary:</div>
              {bookings.map((b) => (
                <div key={b.ticketId} className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>{b.ticketName} × {b.quantity}</span>
                  <span className="font-mono">₹{(b.quantity * b.price).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs text-slate-500 pt-1.5 border-t border-slate-200 dark:border-[#212c42]">
                <span>Facility & 18% GST Fee:</span>
                <span className="font-mono">₹{bookingFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-[#212c42]">
                <span>Total Amount:</span>
                <span className="font-mono text-rose-600 text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Attendee Form */}
            <div className="space-y-3.5 mb-5">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                Attendee Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Email (Digital Pass Delivery)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div className="space-y-2.5 mb-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                Select Payment Mode
              </h4>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'upi'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 text-rose-600 dark:text-rose-400'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-semibold">UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 text-rose-600 dark:text-rose-400'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-semibold">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 text-rose-600 dark:text-rose-400'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-semibold">NetBanking</span>
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Pay ₹{total.toLocaleString('en-IN')} Securely</span>
            </button>
          </div>
        )}

        {/* STEP 2: Processing Spinner */}
        {step === 'processing' && (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full border-4 border-rose-200 border-t-rose-600 animate-spin" />
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Authorizing Admission Pass...
            </h3>
            <p className="text-xs text-slate-500">
              Generating your unique Chennai Box Office digital pass QR...
            </p>
          </div>
        )}

        {/* STEP 3: Confirmed Digital Pass */}
        {step === 'confirmed' && confirmedPass && (
          <div>
            <div className="text-center mb-5">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Booking Confirmed!
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official digital pass generated and sent to <strong className="text-slate-900 dark:text-white">{confirmedPass.attendeeEmail}</strong>.
              </p>
            </div>

            {/* DIGITAL PASS TICKET DESIGN */}
            <div className="rounded-xl bg-slate-900 text-white p-5 shadow-sm border border-slate-700 mb-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-rose-600 text-white text-[11px] font-extrabold flex items-center justify-center">
                    M
                  </div>
                  <span className="font-display font-bold text-xs tracking-wider uppercase">
                    MADRAS STAGE PASS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-900">
                  {confirmedPass.bookingId}
                </span>
              </div>

              {/* Pass Content */}
              <div className="grid grid-cols-3 gap-3 items-center">
                <div className="col-span-2 space-y-1.5">
                  <h3 className="font-display font-bold text-base leading-tight">
                    {confirmedPass.eventTitle}
                  </h3>
                  <div className="text-xs text-slate-300">
                    📅 {confirmedPass.date}
                  </div>
                  <div className="text-xs text-slate-300">
                    ⏰ {confirmedPass.time}
                  </div>
                  <div className="text-xs text-slate-300">
                    📍 {confirmedPass.venue}, {confirmedPass.neighborhood}
                  </div>
                  <div className="pt-1.5 text-xs text-slate-200">
                    Pass Holder: <strong className="text-white">{confirmedPass.attendeeName}</strong>
                  </div>
                </div>

                {/* SVG/CSS QR Code */}
                <div className="flex flex-col items-center justify-center p-2 rounded bg-white text-slate-900">
                  <svg className="w-18 h-18" viewBox="0 0 80 80" fill="none">
                    <rect width="80" height="80" fill="white" />
                    <rect x="5" y="5" width="22" height="22" fill="black" />
                    <rect x="8" y="8" width="16" height="16" fill="white" />
                    <rect x="11" y="11" width="10" height="10" fill="black" />
                    <rect x="53" y="5" width="22" height="22" fill="black" />
                    <rect x="56" y="8" width="16" height="16" fill="white" />
                    <rect x="59" y="11" width="10" height="10" fill="black" />
                    <rect x="5" y="53" width="22" height="22" fill="black" />
                    <rect x="8" y="56" width="16" height="16" fill="white" />
                    <rect x="11" y="59" width="10" height="10" fill="black" />
                    <rect x="32" y="8" width="8" height="8" fill="black" />
                    <rect x="42" y="14" width="8" height="8" fill="black" />
                    <rect x="32" y="32" width="16" height="16" fill="black" />
                    <rect x="52" y="32" width="10" height="10" fill="black" />
                    <rect x="32" y="56" width="12" height="12" fill="black" />
                    <rect x="50" y="56" width="16" height="16" fill="black" />
                  </svg>
                  <span className="text-[8px] font-mono font-bold mt-0.5 text-slate-800">
                    SCAN AT GATE
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-dashed border-slate-700 flex items-center justify-between text-[10px] text-slate-400">
                <span>Total Paid: ₹{confirmedPass.totalAmount.toLocaleString('en-IN')}</span>
                <span>{totalTickets} Ticket(s) Validated</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View in My Tickets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => alert(`Pass #${confirmedPass.bookingId} downloaded to device!`)}
                className="px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
