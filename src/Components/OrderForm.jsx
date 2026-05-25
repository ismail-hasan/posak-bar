import { useState } from "react";
import Footer from "./Footer";

// ─── Formspree endpoint ───────────────────────────────────────────────────────
const FORMSPREE_URL = "https://formspree.io/f/mojbnkok";

// ─── Constants ────────────────────────────────────────────────────────────────

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

const PAYMENT_OPTIONS = [
      { val: "bkash", emoji: "📱", name: "বিকাশ", num: "017XXXXXXXX" },
      { val: "nagad", emoji: "📱", name: "নগদ", num: "01985569964" },
      { val: "bank", emoji: "🏦", name: "ব্যাংক", num: "পুবালী ব্যাংক" },
];

const TERMS_LIST = [
      { key: "t1", text: "আমি নিশ্চিত করছি যে প্রদত্ত সকল তথ্য সঠিক।" },
      { key: "t2", text: "ডিজাইন কনফার্ম হওয়ার পর কোনো পরিবর্তন গ্রহণযোগ্য নয়।" },
      { key: "t3", text: "অগ্রিম প্রদত্ত অর্থ ফেরতযোগ্য নয়।" },
      { key: "t4", text: "ডেলিভারি খরচ মোট মূল্যের সাথে যোগ হবে এবং গ্রাহক তা পরিশোধ করবেন।" },
];

// ─── Reusable UI components ───────────────────────────────────────────────────

/** White card wrapping each numbered form section */
function SectionCard({ step, icon, title, children }) {
      return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-4">

                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4">
                        {title} নির্বাচন করুন
                  </h2>
                  {children}
            </div>
      );
}

/** Blue-active / white-inactive toggle pill */
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

/** Field label — adds a red asterisk when required */
function Label({ children, required, htmlFor }) {
      return (
            <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-600 mb-1.5">
                  {children}
                  {required && <span className="text-red-500 ml-1">*</span>}
            </label>
      );
}

/** Shared Tailwind classes for every text input / select / textarea */
const inputCls =
      "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 " +
      "text-sm text-gray-800 placeholder-gray-400 " +
      "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";

function Input(props) { return <input    {...props} className={inputCls} />; }
function Textarea(props) { return <textarea {...props} rows={3} className={inputCls + " resize-y"} />; }
function SelectEl({ children, ...p }) {
      return <select {...p} className={inputCls}>{children}</select>;
}

/** File input with a styled "Browse" button */
function FileInput(props) {
      return (
            <input
                  type="file"
                  {...props}
                  className={
                        "w-full text-sm text-gray-500 cursor-pointer " +
                        "file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 " +
                        "file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 " +
                        "hover:file:bg-blue-100"
                  }
            />
      );
}

/** Blue notice box with red left accent border */
function InfoBox({ children }) {
      return (
            <div className="bg-blue-50 border-l-4 border-red-500 rounded-r-xl px-4 py-3 text-sm text-blue-900 mb-4 leading-relaxed">
                  {children}
            </div>
      );
}

/** Auto-calculated read-only price display */
function ReadonlyPrice({ value, placeholder }) {
      return (
            <div className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-blue-50 text-sm font-semibold text-blue-700 min-h-[42px]">
                  {value || <span className="text-gray-400 font-normal">{placeholder}</span>}
            </div>
      );
}

/** Red validation error under a field */
function FieldError({ msg }) {
      return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

/** One row inside the price summary box */
function PriceRow({ label, value }) {
      return (
            <div className="flex justify-between text-sm text-gray-600">
                  <span>{label}</span>
                  <span>{value || "—"}</span>
            </div>
      );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OrderForm() {

      // ── UI state (controls toggles / card selection) ─────────────────────────
      const [productType, setProductType] = useState("manufacturing");
      const [selectedFabric, setSelectedFabric] = useState(null);
      const [sleeve, setSleeve] = useState("half");
      const [collar, setCollar] = useState("round");
      const [sizeCategory, setSizeCategory] = useState("adult");
      const [delivery, setDelivery] = useState("courier");
      const [courierPayer, setCourierPayer] = useState("customer");
      const [paymentMethod, setPaymentMethod] = useState("bkash");
      const [terms, setTerms] = useState(
            { t1: false, t2: false, t3: false, t4: false }
      );

      // ── Form-field state (values sent to Formspree) ───────────────────────────
      const [selectedProduct, setSelectedProduct] = useState("");
      const [customerName, setCustomerName] = useState("");
      const [customerPhone, setCustomerPhone] = useState("");
      const [customerAddress, setCustomerAddress] = useState("");
      const [quantity, setQuantity] = useState("");
      const [instructions, setInstructions] = useState("");
      const [kidAge, setKidAge] = useState("");
      const [sizes, setSizes] = useState(
            Object.fromEntries(SIZES.map((s) => [s, ""]))
      );
      const [advanceAmount, setAdvanceAmount] = useState("");

      // ── Submission state ──────────────────────────────────────────────────────
      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false); // true while fetch is in-flight
      const [submitted, setSubmitted] = useState(false); // true after success

      // ── Computed prices ───────────────────────────────────────────────────────
      const qty = parseInt(quantity) || 0;
      const unitPrice = selectedFabric
            ? sleeve === "half" ? selectedFabric.halfPrice : selectedFabric.fullPrice
            : null;
      const totalPrice = unitPrice && qty >= 10 ? unitPrice * qty : null;
      const advanceCalc = totalPrice ? Math.round(totalPrice * 0.3) : null;
      const dueCalc = totalPrice && advanceCalc ? totalPrice - advanceCalc : null;
      const sizeTotal = SIZES.reduce((sum, s) => sum + (parseInt(sizes[s]) || 0), 0);

      // ── Small helpers ─────────────────────────────────────────────────────────
      const clearErr = (key) => setErrors((p) => ({ ...p, [key]: "" }));
      const setSizeAt = (size, val) => setSizes((p) => ({ ...p, [size]: val }));
      const toggleTerm = (key) => setTerms((p) => ({ ...p, [key]: !p[key] }));
      const switchType = (type) => { setProductType(type); setSelectedProduct(""); };

      // ── Client-side validation ────────────────────────────────────────────────
      const validate = () => {
            const e = {};
            if (!customerName.trim()) e.name = "নাম প্রয়োজন";
            if (!customerPhone.trim()) e.phone = "মোবাইল নম্বর প্রয়োজন";
            if (!customerAddress.trim()) e.address = "ঠিকানা প্রয়োজন";
            if (productType === "manufacturing") {
                  if (!selectedFabric) e.fabric = "ফেব্রিক নির্বাচন করুন";
                  if (!quantity || qty < 10) e.qty = "ন্যূনতম ১০ পিস অর্ডার করতে হবে";
            }
            if (!terms.t1 || !terms.t2 || !terms.t3 || !terms.t4)
                  e.terms = "সকল শর্তাবলী মেনে নিতে হবে";
            return e;
      };

      // ── Form submit — sends to Formspree ─────────────────────────────────────
      const handleSubmit = async (e) => {
            e.preventDefault(); // prevent native form navigation

            // 1. Client-side validation first
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

            // 2. Build a plain FormData from the <form> element so file uploads work
            const formEl = e.target;
            const payload = new FormData(formEl);

            // 3. Append computed / toggle values that have no native <input> in the DOM
            payload.append("পণ্যের ধরন", productType === "manufacturing" ? "মেনুফেকচারিং" : "রেডিমেট");
            payload.append("ফেব্রিক", selectedFabric ? selectedFabric.name : "—");
            payload.append("গলার ধরন", collar === "round" ? "গোলগলা" : "কলার");
            payload.append("হাতার ধরন", sleeve === "half" ? "হাফহাতা" : "ফুলহাতা");
            payload.append("একক মূল্য", unitPrice ? `৳ ${unitPrice}` : "—");
            payload.append("মোট মূল্য", totalPrice ? `৳ ${totalPrice.toLocaleString()}` : "—");
            payload.append("৩০% অগ্রিম", advanceCalc ? `৳ ${advanceCalc.toLocaleString()}` : "—");
            payload.append("বাকি", dueCalc ? `৳ ${dueCalc.toLocaleString()}` : "—");
            payload.append("সাইজ ক্যাটাগরি", sizeCategory === "adult" ? "বড়দের" : "বাচ্চাদের");
            payload.append("ডেলিভারি পদ্ধতি", delivery);
            payload.append("কুরিয়ার চার্জ", courierPayer === "customer" ? "গ্রাহক" : "কোম্পানি");
            payload.append("পেমেন্ট মেথড", paymentMethod);
            payload.append("মোট সাইজ পিস", sizeTotal.toString());
            // Individual size quantities
            SIZES.forEach((s) => {
                  if (sizes[s]) payload.append(`সাইজ ${s}`, sizes[s]);
            });

            // 4. POST to Formspree
            try {
                  const res = await fetch(FORMSPREE_URL, {
                        method: "POST",
                        body: payload,
                        headers: { Accept: "application/json" },
                  });

                  if (res.ok) {
                        setSubmitted(true);
                        formEl.reset(); // clear native file inputs
                  } else {
                        const data = await res.json().catch(() => ({}));
                        const msg = data?.errors?.map((err) => err.message).join(", ")
                              || "সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
                        alert(msg);
                  }
            } catch {
                  alert("নেটওয়ার্ক সমস্যা। ইন্টারনেট সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।");
            } finally {
                  setSubmitting(false);
            }
      };

      // ── Success screen ────────────────────────────────────────────────────────
      if (submitted) {
            return (
                  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-sm w-full">
                              <div className="text-5xl mb-4">🎉</div>
                              <h1 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3">ধন্যবাদ!</h1>
                              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                                    আপনার অর্ডার সফলভাবে গৃহীত হয়েছে।
                                    আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                                    অনুগ্রহ করে অপেক্ষা করুন।
                              </p>
                              <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className={
                                          "w-full py-3 rounded-xl font-medium text-white transition " +
                                          "bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
                                    }
                              >
                                    নতুন অর্ডার করুন
                              </button>
                        </div>
                  </div>
            );
      }

      // ── Main form ─────────────────────────────────────────────────────────────
      return (
            <div className="min-h-screen bg-slate-50 py-6 px-3 sm:px-6">
                  <div className="max-w-2xl mx-auto">

                        {/* ── Header ─────────────────────────────────────────────────────── */}
                        <div className="bg-gradient-to-r from-blue-700 to-red-600 rounded-2xl p-6 sm:p-8 mb-5 text-center shadow-md">
                              <h1 className="text-[21px] sm:text-3xl font-bold text-white mb-1">
                                    🎽 কাস্টমাইজ জার্সি অর্ডার ফরম
                              </h1>
                        </div>

                        {/*
          ── The <form> tag ──────────────────────────────────────────────────
          action  = Formspree endpoint (fallback if JS is disabled)
          method  = POST
          encType = multipart/form-data (required for file uploads)
          onSubmit= our async handler (intercepts and uses fetch instead)
        */}
                        <form
                              action={FORMSPREE_URL}
                              method="POST"
                              encType="multipart/form-data"
                              onSubmit={handleSubmit}
                              noValidate
                        >

                              {/* ── Section 1: Product Type ─────────────────────────────────── */}
                              <SectionCard step={1} icon="🛍️" title="কোন পণ্যটি অর্ডার করতে চান?">
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

                                    {/* This select IS a native input — its name goes to Formspree */}
                                    <Label htmlFor="selectedProduct">পণ্য নির্বাচন করুন</Label>
                                    <SelectEl
                                          id="selectedProduct"
                                          name="পণ্য"
                                          value={selectedProduct}
                                          onChange={(e) => setSelectedProduct(e.target.value)}
                                    >
                                          <option value="">— নির্বাচন করুন —</option>
                                          {(productType === "manufacturing"
                                                ? MANUFACTURING_PRODUCTS
                                                : READYMADE_PRODUCTS
                                          ).map((p) => (
                                                <option key={p} value={p}>{p}</option>
                                          ))}
                                    </SelectEl>

                              </SectionCard>

                              {/* ── Section 2: Customer Info ────────────────────────────────── */}
                              <SectionCard step={2} icon="👤" title="গ্রাহকের তথ্য">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                                          <div id="field-name">
                                                <Label htmlFor="customerName" required>গ্রাহকের নাম</Label>
                                                <Input
                                                      id="customerName"
                                                      name="গ্রাহকের নাম"
                                                      type="text"
                                                      placeholder="আপনার পুরো নাম"
                                                      value={customerName}
                                                      onChange={(e) => { setCustomerName(e.target.value); clearErr("name"); }}
                                                />
                                                <FieldError msg={errors.name} />
                                          </div>

                                          <div id="field-phone">
                                                <Label htmlFor="customerPhone" required>মোবাইল নম্বর</Label>
                                                <Input
                                                      id="customerPhone"
                                                      name="মোবাইল নম্বর"
                                                      type="tel"
                                                      placeholder="01XXXXXXXXX"
                                                      value={customerPhone}
                                                      onChange={(e) => { setCustomerPhone(e.target.value); clearErr("phone"); }}
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
                                                name="ঠিকানা"
                                                placeholder="পূর্ণ ঠিকানা লিখুন..."
                                                value={customerAddress}
                                                onChange={(e) => { setCustomerAddress(e.target.value); clearErr("address"); }}
                                          />
                                          <FieldError msg={errors.address} />
                                    </div>

                              </SectionCard>

                              {/* ── Section 3: Fabric & Style (manufacturing only) ──────────── */}
                              {productType === "manufacturing" && (
                                    <SectionCard step={3} icon="👕" title="ফেব্রিক ও স্টাইল ">

                                          <div id="field-fabric">
                                                <FieldError msg={errors.fabric} />

                                                {/* Fabric card buttons — selection stored in state, appended in handleSubmit */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                                                      {FABRICS.map((f) => (
                                                            <button
                                                                  key={f.id}
                                                                  type="button"
                                                                  onClick={() => { setSelectedFabric(f); clearErr("fabric"); }}
                                                                  className={[
                                                                        "text-left p-3.5 rounded-xl border transition-all duration-150",
                                                                        selectedFabric?.id === f.id
                                                                              ? "border-red-500 bg-blue-50 shadow-sm"
                                                                              : "border-gray-200 bg-white hover:border-blue-300",
                                                                  ].join(" ")}
                                                            >
                                                                  <div className="flex flex-wrap items-center gap-1 mb-1">
                                                                        <span className="text-sm font-semibold text-gray-800">{f.name}</span>
                                                                        <span className="text-xs text-gray-400">{f.gsm}</span>
                                                                  </div>
                                                                  <div className="flex flex-wrap gap-x-3 text-xs text-blue-700">
                                                                        <span>হাফহাতা: ৳{f.halfPrice}</span>
                                                                        <span>ফুলহাতা: ৳{f.fullPrice}</span>
                                                                  </div>
                                                            </button>
                                                      ))}
                                                </div>
                                          </div>

                                          {/* Collar + sleeve toggles (state only, appended in handleSubmit) */}
                                          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                      <Label>গলার ধরন</Label>
                                                      <div className="flex gap-2">
                                                            <ToggleBtn label="গোলগলা" active={collar === "round"} onClick={() => setCollar("round")} />
                                                            <ToggleBtn label="কলার" active={collar === "collar"} onClick={() => setCollar("collar")} />
                                                      </div>
                                                </div>
                                                <div>
                                                      <Label>হাতার ধরন</Label>
                                                      <div className="flex gap-2">
                                                            <ToggleBtn label="হাফহাতা" active={sleeve === "half"} onClick={() => setSleeve("half")} />
                                                            <ToggleBtn label="ফুলহাতা" active={sleeve === "full"} onClick={() => setSleeve("full")} />
                                                      </div>
                                                </div>
                                          </div> */}

                                    </SectionCard>
                              )}

                              {/* ── Section 4: Quantity & Price (manufacturing only) ─────────── */}
                              {productType === "manufacturing" && (
                                    <SectionCard step={4} icon="🧮" title="পরিমাণ ও মূল্য">

                                          <InfoBox>ন্যূনতম <strong>১০ পিস</strong> অর্ডার করতে হবে।</InfoBox>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                                                <div id="field-qty">
                                                      <Label htmlFor="quantity" required>কত পিস জার্সি?</Label>
                                                      <Input
                                                            id="quantity"
                                                            name="পরিমাণ (পিস)"
                                                            type="number"
                                                            min="10"
                                                            placeholder="পিস সংখ্যা লিখুন"
                                                            value={quantity}
                                                            onChange={(e) => { setQuantity(e.target.value); clearErr("qty"); }}
                                                      />
                                                      <FieldError msg={errors.qty} />
                                                </div>

                                                <div>
                                                      <Label>একক মূল্য (টাকা)</Label>
                                                      <ReadonlyPrice
                                                            value={unitPrice && qty >= 10 ? `৳ ${unitPrice}` : ""}
                                                            placeholder="ফেব্রিক নির্বাচনের পর"
                                                      />
                                                </div>

                                          </div>

                                          {/* Price summary — all computed values are appended in handleSubmit */}
                                          <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
                                                <PriceRow label="মোট পিস" value={qty >= 10 && unitPrice ? `${qty} পিস` : null} />
                                                <PriceRow label="একক মূল্য" value={unitPrice && qty >= 10 ? `৳ ${unitPrice}` : null} />

                                                <div className="border-t border-blue-200 pt-2 flex justify-between font-semibold text-gray-800 text-sm sm:text-base">
                                                      <span>মোট মূল্য</span>
                                                      <span>{totalPrice ? `৳ ${totalPrice.toLocaleString()}` : "—"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm font-semibold text-red-600">
                                                      <span>৩০% অগ্রিম</span>
                                                      <span>{advanceCalc ? `৳ ${advanceCalc.toLocaleString()}` : "—"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-500">
                                                      <span>বাকি</span>
                                                      <span>{dueCalc ? `৳ ${dueCalc.toLocaleString()}` : "—"}</span>
                                                </div>
                                          </div>

                                    </SectionCard>
                              )}



                              {/* ── Section 6: Size Chart ───────────────────────────────────── */}
                              <SectionCard step={6} icon="📏" title="সাইজ চার্ট">

                                    <div className="mb-4">
                                          <Label>সাইজ ক্যাটাগরি</Label>
                                          <div className="flex gap-2">
                                                <ToggleBtn label="বড়দের মাপ" active={sizeCategory === "adult"} onClick={() => setSizeCategory("adult")} />
                                                <ToggleBtn label="বাচ্চাদের মাপ" active={sizeCategory === "kids"} onClick={() => setSizeCategory("kids")} />
                                          </div>
                                    </div>

                                    {sizeCategory === "kids" && (
                                          <div className="mb-4">
                                                {/* <Label htmlFor="kidAge">বাচ্চার বয়স উল্লেখ করুন</Label>
                                                <Input
                                                      id="kidAge"
                                                      name="বাচ্চার বয়স"
                                                      type="text"
                                                      placeholder="যেমন: ৬ বছর, ৮ বছর..."
                                                      value={kidAge}
                                                      onChange={(e) => setKidAge(e.target.value)}
                                                /> */}
                                          </div>
                                    )}

                                    {/* Each size input has a Bengali name so Formspree column labels are readable */}
                                    <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                          {SIZES.map((size) => (
                                                <div key={size} className="flex flex-col items-center gap-1">
                                                      <span className="text-xs font-bold text-gray-500">{size}</span>
                                                      <input
                                                            type="number"
                                                            name={`সাইজ ${size}`}
                                                            min="0"
                                                            placeholder="0"
                                                            value={sizes[size]}
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

                                    {sizeTotal > 0 && (
                                          <p className="mt-3 text-sm text-gray-500 text-right">
                                                মোট সাইজ: <strong className="text-blue-700">{sizeTotal} পিস</strong>
                                          </p>
                                    )}
                                    <div>
                                          <div className="w-full flex justify-center px-4">
                                                <div className="w-full max-w-xl flex flex-col gap-4  font-medium text-base sm:text-lg">

                                                      <h2 className="text-sm sm:text-base font-semibold text-gray-800 mt-10">
                                                            গলার ধরণ নির্বাচন করুন
                                                      </h2>

                                                      <label className="flex items-center gap-3">
                                                            <input type="checkbox" name="neckType" value="কলার-হাফহাতা" className="w-4 h-4" />
                                                            কলার-হাফহাতা
                                                      </label>

                                                      <label className="flex items-center gap-3">
                                                            <input type="checkbox" name="neckType" value="কলার ফুলহাতা" className="w-4 h-4" />
                                                            কলার ফুলহাতা
                                                      </label>

                                                      <label className="flex items-center gap-3">
                                                            <input type="checkbox" name="neckType" value="গোলগলা হাফহাতা" className="w-4 h-4" />
                                                            গোলগলা হাফহাতা
                                                      </label>

                                                      <label className="flex items-center gap-3">
                                                            <input type="checkbox" name="neckType" value="গোলগলা ফুলহাতা" className="w-4 h-4" />
                                                            গোলগলা ফুলহাতা
                                                      </label>

                                                </div>
                                          </div>
                                    </div>

                              </SectionCard>

                              {/* ── Section 7: Delivery ─────────────────────────────────────── */}
                              <SectionCard step={7} icon="🚚" title="ডেলিভারি পদ্ধতি">

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
                                          <ToggleBtn label="গ্রাহক" active={courierPayer === "customer"} onClick={() => setCourierPayer("customer")} />
                                          <ToggleBtn label="কোম্পানি" active={courierPayer === "company"} onClick={() => setCourierPayer("company")} />
                                    </div>
                                    <div>
                                          <div className="w-full flex justify-center px-4 mt-6">
                                                <div className="w-full max-w-xl text-center text-green-600">

                                                      <p className="text-base sm:text-lg font-medium">
                                                            👉 আরো জানাতে আমাদের WhatsApp এ যোগাযোগ করুন
                                                      </p>

                                                      <a
                                                            href="https://wa.me/8801XXXXXXXXX"
                                                            target="_blank"
                                                            className="inline-flex items-center justify-center mt-3 text-white bg-green-500 px-5 py-2 rounded-full text-sm sm:text-base font-semibold"
                                                      >
                                                            WhatsApp এ মেসেজ করুন
                                                      </a>

                                                </div>
                                          </div>
                                    </div>

                              </SectionCard>




                              {/* ── Section 9: Terms & Submit ───────────────────────────────── */}
                              <SectionCard step={9} icon="✅" title="শর্তাবলী ও চুক্তি">

                                    <div className="space-y-3 mb-5" id="field-terms">
                                          {TERMS_LIST.map(({ key, text }) => (
                                                <label key={key} className="flex items-start gap-3 cursor-pointer group">
                                                      <input
                                                            type="checkbox"
                                                            checked={terms[key]}
                                                            onChange={() => { toggleTerm(key); clearErr("terms"); }}
                                                            className="mt-0.5 w-5 h-5 rounded accent-blue-600 cursor-pointer flex-shrink-0"
                                                      />
                                                      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition leading-relaxed">
                                                            {text}
                                                      </span>
                                                </label>
                                          ))}
                                    </div>

                                    <FieldError msg={errors.terms} />

                                    {/* type="submit" — triggers handleSubmit via the form's onSubmit */}
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

                        </form>
                        {/* ── end <form> ── */}
                  </div>
                  <div className="mt-20">
                        <Footer></Footer>
                  </div>
            </div>
      );
}