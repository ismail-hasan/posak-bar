import { useState, useEffect } from "react";

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

function SectionCard({ step, title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
          {icon} ধাপ {step}
        </span>
      </div>
      <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function ToggleButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium border transition-all duration-150 ${
        active
          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
          : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
      }`}
    >
      {label}
    </button>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-600 mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

function InputField({ ...props }) {
  return (
    <input
      {...props}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder-gray-400 transition"
    />
  );
}

function SelectField({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
    >
      {children}
    </select>
  );
}

function TextareaField({ ...props }) {
  return (
    <textarea
      {...props}
      rows={3}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder-gray-400 transition resize-y"
    />
  );
}

function FileField({ ...props }) {
  return (
    <input
      type="file"
      {...props}
      className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
    />
  );
}

function InfoBox({ children }) {
  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl px-4 py-3 text-sm text-emerald-800 mb-4">
      {children}
    </div>
  );
}

function ReadonlyField({ value, placeholder }) {
  return (
    <div className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-700 min-h-[42px]">
      {value || <span className="text-gray-400 font-normal">{placeholder}</span>}
    </div>
  );
}

export default function OrderForm() {
  const [productType, setProductType] = useState("manufacturing");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [sleeve, setSleeve] = useState("half");
  const [collar, setCollar] = useState("round");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");
  const [sizeCategory, setSizeCategory] = useState("adult");
  const [kidAge, setKidAge] = useState("");
  const [sizes, setSizes] = useState(Object.fromEntries(SIZES.map((s) => [s, ""])));
  const [delivery, setDelivery] = useState("courier");
  const [courierPayer, setCourierPayer] = useState("customer");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [terms, setTerms] = useState({ t1: false, t2: false, t3: false, t4: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const unitPrice =
    selectedFabric
      ? sleeve === "half"
        ? selectedFabric.halfPrice
        : selectedFabric.fullPrice
      : null;

  const qty = parseInt(quantity) || 0;
  const totalPrice = unitPrice && qty >= 10 ? unitPrice * qty : null;
  const advanceCalc = totalPrice ? Math.round(totalPrice * 0.3) : null;
  const dueCalc = totalPrice && advanceCalc ? totalPrice - advanceCalc : null;

  const sizeTotal = SIZES.reduce((acc, s) => acc + (parseInt(sizes[s]) || 0), 0);

  const handleSizeChange = (size, val) =>
    setSizes((prev) => ({ ...prev, [size]: val }));

  const handleTermChange = (key) =>
    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.name = "নাম প্রয়োজন";
    if (!customerPhone.trim()) errs.phone = "মোবাইল নম্বর প্রয়োজন";
    if (!customerAddress.trim()) errs.address = "ঠিকানা প্রয়োজন";
    if (productType === "manufacturing") {
      if (!selectedFabric) errs.fabric = "ফেব্রিক নির্বাচন করুন";
      if (!quantity || qty < 10) errs.qty = "ন্যূনতম ১০ পিস অর্ডার করতে হবে";
    }
    if (!terms.t1 || !terms.t2 || !terms.t3 || !terms.t4)
      errs.terms = "সকল শর্তাবলী মেনে নিতে হবে";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-emerald-700 mb-3">ধন্যবাদ!</h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে। অনুগ্রহ করে অপেক্ষা করুন।
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
          >
            নতুন অর্ডার করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-3xl p-8 mb-7 text-center shadow-lg">
          <div className="text-4xl mb-3">🎽</div>
          <h1 className="text-2xl font-bold text-white mb-2">কাস্টম জার্সি অর্ডার ফরম</h1>
          <p className="text-emerald-100 text-sm">কারখানা থেকে সরাসরি — কাস্টম ডিজাইন ও রেডিমেট পণ্য</p>
        </div>

        {/* Section 1: Product Type */}
        <SectionCard step={1} icon="🛍️" title="কোন পণ্যটি অর্ডার করতে চান?">
          <div className="flex gap-3 mb-4">
            <ToggleButton
              label="🏭 মেনুফেকচারিং পণ্য"
              active={productType === "manufacturing"}
              onClick={() => { setProductType("manufacturing"); setSelectedProduct(""); }}
            />
            <ToggleButton
              label="📦 রেডিমেট পণ্য"
              active={productType === "readymade"}
              onClick={() => { setProductType("readymade"); setSelectedProduct(""); }}
            />
          </div>
          <div>
            <FieldLabel>পণ্য নির্বাচন করুন</FieldLabel>
            <SelectField value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value="">— নির্বাচন করুন —</option>
              {(productType === "manufacturing" ? MANUFACTURING_PRODUCTS : READYMADE_PRODUCTS).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </SelectField>
          </div>
        </SectionCard>

        {/* Section 2: Customer Info */}
        <SectionCard step={2} icon="👤" title="গ্রাহকের তথ্য">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div id="field-name">
              <FieldLabel required>গ্রাহকের নাম</FieldLabel>
              <InputField
                type="text"
                placeholder="আপনার পুরো নাম"
                value={customerName}
                onChange={(e) => { setCustomerName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div id="field-phone">
              <FieldLabel required>মোবাইল নম্বর</FieldLabel>
              <InputField
                type="tel"
                placeholder="01XXXXXXXXX"
                value={customerPhone}
                onChange={(e) => { setCustomerPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
          <div id="field-address">
            <FieldLabel required>ঠিকানা (গ্রাম + পোস্ট + থানা + জেলা)</FieldLabel>
            <TextareaField
              placeholder="পূর্ণ ঠিকানা লিখুন..."
              value={customerAddress}
              onChange={(e) => { setCustomerAddress(e.target.value); setErrors((p) => ({ ...p, address: "" })); }}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
        </SectionCard>

        {/* Section 3: Fabric & Style (manufacturing only) */}
        {productType === "manufacturing" && (
          <SectionCard step={3} icon="👕" title="ফেব্রিক ও জার্সির স্টাইল নির্বাচন করুন">
            {errors.fabric && (
              <p className="text-red-500 text-xs mb-3" id="field-fabric">{errors.fabric}</p>
            )}
            <div className="grid grid-cols-2 gap-3 mb-5" id={errors.fabric ? "" : "field-fabric"}>
              {FABRICS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => { setSelectedFabric(f); setErrors((p) => ({ ...p, fabric: "" })); }}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-150 ${
                    selectedFabric?.id === f.id
                      ? "border-emerald-500 bg-emerald-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-gray-800">{f.name}</span>
                    <span className="text-xs text-gray-400">{f.gsm}</span>
                  </div>
                  <div className="text-xs text-emerald-700 mt-1.5">
                    হাফহাতা: ৳{f.halfPrice} &nbsp;|&nbsp; ফুলহাতা: ৳{f.fullPrice}
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>গলার ধরন</FieldLabel>
                <div className="flex gap-2">
                  <ToggleButton label="গোলগলা" active={collar === "round"} onClick={() => setCollar("round")} />
                  <ToggleButton label="কলার" active={collar === "collar"} onClick={() => setCollar("collar")} />
                </div>
              </div>
              <div>
                <FieldLabel>হাতার ধরন</FieldLabel>
                <div className="flex gap-2">
                  <ToggleButton label="হাফহাতা" active={sleeve === "half"} onClick={() => setSleeve("half")} />
                  <ToggleButton label="ফুলহাতা" active={sleeve === "full"} onClick={() => setSleeve("full")} />
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Section 4: Quantity & Price (manufacturing only) */}
        {productType === "manufacturing" && (
          <SectionCard step={4} icon="🧮" title="পরিমাণ ও মূল্য">
            <InfoBox>ন্যূনতম <strong>১০ পিস</strong> অর্ডার করতে হবে।</InfoBox>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div id="field-qty">
                <FieldLabel required>কত পিস জার্সি?</FieldLabel>
                <InputField
                  type="number"
                  min="10"
                  placeholder="পিস সংখ্যা লিখুন"
                  value={quantity}
                  onChange={(e) => { setQuantity(e.target.value); setErrors((p) => ({ ...p, qty: "" })); }}
                />
                {errors.qty && <p className="text-red-500 text-xs mt-1">{errors.qty}</p>}
              </div>
              <div>
                <FieldLabel>একক মূল্য (টাকা)</FieldLabel>
                <ReadonlyField
                  value={unitPrice && qty >= 10 ? `৳ ${unitPrice}` : ""}
                  placeholder="ফেব্রিক নির্বাচনের পর"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 space-y-2">
              {[
                { label: "মোট পিস", value: qty >= 10 && unitPrice ? `${qty} পিস` : null },
                { label: "একক মূল্য", value: unitPrice && qty >= 10 ? `৳ ${unitPrice}` : null },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm text-gray-600">
                  <span>{label}</span>
                  <span>{value || "—"}</span>
                </div>
              ))}
              <div className="border-t border-emerald-200 pt-2 flex justify-between font-semibold text-gray-800 text-base">
                <span>মোট মূল্য</span>
                <span>{totalPrice ? `৳ ${totalPrice.toLocaleString()}` : "—"}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-emerald-700">
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

        {/* Section 5: Design */}
        <SectionCard step={5} icon="🎨" title="ডিজাইন ও নির্দেশনা">
          <div className="mb-4">
            <FieldLabel>জার্সির ডিজাইন / লোগো আপলোড করুন</FieldLabel>
            <div className="border-2 border-dashed border-emerald-200 rounded-xl p-4 bg-emerald-50/50">
              <FileField accept=".png,.jpg,.jpeg,.pdf,.cdr,.ai,.psd,.tif,.tiff" />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">গ্রহণযোগ্য ফরম্যাট: PNG, JPG, PDF, CDR, AI, PSD, TIF</p>
          </div>
          <div>
            <FieldLabel>জার্সিতে কী কী লেখা লাগবে? এবং আপনার নির্দেশনা</FieldLabel>
            <TextareaField
              placeholder="যেমন: নাম, নম্বর, লোগো অবস্থান, রঙের পছন্দ..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </SectionCard>

        {/* Section 6: Size Chart */}
        <SectionCard step={6} icon="📏" title="সাইজ চার্ট">
          <div className="mb-4">
            <FieldLabel>সাইজ ক্যাটাগরি</FieldLabel>
            <div className="flex gap-3">
              <ToggleButton label="বড়দের মাপ" active={sizeCategory === "adult"} onClick={() => setSizeCategory("adult")} />
              <ToggleButton label="বাচ্চাদের মাপ" active={sizeCategory === "kids"} onClick={() => setSizeCategory("kids")} />
            </div>
          </div>
          {sizeCategory === "kids" && (
            <div className="mb-4">
              <FieldLabel>বাচ্চার বয়স উল্লেখ করুন</FieldLabel>
              <InputField
                type="text"
                placeholder="যেমন: ৬ বছর, ৮ বছর..."
                value={kidAge}
                onChange={(e) => setKidAge(e.target.value)}
              />
            </div>
          )}
          <div className="grid grid-cols-4 gap-3">
            {SIZES.map((size) => (
              <div key={size} className="text-center">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{size}</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={sizes[size]}
                  onChange={(e) => handleSizeChange(size, e.target.value)}
                  className="w-full text-center px-2 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </div>
            ))}
          </div>
          {sizeTotal > 0 && (
            <div className="mt-3 text-sm text-gray-500 text-right">
              মোট সাইজ: <strong className="text-emerald-700">{sizeTotal} পিস</strong>
            </div>
          )}
        </SectionCard>

        {/* Section 7: Delivery */}
        <SectionCard step={7} icon="🚚" title="ডেলিভারি পদ্ধতি">
          <div className="mb-4">
            <FieldLabel>ডেলিভারির ধরন নির্বাচন করুন</FieldLabel>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "courier", label: "কোরিয়ার ট্রান্সপোর্ট", icon: "🚚" },
                { val: "home", label: "হোম ডেলিভারি", icon: "🏠" },
                { val: "office", label: "অফিস থেকে সংগ্রহ", icon: "🏢" },
              ].map(({ val, label, icon }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDelivery(val)}
                  className={`py-3 px-2 rounded-xl border text-center transition-all ${
                    delivery === val
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"
                  }`}
                >
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-xs font-medium leading-tight">{label}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel>কুরিয়ার চার্জ কে বহন করবেন?</FieldLabel>
            <div className="flex gap-3">
              <ToggleButton label="গ্রাহক" active={courierPayer === "customer"} onClick={() => setCourierPayer("customer")} />
              <ToggleButton label="কোম্পানি" active={courierPayer === "company"} onClick={() => setCourierPayer("company")} />
            </div>
          </div>
        </SectionCard>

        {/* Section 8: Payment */}
        <SectionCard step={8} icon="💳" title="অগ্রিম পেমেন্ট">
          <InfoBox>
            অর্ডার কনফার্ম করতে মোট টাকার কমপক্ষে <strong>৩০%</strong> অগ্রিম দিতে হবে।
            অগ্রিম প্রদত্ত অর্থ ফেরতযোগ্য নয়।
          </InfoBox>
          <div className="mb-4">
            <FieldLabel>পেমেন্ট মেথড নির্বাচন করুন</FieldLabel>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "bkash", icon: "📱", name: "বিকাশ", num: "017XXXXXXXX" },
                { val: "nagad", icon: "📱", name: "নগদ", num: "01985569964" },
                { val: "bank", icon: "🏦", name: "ব্যাংক", num: "পুবালী ব্যাংক" },
              ].map(({ val, icon, name, num }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPaymentMethod(val)}
                  className={`py-3 px-2 rounded-xl border text-center transition-all ${
                    paymentMethod === val
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-sm font-semibold text-gray-800">{name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{num}</div>
                </button>
              ))}
            </div>
            {paymentMethod === "bank" && (
              <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
                ব্যাংক: পুবালী ব্যাংক &nbsp;|&nbsp; একাউন্ট নম্বর: <strong>4481101123826</strong>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel required>কত টাকা পাঠিয়েছেন?</FieldLabel>
              <InputField
                type="number"
                placeholder="অগ্রিমের পরিমাণ"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel required>পেমেন্ট স্ক্রিনশট</FieldLabel>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-2">
                <FileField accept="image/*" />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 9: Terms & Submit */}
        <SectionCard step={9} icon="✅" title="শর্তাবলী ও চুক্তি">
          <div className="space-y-3 mb-5" id="field-terms">
            {[
              { key: "t1", text: "আমি নিশ্চিত করছি যে প্রদত্ত সকল তথ্য সঠিক।" },
              { key: "t2", text: "ডিজাইন কনফার্ম হওয়ার পর কোনো পরিবর্তন গ্রহণযোগ্য নয়।" },
              { key: "t3", text: "অগ্রিম প্রদত্ত অর্থ ফেরতযোগ্য নয়।" },
              { key: "t4", text: "ডেলিভারি খরচ মোট মূল্যের সাথে যোগ হবে এবং গ্রাহক তা পরিশোধ করবেন।" },
            ].map(({ key, text }) => (
              <label key={key} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={terms[key]}
                  onChange={() => { handleTermChange(key); setErrors((p) => ({ ...p, terms: "" })); }}
                  className="mt-0.5 w-4 h-4 rounded accent-emerald-600 cursor-pointer flex-shrink-0"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition leading-relaxed">{text}</span>
              </label>
            ))}
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mb-3">{errors.terms}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.99]"
          >
            ✅ অর্ডার কনফার্ম করুন
          </button>
        </SectionCard>

      </div>
    </div>
  );
}