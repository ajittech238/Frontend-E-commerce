"use client";

import React, { useEffect, useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  Search,
  Plus,
  Filter,
  MessageCircle,
  ChevronRight,
  X,
} from "lucide-react";

type Question = {
  id: number;
  question: string;
  date: string;
  status: "Answered" | "Pending" | "Closed";
  responses: number;
  category: string;
};

const CustomerQA: React.FC = () => {
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [category, setCategory] = useState("Product");
  const [submitting, setSubmitting] = useState(false);

  /* 🔒 BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow = showAskModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAskModal]);

  const userQuestions: Question[] = [
    {
      id: 1,
      question: "Is the Luxury Silk Dress available in XS size?",
      date: "Mar 15, 2024",
      status: "Answered",
      responses: 1,
      category: "Product",
    },
    {
      id: 2,
      question: "When will you restock the Handmade Leather Bag?",
      date: "Mar 10, 2024",
      status: "Pending",
      responses: 0,
      category: "Stock",
    },
  ];

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      alert("Question submitted (backend later)");
      setShowAskModal(false);
      setNewQuestion("");
      setCategory("Product");
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black">Help & Support</h1>
            <p className="text-muted-foreground">
              Find answers or ask our team anything
            </p>
          </div>

          <button
            onClick={() => setShowAskModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-bold text-primary-foreground"
          >
            <Plus size={18} />
            Ask Question
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search FAQs, products..."
                className="w-full rounded-2xl border py-5 pl-14 pr-5"
              />
            </div>

            <section className="space-y-4">
              <h2 className="flex items-center gap-2 font-black text-xl">
                <MessageSquare className="text-primary" />
                My Questions
              </h2>

              {userQuestions.map((q) => (
                <div
                  key={q.id}
                  className="flex justify-between rounded-2xl border bg-card p-6"
                >
                  <div>
                    <span className="text-xs font-bold text-primary">
                      {q.category}
                    </span>
                    <h3 className="font-bold">{q.question}</h3>
                    <p className="text-xs text-muted-foreground">{q.date}</p>
                  </div>
                  <ChevronRight />
                </div>
              ))}
            </section>
          </div>

          {/* RIGHT */}
          <aside className="rounded-2xl border bg-card p-6">
            <h3 className="font-black flex items-center gap-2">
              <HelpCircle className="text-primary" />
              FAQs
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Common customer questions
            </p>
          </aside>
        </div>
      </div>

      {/* ================= MODAL (NAVBAR KE UPAR) ================= */}
      {showAskModal && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center
                     bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAskModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md mt-[50px] rounded-2xl bg-white shadow-2xl"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5 text-white">
              <h2 className="text-xl font-bold">Ask a Question</h2>
              <p className="text-sm">We'll get back to you soon</p>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setShowAskModal(false)}
              className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white"
            >
              <X size={18} />
            </button>

            {/* FORM */}
            <form onSubmit={handleAskQuestion} className="p-6 space-y-5">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              >
                <option value="Product">Product / Size</option>
                <option value="Order">Order</option>
                <option value="Payment">Payment</option>
                <option value="Account">Account</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                rows={5}
                placeholder="Be as detailed as possible..."
                className="w-full rounded-xl border px-4 py-3 resize-none"
                required
              />

              <button
                disabled={submitting}
                className="w-full rounded-xl bg-pink-500 py-4 text-white font-bold"
              >
                {submitting ? "Submitting..." : "SUBMIT QUESTION"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerQA;
