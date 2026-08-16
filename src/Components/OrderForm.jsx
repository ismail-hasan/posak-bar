import { useState } from "react";
import Footer from "./Footer";

const API_URL = "https://posak-bari-backend.vercel.app/manufacture";

const FABRICS = [
  { id: "pp", name: "পিপি", gsm: "170-180 GSM" },
  { id: "mesh", name: "মেশ", gsm: "170-180 GSM" },
  { id: "boxmesh", name: "বক্সমেশ", gsm: "170-180 GSM" },
  { id: "honeycomb", name: "হানিকম", gsm: "170-180 GSM" },
  { id: "honeycombmesh", name: "হানিকমমেশ", gsm: "170-180 GSM" },
  { id: "lorex", name: "লোরেক্স", gsm: "170-180 GSM" },
  { id: "lifjacquard", name: "লিফজেকার্ড", gsm: "170-180 GSM" },
  { id: "brushjacquard", name: "ব্রাশজেকার্ড", gsm: "170-180 GSM" },
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

// ─────────────────────────────────────────────
// UI Components
// ─────────────────────────────────────────────

const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-4">
      <h2 className="text-[22px] sm:text-base font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4">
        {title}
      </h2>

      {children}
    </div>
  );
};

const ToggleBtn = ({ label, active, onClick }) => {
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
};

const Label = ({ children, required, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-600 mb-1.5"
    >
      {children}

      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 " +
  "text-sm text-gray-800 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";

const Input = ({ type, onChange, ...props }) => {
  return (
    <input
      type={type}
      onWheel={type === "number" ? (e) => e.target.blur() : undefined}
      onChange={onChange}
      className={inputCls}
      {...props}
    />
  );
};

const Textarea = ({ onChange, ...props }) => {
  return (
    <textarea
      rows={3}
      onChange={onChange}
      className={`${inputCls} resize-y`}
      {...props}
    />
  );
};

const InfoBox = ({ children }) => {
  return (
    <div className="bg-blue-50 border-l-4 border-red-500 rounded-r-xl px-4 py-3 text-sm text-blue-900 mb-4 leading-relaxed">
      {children}
    </div>
  );
};

const FieldError = ({ msg }) => {
  return msg ? (
    <p className="text-red-500 text-xs mt-1">{msg}</p>
  ) : null;
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

const OrderForm = () => {
  const [formData, setFormData] = useState({
    productType: "manufacturing",

    products: [],

    customer: {
      name: "",
      phone: "",
      address: "",
    },

    manufacturing: {
      fabric: null,
      sizeCategory: "adult",
      kids: "",
      sizes: {},
      jerseyStyle: {},
    },

    readymade: {},

    delivery: {
      type: "courier",
      payer: "customer",
    },

    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ─────────────────────────────────────────────
  // Common Helpers
  // ─────────────────────────────────────────────

  const clearErr = (key) => {
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const updateCustomer = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [key]: value,
      },
    }));
  };

  const updateManufacturing = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      manufacturing: {
        ...prev.manufacturing,
        [key]: value,
      },
    }));
  };

  const updateDelivery = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [key]: value,
      },
    }));
  };

  // ─────────────────────────────────────────────
  // Product Type
  // ─────────────────────────────────────────────

  const switchType = (type) => {
    setFormData((prev) => ({
      ...prev,
      productType: type,
      products: [],
      manufacturing: {
        ...prev.manufacturing,
        fabric: null,
        sizeCategory: "adult",
        kids: "",
        sizes: {},
        jerseyStyle: {},
      },
      readymade: {},
    }));

    setErrors({});
  };

  // ─────────────────────────────────────────────
  // Product Selection
  // ─────────────────────────────────────────────

  const toggleProduct = (product) => {
    setFormData((prev) => {
      const alreadySelected = prev.products.includes(product);

      return {
        ...prev,
        products: alreadySelected
          ? prev.products.filter((item) => item !== product)
          : [...prev.products, product],
      };
    });

    clearErr("product");
  };

  // ─────────────────────────────────────────────
  // Readymade Quantity
  // ─────────────────────────────────────────────

  const updateReadymadeQty = (product, value) => {
    setFormData((prev) => {
      const readymade = {
        ...prev.readymade,
      };

      if (value === "") {
        delete readymade[product];
      } else {
        readymade[product] = value;
      }

      return {
        ...prev,
        readymade,
      };
    });
  };

  // ─────────────────────────────────────────────
  // Size
  // ─────────────────────────────────────────────

  const updateSize = (size, value) => {
    setFormData((prev) => {
      const sizes = {
        ...prev.manufacturing.sizes,
      };

      if (value === "") {
        delete sizes[size];
      } else {
        sizes[size] = value;
      }

      return {
        ...prev,
        manufacturing: {
          ...prev.manufacturing,
          sizes,
        },
      };
    });
  };

  // ─────────────────────────────────────────────
  // Jersey Style Quantity
  // ─────────────────────────────────────────────

  const updateJerseyStyle = (key, value) => {
    setFormData((prev) => {
      const jerseyStyle = {
        ...prev.manufacturing.jerseyStyle,
      };

      if (value === "") {
        delete jerseyStyle[key];
      } else {
        jerseyStyle[key] = value;
      }

      return {
        ...prev,
        manufacturing: {
          ...prev.manufacturing,
          jerseyStyle,
        },
      };
    });

    clearErr(key);
    clearErr("jerseyStyle");
    clearErr("sizeMismatch");
  };

  // ─────────────────────────────────────────────
  // Terms
  // ─────────────────────────────────────────────

  const toggleTerms = () => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: !prev.termsAccepted,
    }));

    clearErr("terms");
  };

  // ─────────────────────────────────────────────
  // Validation
  // ─────────────────────────────────────────────

  const validate = () => {
    const e = {};

    if (formData.products.length === 0) {
      e.product = "অন্তত একটি পণ্য নির্বাচন করুন";
    }

    if (!formData.customer.name.trim()) {
      e.name = "নাম লিখুন";
    }

    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    const phone = formData.customer.phone.replace(/\s/g, "");

    if (!phone) {
      e.phone = "মোবাইল নম্বর লিখুন";
    } else if (!phoneRegex.test(phone)) {
      e.phone =
        "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)";
    }

    if (!formData.customer.address.trim()) {
      e.address = "ঠিকানা লিখুন";
    }

    if (formData.productType === "manufacturing") {
      const jersey = formData.manufacturing.jerseyStyle;

      // চারটি স্টাইলের মধ্যে অন্তত একটি ইনপুট পূরণ করতে হবে।
      const hasJerseyStyle = Object.values(jersey).some(
        (value) => value !== "" && Number(value) > 0
      );

      if (!hasJerseyStyle) {
        e.jerseyStyle =
          "কলার/গোলগলা স্টাইলের যেকোনো একটি পরিমাণ লিখুন";
      }

      // বড়দের সাইজ হলে সাইজের মোট ও জার্সির মোট সমান হতে হবে।
      if (formData.manufacturing.sizeCategory === "adult") {
        const sizeTotal = Object.values(formData.manufacturing.sizes).reduce(
          (sum, value) => sum + Number(value || 0),
          0
        );

        const jerseyTotal =
          Number(jersey.kolarHalf || 0) +
          Number(jersey.kolarFull || 0) +
          Number(jersey.golGolaHalf || 0) +
          Number(jersey.golGolaFull || 0);

        if (sizeTotal !== jerseyTotal) {
          e.sizeMismatch = `মোট সাইজ: ${sizeTotal} পিস এবং মোট জার্সির পরিমাণ: ${jerseyTotal} পিস — সমান দিন`;
        }
      }
    }

    if (!formData.termsAccepted) {
      e.terms = "শর্তাবলী মেনে নিন";
    }

    return e;
  };

  // ─────────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      if (validationErrors.sizeMismatch) {
        alert(validationErrors.sizeMismatch);
      }

      const firstError = Object.keys(validationErrors)[0];

      document
        .getElementById(`field-${firstError}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "অর্ডার সাবমিট করতে সমস্যা হয়েছে"
        );
      }


      setSubmitted(true);
    } catch (error) {
      console.error("Order submit error:", error);

      alert(
        error.message ||
        "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। Backend server চেক করুন।"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────
  // Reset
  // ─────────────────────────────────────────────

  const resetForm = () => {
    setFormData({
      productType: "manufacturing",

      products: [],

      customer: {
        name: "",
        phone: "",
        address: "",
      },

      manufacturing: {
        fabric: null,
        sizeCategory: "adult",
        kids: "",
        sizes: {},
        jerseyStyle: {},
      },

      readymade: {},

      delivery: {
        type: "courier",
        payer: "customer",
      },

      termsAccepted: false,
    });

    setErrors({});
    setSubmitted(false);
  };

  // ─────────────────────────────────────────────
  // Total Jersey Quantity
  // ─────────────────────────────────────────────

  const jersey = formData.manufacturing.jerseyStyle;

  const totalJerseyQty =
    Number(jersey.kolarHalf || 0) +
    Number(jersey.kolarFull || 0) +
    Number(jersey.golGolaHalf || 0) +
    Number(jersey.golGolaFull || 0);

  const totalSizeQty = Object.values(
    formData.manufacturing.sizes
  ).reduce((sum, value) => sum + Number(value || 0), 0);

  // ─────────────────────────────────────────────
  // Success Screen
  // ─────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-sm w-full">
          <div className="text-5xl mb-4">🎉</div>

          <h1 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3">
            ধন্যবাদ!
          </h1>

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

  // ─────────────────────────────────────────────
  // Main Form
  // ─────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-red-600 rounded-2xl p-6 sm:p-8 mb-5 text-center shadow-md">
          <h1 className="text-[21px] sm:text-3xl font-bold text-white mb-1">
            🎽 কাস্টমাইজ জার্সি অর্ডার ফরম
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Product Type */}
          <SectionCard title="কোন পণ্যটি অর্ডার করতে চান? নির্বাচন করুন">
            <div className="flex gap-2 mb-4">
              <ToggleBtn
                label="🏭 মেনুফেকচারিং"
                active={formData.productType === "manufacturing"}
                onClick={() => switchType("manufacturing")}
              />

              <ToggleBtn
                label="📦 রেডিমেট পণ্য"
                active={formData.productType === "readymade"}
                onClick={() => switchType("readymade")}
              />
            </div>

            <Label>
              পণ্য নির্বাচন করুন{" "}
              <span className="text-red-500">*</span>
            </Label>

            <div
              id="field-product"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {(formData.productType === "manufacturing"
                ? MANUFACTURING_PRODUCTS
                : READYMADE_PRODUCTS
              ).map((product) => (
                <label
                  key={product}
                  className={[
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200",
                    formData.products.includes(product)
                      ? "border-red-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-blue-300",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={formData.products.includes(product)}
                    onChange={() => toggleProduct(product)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
                  />

                  <span className="text-sm font-medium text-gray-800 flex-1">
                    {product}
                  </span>

                  {formData.productType === "readymade" &&
                    formData.products.includes(product) && (
                      <input
                        type="number"
                        min="1"
                        placeholder="পিস"
                        value={formData.readymade[product] || ""}
                        onClick={(e) => e.stopPropagation()}
                        onWheel={(e) => e.target.blur()}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateReadymadeQty(
                            product,
                            e.target.value
                          );
                        }}
                        className="w-20 text-center px-2 py-1.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      />
                    )}
                </label>
              ))}
            </div>

            <FieldError msg={errors.product} />
          </SectionCard>

          {/* Customer Info */}
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
                  value={formData.customer.name}
                  onChange={(e) => {
                    updateCustomer("name", e.target.value);
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
                  value={formData.customer.phone}
                  onChange={(e) => {
                    updateCustomer("phone", e.target.value);
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
                value={formData.customer.address}
                onChange={(e) => {
                  updateCustomer("address", e.target.value);
                  clearErr("address");
                }}
              />

              <FieldError msg={errors.address} />
            </div>
          </SectionCard>

          {/* Fabric */}
          {formData.productType === "manufacturing" && (
            <SectionCard title="ফেব্রিক ও স্টাইল">
              <div id="field-fabric">

                <FieldError msg={errors.fabric} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  {FABRICS.map((fabric) => (
                    <div
                      key={fabric.id}
                      className={[
                        "p-4 rounded-xl border transition-all duration-150",
                        formData.manufacturing.fabric?.id === fabric.id
                          ? "border-red-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 bg-white",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-gray-800">
                            {fabric.name}
                          </h3>

                          <p className="text-xs text-gray-400 mt-1">
                            {fabric.gsm}
                          </p>
                        </div>

                        <input
                          type="radio"
                          name="fabric-radio"
                          checked={
                            formData.manufacturing.fabric?.id ===
                            fabric.id
                          }
                          onChange={() => {
                            updateManufacturing("fabric", fabric);
                            clearErr("fabric");
                          }}
                          className="w-5 h-5 accent-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          )}

          {/* Instructions */}
          {formData.productType === "manufacturing" && (
            <SectionCard title="নির্দেশিকা">
              <InfoBox>
                ন্যূনতম <strong>১০ পিস</strong> অর্ডার করতে হবে।
              </InfoBox>
            </SectionCard>
          )}

          {/* Size Chart */}
          {formData.productType === "manufacturing" && (
            <SectionCard title="সাইজ চার্ট">

              <div className="mb-4">
                <Label>সাইজ ক্যাটাগরি</Label>

                <div className="flex gap-2">
                  <ToggleBtn
                    label="বড়দের মাপ"
                    active={
                      formData.manufacturing.sizeCategory === "adult"
                    }
                    onClick={() =>
                      updateManufacturing(
                        "sizeCategory",
                        "adult"
                      )
                    }
                  />

                  <ToggleBtn
                    label="বাচ্চাদের মাপ"
                    active={
                      formData.manufacturing.sizeCategory === "kids"
                    }
                    onClick={() =>
                      updateManufacturing(
                        "sizeCategory",
                        "kids"
                      )
                    }
                  />
                </div>
              </div>

              {formData.manufacturing.sizeCategory === "kids" && (
                <div className="mb-4">
                  <Label htmlFor="kidAge">
                    বাচ্চার বয়স এবং পরিমাণ দিন
                  </Label>

                  <Input
                    id="kidAge"
                    type="text"
                    placeholder="যেমন: ১ বছরের ৫ পিছ, ৭ বছরে ১০ পিছ ......"
                    value={formData.manufacturing.kids}
                    onChange={(e) =>
                      updateManufacturing(
                        "kids",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              {formData.manufacturing.sizeCategory === "adult" && (
                <>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {SIZES.map((size) => (
                      <div
                        key={size}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="text-xs font-bold text-gray-500">
                          {size}
                        </span>

                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={
                            formData.manufacturing.sizes[size] || ""
                          }
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => {
                            updateSize(size, e.target.value);
                            clearErr("sizeMismatch");
                          }}
                          className="w-full text-center px-1 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-right">
                    <p className="text-sm sm:text-base text-gray-600">
                      মোট সাইজ:{" "}
                      <span className="font-bold text-blue-600">
                        {totalSizeQty} পিস
                      </span>
                    </p>

                    {errors.sizeMismatch && (
                      <p className="mt-1 text-sm font-medium text-red-500">
                        {errors.sizeMismatch}
                      </p>
                    )}
                  </div>
                </>
              )}
            </SectionCard>
          )}

          {/* Jersey Quantity */}
          {formData.productType === "manufacturing" && (
            <SectionCard title="জার্সির স্টাইল ও পরিমাণ দিন">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                <div id="field-kolarHalf">
                  <Label htmlFor="kolarHalf" >
                    কলার হাফহাতা
                  </Label>

                  <Input
                    id="kolarHalf"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={jersey.kolarHalf || ""}
                    onChange={(e) =>
                      updateJerseyStyle(
                        "kolarHalf",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div id="field-kolarFull">
                  <Label htmlFor="kolarFull" >
                    কলার ফুলহাতা
                  </Label>

                  <Input
                    id="kolarFull"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={jersey.kolarFull || ""}
                    onChange={(e) =>
                      updateJerseyStyle(
                        "kolarFull",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div id="field-golGolaHalf">
                  <Label htmlFor="golGolaHalf" >
                    গোলগলা হাফহাতা
                  </Label>

                  <Input
                    id="golGolaHalf"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={jersey.golGolaHalf || ""}
                    onChange={(e) =>
                      updateJerseyStyle(
                        "golGolaHalf",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div id="field-golGolaFull">
                  <Label htmlFor="golGolaFull" >
                    গোলগলা ফুলহাতা
                  </Label>

                  <Input
                    id="golGolaFull"
                    type="number"
                    min="0"
                    placeholder="পিস সংখ্যা লিখুন"
                    value={jersey.golGolaFull || ""}
                    onChange={(e) =>
                      updateJerseyStyle(
                        "golGolaFull",
                        e.target.value
                      )
                    }
                  />

                </div>
              </div>

              <FieldError msg={errors.jerseyStyle} />

              <div>
                <Label>মোট জার্সির পরিমাণ</Label>

                <input
                  type="number"
                  value={totalJerseyQty}
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-sm font-semibold text-purple-700 cursor-not-allowed"
                />
              </div>
            </SectionCard>
          )}

          {/* Delivery */}




          <SectionCard title="ডেলিভারি পদ্ধতি">

            <Label>ডেলিভারির ধরন নির্বাচন করুন</Label>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              {DELIVERY_OPTIONS.map(({ val, emoji, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() =>
                    updateDelivery("type", val)
                  }
                  className={[
                    "py-3 px-1 rounded-xl border text-center transition-all",
                    formData.delivery.type === val
                      ? "border-blue-600 bg-blue-50 text-blue-800"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300",
                  ].join(" ")}
                >
                  <div className="text-xl mb-1">
                    {emoji}
                  </div>

                  <div className="text-xs font-medium leading-snug">
                    {label}
                  </div>
                </button>
              ))}
            </div>

            <Label>কুরিয়ার চার্জ কে বহন করবেন?</Label>

            <div className="flex gap-2">
              <ToggleBtn
                label="গ্রাহক"
                active={
                  formData.delivery.payer === "customer"
                }
                onClick={() =>
                  updateDelivery("payer", "customer")
                }
              />

              <ToggleBtn
                label="কোম্পানি"
                active={
                  formData.delivery.payer === "company"
                }
                onClick={() =>
                  updateDelivery("payer", "company")
                }
              />
            </div>
          </SectionCard>

          {/* Terms */}
          <SectionCard title="শর্তাবলী ও চুক্তি">

            <div
              className="space-y-3 mb-5"
              id="field-terms"
            >
              {TERMS_LIST.map(({ key, text }) => (
                <label
                  key={key}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={toggleTerms}
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
                submitting
                  ? "opacity-70 cursor-not-allowed"
                  : "",
              ].join(" ")}
            >
              {submitting
                ? "⏳ পাঠানো হচ্ছে..."
                : "✅ অর্ডার কনফার্ম করুন"}
            </button>
          </SectionCard>

          <div className="w-full flex justify-center px-4 mt-6">
            <div className="w-full max-w-xl text-center text-green-600">
              <p className="text-base sm:text-lg font-medium">
                👉 আরো জানাতে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন
              </p>
              <a
                href="https://wa.me/8801305506395"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center mt-3 text-white bg-purple-600 px-5 py-2 rounded-full text-sm sm:text-base font-semibold"
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
};

export default OrderForm;