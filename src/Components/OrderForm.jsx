import { useState } from "react";
import Footer from "./Footer";

const FORMSPREE_URL = "https://formspree.io/f/mdajpony";

const FABRICS = [
  { id: "pp", name: "পিপি", gsm: "170-180 GSM", halfPrice: 300, fullPrice: 320 },
  { id: "mesh", name: "মেশ", gsm: "170-180 GSM", halfPrice: 300, fullPrice: 320 },
  { id: "boxmesh", name: "বক্সমেশ", gsm: "170-180 GSM", halfPrice: 320, fullPrice: 350 },
  { id: "honeycomb", name: "হানিকম", gsm: "170-180 GSM", halfPrice: 350, fullPrice: 380 },
  { id: "lorex", name: "লোরেক্স", gsm: "170-180 GSM", halfPrice: 380, fullPrice: 400 },
  { id: "lifjacquard", name: "লিফজেকার্ড", gsm: "170-180 GSM", halfPrice: 400, fullPrice: 450 },
];

const SIZES = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

const MANUFACTURING_PRODUCTS = [
  "কাস্টমাইজ সাবলিমেশন জার্সি",
  "জার্সি হাফ প্যান্ট",
  "জার্সি ট্রাউজার",
];

const READYMADE_PRODUCTS = [
  "জার্সি টিশার্ট",
  "মেশ পলোশার্ট",
  "লাকস্ট পলোশার্ট",
  "আইডি কার্ড",
  "আইডি কার্ডের বক্স",
  "আইডি কার্ডের ফিতা",
  "পকেট ব্যাচ",
  "সোল্ডার ব্যাচ",
  "টাই",
];

const DELIVERY_OPTIONS = [
  { val: "courier", emoji: "🚚", label: "কোরিয়ার" },
  { val: "home", emoji: "🏠", label: "হোম ডেলিভারি" },
  { val: "office", emoji: "🏢", label: "অফিস থেকে" },
];

const TERMS_LIST = [
  {
    key: "t1",
    text: "আমি নিশ্চিত করছি যে প্রদত্ত সকল তথ্য সঠিক। ডিজাইন কনফার্ম হওয়ার পর কোনো পরিবর্তন গ্রহণযোগ্য নয়। অগ্রিম প্রদত্ত অর্থ ফেরতযোগ্য নয়। ডেলিভারি খরচ মোট মূল্যের সাথে যোগ হবে এবং গ্রাহক তা পরিশোধ করবেন।",
  },
];

// ─── UI Components ────────────────────────────────────────────────────────────

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-4">
      <h2 className="text-[22px] sm:text-base font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function ToggleBtn({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 min-w-0 py-2 px-2 sm:px-4 rounded-xl",
        "text-xs sm:text-sm font-medium border",
        "whitespace-nowrap overflow-hidden text-ellipsis",
        "transition-all duration-150",
        active
          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
          : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-700",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Label({ children, required, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-600 mb-1.5"
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 " +
  "text-sm text-gray-800 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";

function Input({ type, onChange, ...props }) {
  const handleWheel = type === "number" ? (e) => e.target.blur() : undefined;
  return (
    <input
      type={type}
      onWheel={handleWheel}
      onChange={onChange}
      className={inputCls}
      {...props}
    />
  );
}

function Textarea({ onChange, ...props }) {
  return (
    <textarea
      rows={3}
      onChange={onChange}
      className={inputCls + " resize-y"}
      {...props}
    />
  );
}

function InfoBox({ children }) {
  return (
    <div className="bg-blue-50 border-l-4 border-red-500 rounded-r-xl px-4 py-3 text-sm text-blue-900 mb-4 leading-relaxed">
      {children}
    </div>
  );
}

function FieldError({ msg }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OrderForm() {
  const [productType, setProductType] = useState("manufacturing");
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [fabricStyles, setFabricStyles] = useState(
    Object.fromEntries(FABRICS.map((f) => [f.id, { half: false, full: false }]))
  );
  const [sizeCategory, setSizeCategory] = useState("adult");
  const [delivery, setDelivery] = useState("courier");
  const [courierPayer, setCourierPayer] = useState("customer");
  const [terms, setTerms] = useState({ t1: false });

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [readymadeQty, setReadymadeQty] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [quantity, setQuantity] = useState("");

  const [kolarHalfQty, setKolarHalfQty] = useState("");
  const [kolarFullQty, setKolarFullQty] = useState("");
  const [golGolaHalfQty, setGolGolaHalfQty] = useState("");
  const [golGolaFullQty, setGolGolaFullQty] = useState("");

  const [kidAge, setKidAge] = useState("");
  const [sizes, setSizes] = useState(
    Object.fromEntries(SIZES.map((s) => [s, ""]))
  );

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Computed
  const qty = parseInt(quantity) || 0;
  const sizeTotal = SIZES.reduce((sum, s) => sum + (parseInt(sizes[s]) || 0), 0);

  // Helpers
  const clearErr = (key) => setErrors((p) => ({ ...p, [key]: "" }));
  const setSizeAt = (size, val) => setSizes((p) => ({ ...p, [size]: val }));
  const toggleTerm = (key) => setTerms((p) => ({ ...p, [key]: !p[key] }));

  const switchType = (type) => {
    setProductType(type);
    setSelectedProduct([]);
    setReadymadeQty({});
  };

  const toggleProduct = (p) =>
    setSelectedProduct((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );

  const toggleFabricStyle = (fabricId, styleKey) =>
    setFabricStyles((prev) => ({
      ...prev,
      [fabricId]: { ...prev[fabricId], [styleKey]: !prev[fabricId][styleKey] },
    }));

  // Validation
  const validate = () => {
    const e = {};
    if (selectedProduct.length === 0) e.product = "অন্তত একটি পণ্য নির্বাচন করুন";
    if (!customerName.trim()) e.name = "নাম লিখুন";
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!customerPhone.trim()) e.phone = "মোবাইল নম্বর লিখুন";
    else if (!phoneRegex.test(customerPhone.replace(/\s/g, "")))
      e.phone = "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)";
    if (!customerAddress.trim()) e.address = "ঠিকানা লিখুন";


    if (!terms.t1) e.terms = "শর্তাবলী মেনে নিন";
    return e;
  };

  // Reset
  const resetForm = () => {
    setSubmitted(false);
    setSelectedProduct([]);
    setReadymadeQty({});
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setQuantity("");
    setKolarHalfQty("");
    setKolarFullQty("");
    setGolGolaHalfQty("");
    setGolGolaFullQty("");
    setKidAge("");
    setSizes(Object.fromEntries(SIZES.map((s) => [s, ""])));
    setSelectedFabric(null);
    setFabricStyles(
      Object.fromEntries(FABRICS.map((f) => [f.id, { half: false, full: false }]))
    );
    setTerms({ t1: false });
    setErrors({});
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document
        .getElementById(`field-${firstKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    const payload = new FormData();

    // ── ১. অর্ডার ওভারভিউ ও কাস্টমার ইনফো (সিরিয়াল ঠিক রাখার জন্য শুরুতে) ──
    payload.append("01. অডারের ধরন", productType === "manufacturing" ? "মেনুফেকচারিং" : "রেডিমেট পণ্য");
    payload.append("02. গ্রাহকের নাম", customerName.trim());
    payload.append("03. মোবাইল নম্বর", customerPhone.trim());
    payload.append("04. পূর্ণ ঠিকানা", customerAddress.trim());

    // ── ২. কন্ডিশনাল ডাটা হ্যান্ডলিং (মেনুফেকচারিং) ──
    if (productType === "manufacturing") {
      payload.append("05. নির্বাচিত পণ্য", selectedProduct.join(" | "));

      if (selectedFabric) {
        payload.append("06. ফেব্রিক", `${selectedFabric.name} (${selectedFabric.gsm})`);
      }

      payload.append("07. মোট অর্ডার পরিমাণ", `${quantity} পিস`);
      payload.append("08. সাইজ ক্যাটাগরি", sizeCategory === "adult" ? "বড়দের" : "বাচ্চাদের");

      if (sizeCategory === "kids" && kidAge.trim()) {
        payload.append("09. বাচ্চাদের বয়স ও পরিমাণ", kidAge.trim());
      }

      // বড়দের সাইজ ফিল্টারিং (শুধুমাত্র > 0 ভ্যালুগুলো যাবে)
      const sizeEntries = SIZES.filter((s) => {
        const val = parseInt(sizes[s]);
        return !isNaN(val) && val > 0;
      })
        .map((s) => `${s}: ${sizes[s]} পিস`)
        .join(" | ");

      if (sizeEntries) {
        payload.append("10. সাইজ চার্ট ডিটেইলস", sizeEntries);
      }

      // জার্সির স্টাইল অনুযায়ী পরিমাণ ফিল্টারিং (> 0 হলেই যাবে)
      if (parseInt(kolarHalfQty) > 0) payload.append("11. পরিমাণ (কলার হাফহাতা)", `${kolarHalfQty} পিস`);
      if (parseInt(kolarFullQty) > 0) payload.append("12. পরিমাণ (কলার ফুলহাতা)", `${kolarFullQty} পিস`);
      if (parseInt(golGolaHalfQty) > 0) payload.append("13. পরিমাণ (গোলগলা হাফহাতা)", `${golGolaHalfQty} পিস`);
      if (parseInt(golGolaFullQty) > 0) payload.append("14. পরিমাণ (গোলগলা ফুলহাতা)", `${golGolaFullQty} পিস`);
    }

    // ── ৩. কন্ডিশনাল ডাটা হ্যান্ডলিং (রেডিমেট) ──
    if (productType === "readymade") {
      // শুধু সিলেক্টেড এবং পরিমাণ ০ এর বেশি হওয়া প্রোডাক্টগুলোই যাবে
      const qtyDetails = selectedProduct
        .filter((p) => {
          const val = parseInt(readymadeQty[p]);
          return !isNaN(val) && val > 0;
        })
        .map((p) => `${p}: ${readymadeQty[p]} পিস`)
        .join(" | ");

      if (qtyDetails) {
        payload.append("05. রেডিমেট পণ্য ও পরিমাণ", qtyDetails);
      }
    }

    // ── ৪. ডেলিভারি ও লজিস্টিকস ──
    const deliveryOption = DELIVERY_OPTIONS.find((d) => d.val === delivery);
    payload.append(
      "15. ডেলিভারি পদ্ধতি",
      `${deliveryOption?.emoji || ""} ${deliveryOption?.label || delivery}`
    );
    payload.append(
      "16. কুরিয়ার চার্জ বহনকারী",
      courierPayer === "customer" ? "গ্রাহক" : "কোম্পানি"
    );

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg =
          data?.errors?.map((err) => err.message).join(", ") ||
          "সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
        alert(msg);
      }
    } catch {
      alert("নেটওয়ার্ক সমস্যা। ইন্টারনেট সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success Screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-sm w-full">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3">ধন্যবাদ!</h1>
          <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
            আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার
            সাথে যোগাযোগ করবে। অনুগ্রহ করে অপেক্ষা করুন।
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="w-full py-3 rounded-xl font-medium text-white transition bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
          >
            নতুন অর্ডার করুন
          </button>
        </div>
      </div>
    );
  }

  // ── Main Form ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 py-6 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-red-600 rounded-2xl p-6 sm:p-8 mb-5 text-center shadow-md">
          <h1 className="text-[21px] sm:text-3xl font-bold text-white mb-1">
            🎽 কাস্টমাইজ জার্সি অর্ডার ফরম
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
        >

          {/* ── 1. Product Type ──────────────────────────────────────────── */}
          <SectionCard title="কোন পণ্যটি অর্ডার করতে চান? নির্বাচন করুন">
            <div className="flex gap-2 mb-4">
              <ToggleBtn
                label="🏭 মেনুফেকচারিং"
                active={productType === "manufacturing"}
                onClick={() => switchType("manufacturing")}
              />
              <ToggleBtn
                label="📦 রেডিমেট পণ্য"
                active={productType === "readymade"}
                onClick={() => switchType("readymade")}
              />
            </div>

            <Label>
              পণ্য নির্বাচন করুন <span className="text-red-500">*</span>
            </Label>

            <div id="field-product" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(productType === "manufacturing"
                ? MANUFACTURING_PRODUCTS
                : READYMADE_PRODUCTS
              ).map((p) => (
                <label
                  key={p}
                  className={[
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200",
                    selectedProduct.includes(p)
                      ? "border-red-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-blue-300",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={selectedProduct.includes(p)}
                    onChange={() => {
                      toggleProduct(p);
                      clearErr("product");
                    }}
                    className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm font-medium text-gray-800 flex-1">{p}</span>

                  {/* ── Quantity input (readymade only, when checked) ── */}
                  {productType === "readymade" && selectedProduct.includes(p) && (
                    <input
                      type="number"
                      min="1"
                      placeholder="পিস"
                      value={readymadeQty[p] || ""}
                      onClick={(e) => e.preventDefault()}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {
                        e.stopPropagation();
                        setReadymadeQty((prev) => ({ ...prev, [p]: e.target.value }));
                      }}
                      className={
                        "w-20 text-center px-2 py-1.5 rounded-lg border border-gray-300 " +
                        "bg-white text-sm text-gray-800 " +
                        "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      }
                    />
                  )}
                </label>
              ))}
            </div>
            <FieldError msg={errors.product} />
          </SectionCard>

          {/* ── 2. Customer Info ─────────────────────────────────────────── */}
          <SectionCard title="গ্রাহকের তথ্য">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div id="field-name">
                <Label htmlFor="customerName" required>
                  গ্রাহকের নাম
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="আপনার পুরো নাম"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    clearErr("name");
                  }}
                />
                <FieldError msg={errors.name} />
              </div>

              <div id="field-phone">
                <Label htmlFor="customerPhone" required>
                  মোবাইল নম্বর
                </Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    clearErr("phone");
                  }}
                />
                <FieldError msg={errors.phone} />
              </div>
            </div>

            <div id="field-address">
              <Label htmlFor="customerAddress" required>
                ঠিকানা (গ্রাম + পোস্ট + থানা + জেলা)
              </Label>
              <Textarea
                id="customerAddress"
                placeholder="পূর্ণ ঠিকানা লিখুন..."
                value={customerAddress}
                onChange={(e) => {
                  setCustomerAddress(e.target.value);
                  clearErr("address");
                }}
              />
              <FieldError msg={errors.address} />
            </div>
          </SectionCard>

          {/* ── 3. Fabric & Style (manufacturing only) ───────────────────── */}
          {productType === "manufacturing" && (
            <SectionCard title="ফেব্রিক ও স্টাইল">
              <div id="field-fabric">
                <FieldError msg={errors.fabric} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  {FABRICS.map((f) => (
                    <div
                      key={f.id}
                      className={[
                        "p-4 rounded-xl border transition-all duration-150",
                        selectedFabric?.id === f.id
                          ? "border-red-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 bg-white",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-gray-800">
                            {f.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">{f.gsm}</p>
                        </div>
                        <input
                          type="radio"
                          name="fabric-radio"
                          checked={selectedFabric?.id === f.id}
                          onChange={() => {
                            setSelectedFabric(f);
                            clearErr("fabric");
                            clearErr("style");
                          }}
                          className="w-5 h-5 accent-blue-600 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-3">



                      </div>
                    </div>
                  ))}
                </div>

                <div id="field-style">
                  <FieldError msg={errors.style} />
                </div>
              </div>
            </SectionCard>
          )}

          {/* ── 4. Quantity & Price (manufacturing only) ─────────────────── */}
          {productType === "manufacturing" && (
            <SectionCard title="পরিমাণ ও মূল্য">
              <InfoBox>
                ন্যূনতম <strong>১০ পিস</strong> অর্ডার করতে হবে।
              </InfoBox>

              <div id="field-qty" className="mb-4">
                <Label htmlFor="quantity" required>
                  মোট কত পিস জার্সি?
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="10"
                  placeholder="পিস সংখ্যা লিখুন (ন্যূনতম ১০)"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    clearErr("qty");
                  }}
                />
                <FieldError msg={errors.qty} />
              </div>
            </SectionCard>
          )}

          {/* ── 5. Size Chart (manufacturing only) ───────────────────────── */}
          {productType === "manufacturing" && (
            <SectionCard title="সাইজ চার্ট">
              <div className="mb-4">
                <Label>সাইজ ক্যাটাগরি</Label>
                <div className="flex gap-2">
                  <ToggleBtn
                    label="বড়দের মাপ"
                    active={sizeCategory === "adult"}
                    onClick={() => setSizeCategory("adult")}
                  />
                  <ToggleBtn
                    label="বাচ্চাদের মাপ"
                    active={sizeCategory === "kids"}
                    onClick={() => setSizeCategory("kids")}
                  />
                </div>
              </div>

              {sizeCategory === "kids" && (
                <div className="mb-4">
                  <Label htmlFor="kidAge">বাচ্চার বয়স এবং পরিমাণ দিন</Label>
                  <Input
                    id="kidAge"
                    type="text"
                    placeholder="যেমন: ১ বছরের ৫ পিছ, ৭ বছরে ১০ পিছ ......"
                    value={kidAge}
                    onChange={(e) => setKidAge(e.target.value)}
                  />
                </div>
              )}

              {/* শুধু বড়দের মাপ সিলেক্ট করা থাকলেই নিচের সাইজ গ্রিডটি দেখাবে */}
              {sizeCategory === "adult" && (
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {SIZES.map((size) => (
                    <div key={size} className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-gray-500">{size}</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={sizes[size]}
                        onWheel={(e) => e.target.blur()}
                        onChange={(e) => setSizeAt(size, e.target.value)}
                        className={
                          "w-full text-center px-1 py-2 rounded-xl border border-gray-200 " +
                          "bg-gray-50 text-sm text-gray-800 " +
                          "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* মোট সাইজের হিসাবটাও শুধু বড়দের জন্য দেখাবে, যেহেতু বাচ্চাদের হিসাব আলাদা */}
              {sizeCategory === "adult" && sizeTotal > 0 && (
                <p className="mt-3 text-sm text-gray-500 text-right">
                  মোট সাইজ:{" "}
                  <strong className="text-blue-700">{sizeTotal} পিস</strong>
                </p>
              )}
            </SectionCard>
          )}

          {/* ── 6. Jersey Qty per Style (manufacturing only) ─────────────── */}
          {productType === "manufacturing" && (
            <SectionCard title="জার্সি এর পরিমাণ দিন">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="kolarHalfQty">কলার হাফহাতা</Label>
                  <Input
                    id="kolarHalfQty"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={kolarHalfQty}
                    onChange={(e) => setKolarHalfQty(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="kolarFullQty">কলার ফুলহাতা</Label>
                  <Input
                    id="kolarFullQty"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={kolarFullQty}
                    onChange={(e) => setKolarFullQty(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="golGolaHalfQty">গোলগলা হাফহাতা</Label>
                  <Input
                    id="golGolaHalfQty"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={golGolaHalfQty}
                    onChange={(e) => setGolGolaHalfQty(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="golGolaFullQty">গোলগলা ফুলহাতা</Label>
                  <Input
                    id="golGolaFullQty"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={golGolaFullQty}
                    onChange={(e) => setGolGolaFullQty(e.target.value)}
                  />
                </div>
              </div>
            </SectionCard>
          )}

          {/* ── 7. Delivery ──────────────────────────────────────────────── */}
          <SectionCard title="ডেলিভারি পদ্ধতি">
            <Label>ডেলিভারির ধরন নির্বাচন করুন</Label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              {DELIVERY_OPTIONS.map(({ val, emoji, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDelivery(val)}
                  className={[
                    "py-3 px-1 rounded-xl border text-center transition-all",
                    delivery === val
                      ? "border-blue-600 bg-blue-50 text-blue-800"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300",
                  ].join(" ")}
                >
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="text-xs font-medium leading-snug">{label}</div>
                </button>
              ))}
            </div>

            <Label>কুরিয়ার চার্জ কে বহন করবেন?</Label>
            <div className="flex gap-2">
              <ToggleBtn
                label="গ্রাহক"
                active={courierPayer === "customer"}
                onClick={() => setCourierPayer("customer")}
              />
              <ToggleBtn
                label="কোম্পানি"
                active={courierPayer === "company"}
                onClick={() => setCourierPayer("company")}
              />
            </div>
          </SectionCard>

          {/* ── 8. Terms & Submit ─────────────────────────────────────────── */}
          <SectionCard title="শর্তাবলী ও চুক্তি">
            <div className="space-y-3 mb-5" id="field-terms">
              {TERMS_LIST.map(({ key, text }) => (
                <label
                  key={key}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={terms[key]}
                    onChange={() => {
                      toggleTerm(key);
                      clearErr("terms");
                    }}
                    className="mt-0.5 w-5 h-5 rounded accent-blue-600 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition leading-relaxed">
                    {text}
                  </span>
                </label>
              ))}
            </div>

            <FieldError msg={errors.terms} />

            <button
              type="submit"
              disabled={submitting}
              className={[
                "mt-3 w-full py-4 rounded-2xl font-semibold text-base text-white shadow-lg",
                "bg-gradient-to-r from-blue-600 to-red-600",
                "hover:from-blue-700 hover:to-red-700",
                "transition-all duration-200 active:scale-[0.99]",
                submitting ? "opacity-70 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {submitting ? "⏳ পাঠানো হচ্ছে..." : "✅ অর্ডার কনফার্ম করুন"}
            </button>
          </SectionCard>

          {/* WhatsApp Support */}
          <div className="w-full flex justify-center px-4 mt-6">
            <div className="w-full max-w-xl text-center text-green-600">
              <p className="text-base sm:text-lg font-medium">
                👉 আরো জানাতে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন
              </p>
              <a
                href="https://wa.me/8801305506395"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center mt-3 text-white bg-green-500 px-5 py-2 rounded-full text-sm sm:text-base font-semibold"
              >
                সাপোর্ট টিম
              </a>
            </div>
          </div>

        </form>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}