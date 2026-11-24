import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            GET IN TOUCH
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-[#30231D] uppercase tracking-tight">
            CONNECT WITH <br />
            <span className="text-[#B52A24]">OUR KITCHEN.</span>
          </h1>
          <p className="text-sm text-[#30231D]/75">
            Whether you have a dietary question, bulk corporate gifting inquiry, or simply want to chat about pickles, we are always happy to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#30231D]/10 shadow-lg space-y-6">
            <h3 className="font-display font-black text-xl text-[#30231D] uppercase">
              DIRECT REACH
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href="https://wa.me/917034513689"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-[#30231D] block">
                    Instant WhatsApp Support
                  </span>
                  <span className="text-[11px] text-[#30231D]/70 font-mono-tag">
                    Tap to message our kitchen team directly
                  </span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-[#FFF5E8] border border-[#30231D]/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#30231D] text-[#FFF5E8] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#30231D] block">
                    Order Assistance Line
                  </span>
                  <span className="text-[11px] text-[#30231D]/70 font-mono-tag">
                    +91 70345 13689
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF5E8] border border-[#30231D]/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#30231D] text-[#FFF5E8] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#30231D] block">
                    Kitchen Email
                  </span>
                  <span className="text-[11px] text-[#30231D]/70 font-mono-tag">
                    hello@shepickle.com (Sample)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF5E8] border border-[#30231D]/10 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#30231D] text-[#FFF5E8] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#30231D] block">
                    Kitchen & Packaging Center
                  </span>
                  <span className="text-[11px] text-[#30231D]/70">
                    SHE PICKLE Artisanal Units, Kerala, India (Editable Address)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF5E8] border border-[#30231D]/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#30231D] text-[#FFF5E8] flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#30231D] block">
                    Batch Packing Hours
                  </span>
                  <span className="text-[11px] text-[#30231D]/70">
                    Monday to Saturday • 9:00 AM - 6:00 PM IST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#30231D]/10 shadow-lg">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#536B35]/20 text-[#536B35] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-black text-2xl text-[#30231D] uppercase">
                  MESSAGE SENT SUCCESSFULLY!
                </h3>
                <p className="text-xs text-[#30231D]/70 max-w-sm mx-auto">
                  Thank you for reaching out. A kitchen coordinator will review your inquiry and reply within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#30231D] text-white rounded-full text-xs font-bold font-mono-tag"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-black text-xl text-[#30231D] uppercase">
                  SEND US A NOTE
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs text-[#30231D] focus:outline-none focus:border-[#B52A24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-2.5 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs text-[#30231D] focus:outline-none focus:border-[#B52A24]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-4 py-2.5 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs text-[#30231D] focus:outline-none focus:border-[#B52A24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      Topic / Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs text-[#30231D] focus:outline-none focus:border-[#B52A24]"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Order Tracking">Order Tracking</option>
                      <option value="Bulk / Wedding Gifting">Bulk / Wedding Gifting</option>
                      <option value="Wholesale Distribution">Wholesale Distribution</option>
                      <option value="Dietary Questions">Dietary Questions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind or request custom quantity quotes..."
                    className="w-full px-4 py-2.5 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs text-[#30231D] focus:outline-none focus:border-[#B52A24]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B52A24] hover:bg-[#8C1C17] text-white rounded-full font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#B52A24]/20"
                >
                  <Send size={15} />
                  <span>SEND MESSAGE TO KITCHEN</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

