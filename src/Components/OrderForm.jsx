import { useState } from "react";
import Footer from "./Footer";
import ImageUpload from "../Components/ImagePost.jsx";

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
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 border-b border-gray-100 pb-3 text-[22px] font-semibold text-gray-800 sm:text-base">
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
        "min-w-0 flex-1 rounded-xl px-2 py-2 sm:px-4",
        "whitespace-nowrap overflow-hidden text-ellipsis",
        "border text-xs font-medium sm:text-sm",
        "transition-all duration-150",
        active
          ? "border-blue-600 bg-blue-600 text-white shadow-sm"
          : "border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-700",
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
      className="mb-1.5 block text-sm font-medium text-gray-600"
    >
      {children}

      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 " +
  "text-sm text-gray-800 placeholder-gray-400 " +
  "transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400";

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
    <div className="mb-4 rounded-r-xl border-l-4 border-red-500 bg-blue-50 px-4 py-3 text-sm leading-relaxed text-blue-900">
      {children}
    </div>
  );
};

const FieldError = ({ msg }) => {
  return msg ? (
    <p className="mt-1 text-xs text-red-500">{msg}</p>
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

    // ⭐ NEW: Advance Payment
    payment: {
      advancePercentage: 30,
      transactionId: "",
      paymentProof: "",
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

  // ⭐ NEW: Payment Update
  const updatePayment = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [key]: value,
      },
    }));
  };

  // ⭐ NEW: Payment Proof Upload
  const handlePaymentProofUpload = (imageUrl) => {
    updatePayment("paymentProof", imageUrl);
    clearErr("paymentProof");
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

      const hasJerseyStyle = Object.values(jersey).some(
        (value) => value !== "" && Number(value) > 0
      );

      if (!hasJerseyStyle) {
        e.jerseyStyle =
          "কলার/গোলগলা স্টাইলের যেকোনো একটি পরিমাণ লিখুন";
      }

      if (formData.manufacturing.sizeCategory === "adult") {
        const sizeTotal = Object.values(
          formData.manufacturing.sizes
        ).reduce((sum, value) => sum + Number(value || 0), 0);

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

    // ⭐ NEW: Advance Payment Validation

    if (!formData.payment.transactionId.trim()) {
      e.transactionId = "Transaction ID লিখুন";
    }

    if (!formData.payment.paymentProof) {
      e.paymentProof = "পেমেন্টের প্রমাণ হিসেবে ছবি আপলোড করুন";
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

      // ⭐ NEW
      payment: {
        advancePercentage: 30,
        transactionId: "",
        paymentProof: "",
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-red-50 p-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
          <div className="mb-4 text-5xl">🎉</div>

          <h1 className="mb-3 text-xl font-bold text-blue-700 sm:text-2xl">
            ধন্যবাদ!
          </h1>

          <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
            আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার
            সাথে যোগাযোগ করবে। অনুগ্রহ করে অপেক্ষা করুন।
          </p>

          <button
            type="button"
            onClick={resetForm}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-red-600 py-3 font-medium text-white transition hover:from-blue-700 hover:to-red-700"
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
    <div className="min-h-screen bg-slate-50 px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-5 rounded-2xl bg-gradient-to-r from-green-700 to-red-600 p-6 text-center shadow-md sm:p-8">
          <h1 className="mb-1 text-[21px] font-bold text-white sm:text-3xl">
            🎽 কাস্টমাইজ জার্সি অর্ডার ফরম
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Product Type */}
          <SectionCard title="কোন পণ্যটি অর্ডার করতে চান? নির্বাচন করুন">
            <div className="mb-4 flex gap-2">
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
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {(formData.productType === "manufacturing"
                ? MANUFACTURING_PRODUCTS
                : READYMADE_PRODUCTS
              ).map((product) => (
                <label
                  key={product}
                  className={[
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all duration-200",
                    formData.products.includes(product)
                      ? "border-red-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-blue-300",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={formData.products.includes(product)}
                    onChange={() => toggleProduct(product)}
                    className="h-5 w-5 flex-shrink-0 cursor-pointer accent-blue-600"
                  />

                  <span className="flex-1 text-sm font-medium text-gray-800">
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
                        className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-center text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    )}
                </label>
              ))}
            </div>

            <FieldError msg={errors.product} />
          </SectionCard>

          {/* Customer Info */}
          <SectionCard title="গ্রাহকের তথ্য">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                <div className="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {FABRICS.map((fabric) => (
                    <div
                      key={fabric.id}
                      className={[
                        "rounded-xl border p-4 transition-all duration-150",
                        formData.manufacturing.fabric?.id === fabric.id
                          ? "border-red-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 bg-white",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800 md:text-base">
                            {fabric.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
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
                          className="h-5 w-5 cursor-pointer accent-blue-600"
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
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-1 py-2 text-center text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-right">
                    <p className="text-sm text-gray-600 sm:text-base">
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
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div id="field-kolarHalf">
                  <Label htmlFor="kolarHalf">
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
                  <Label htmlFor="kolarFull">
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
                  <Label htmlFor="golGolaHalf">
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
                  <Label htmlFor="golGolaFull">
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
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-purple-700"
                />
              </div>
            </SectionCard>
          )}

          {/* Delivery */}
          <SectionCard title="ডেলিভারি পদ্ধতি">
            <Label>ডেলিভারির ধরন নির্বাচন করুন</Label>

            <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
              {DELIVERY_OPTIONS.map(({ val, emoji, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() =>
                    updateDelivery("type", val)
                  }
                  className={[
                    "rounded-xl border px-1 py-3 text-center transition-all",
                    formData.delivery.type === val
                      ? "border-blue-600 bg-blue-50 text-blue-800"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300",
                  ].join(" ")}
                >
                  <div className="mb-1 text-xl">
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

          {/* =====================================================
              ⭐ ADVANCE PAYMENT
          ===================================================== */}

          <SectionCard title="অগ্রিম পেমেন্ট">
            <div
              id="field-transactionId"
              className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 sm:p-5"
            >


              {/* Payment Notice */}

              {/* Payment Notice */}
              <div className="mb-5 rounded-xl border border-red-600 bg-red-600 p-4 text-center">
                <div className="flex items-start gap-3">



                  <div className="flex-1">
                    <h3 className="font-bold text-white">
                      ৩০% অগ্রিম পেমেন্ট আবশ্যক
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-white/95">
                      অর্ডার কনফার্ম করার জন্য মোট অর্ডার মূল্যের
                      <strong className="text-white"> ৩০% অগ্রিম </strong>
                      প্রদান করতে হবে। পেমেন্ট করার পর Transaction ID
                      এবং পেমেন্টের Screenshot/Proof নিচে দিন।
                      অগ্রীম পেমেন্ট সম্পর্কে বিস্তারিত জানতে হটলাইনে যোগাযোগ করুন।
                    </p>
                  </div>

                </div>
              </div>

              <div className="mt-2 flex w-full justify-center px-4">
                <div className="w-full max-w-xl text-center text-green-600">


                  <a
                    href="https://wa.me/8801305506395"
                    target="_blank"
                    rel="noreferrer"
                    className="mb-8 inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white sm:text-base"
                  >
                    হটলাইন
                  </a>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="mb-5">
                <Label htmlFor="transactionId" required>
                  Transaction ID
                </Label>

                <Input
                  id="transactionId"
                  type="text"
                  placeholder="আপনার Transaction ID লিখুন"
                  value={formData.payment.transactionId}
                  onChange={(e) => {
                    updatePayment(
                      "transactionId",
                      e.target.value
                    );
                    clearErr("transactionId");
                  }}
                />

                <FieldError msg={errors.transactionId} />
              </div>

              {/* Payment Proof */}
              <div id="field-paymentProof">
                <Label required>
                  পেমেন্টের Screenshot / Proof
                </Label>

                <ImageUpload
                  collectionName="manufactureOrder"
                  onUploadSuccess={
                    handlePaymentProofUpload
                  }
                />

                {/* Uploaded Image Preview */}
                {formData.payment.paymentProof && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-green-200 bg-green-50 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                        ✓
                      </span>

                      <p className="text-sm font-semibold text-green-700">
                        Payment Proof সফলভাবে আপলোড হয়েছে
                      </p>
                    </div>

                    <img
                      src={formData.payment.paymentProof}
                      alt="Payment Proof"
                      className="max-h-64 w-full rounded-lg border border-green-100 bg-white object-contain"
                    />
                  </div>
                )}

                <FieldError msg={errors.paymentProof} />
              </div>
            </div>
          </SectionCard>

          {/* Terms */}
          <SectionCard title="শর্তাবলী ও চুক্তি">
            <div
              className="mb-5 space-y-3"
              id="field-terms"
            >
              {TERMS_LIST.map(({ key, text }) => (
                <label
                  key={key}
                  className="group flex cursor-pointer items-start gap-3"
                >
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={toggleTerms}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded accent-blue-600"
                  />

                  <span className="text-sm leading-relaxed text-gray-600 transition group-hover:text-gray-800">
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
                "cursor-pointer mt-3 w-full rounded-2xl py-4 text-base font-semibold text-white shadow-lg",
                "bg-gradient-to-r from-blue-600 to-red-600",
                "transition-all duration-200 hover:from-blue-700 hover:to-red-700",
                "active:scale-[0.99]",
                submitting
                  ? "cursor-not-allowed opacity-70"
                  : "",
              ].join(" ")}
            >
              {submitting
                ? "⏳ পাঠানো হচ্ছে..."
                : "✅ অর্ডার কনফার্ম করুন"}
            </button>
          </SectionCard>


        </form>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default OrderForm;