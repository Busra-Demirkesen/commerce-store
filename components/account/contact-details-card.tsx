"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import useProfile, { type Profile } from "@/hooks/use-profile";

export default function ContactDetailsCard() {
  const { user } = useUser();
  const userId = user?.id || null;
  const profiles = useProfile((s) => s.profiles);
  const upsert = useProfile((s) => s.upsert);

  const existing = useMemo(() => (userId ? profiles[userId] ?? null : null), [profiles, userId]);
  const [form, setForm] = useState<Profile>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    deliveryNotes: "",
  });

  useEffect(() => {
    if (existing) setForm(existing);
    else if (user) {
      setForm((f) => ({ ...f, fullName: user.fullName || "" }));
    }
  }, [existing, user]);

  const onChange = (key: keyof Profile) => (e: any) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSave = () => {
    if (!userId) return;
    const phoneOk = !form.phone || /[+\d][\d\s().-]{5,}/.test(form.phone);
    if (!phoneOk) {
      alert("Please enter a valid phone number.");
      return;
    }
    upsert(userId, form);
    alert("Changes saved.");
  };

  if (!userId) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Contact details</h2>
        <p className="mt-2 text-sm text-gray-600">Please sign in to edit your contact details.</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Contact details</h2>
      <p className="mt-1 text-sm text-gray-500">These details appear on your receipts and delivery documents.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <Input
            value={form.fullName}
            onChange={onChange("fullName")}
            placeholder="Full name"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Phone number</label>
          <Input
            value={form.phone}
            onChange={onChange("phone")}
            placeholder="Phone number"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700">Address line 1</label>
          <Input
            value={form.addressLine1}
            onChange={onChange("addressLine1")}
            placeholder="Street and number"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Address line 2</label>
          <Input
            value={form.addressLine2 || ""}
            onChange={onChange("addressLine2")}
            placeholder="Apartment, suite, etc. (optional)"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-gray-700">City</label>
          <Input
            value={form.city || ""}
            onChange={onChange("city")}
            placeholder="City"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">State/Province</label>
          <Input
            value={form.state || ""}
            onChange={onChange("state")}
            placeholder="State/Province"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Postal code</label>
          <Input
            value={form.postalCode || ""}
            onChange={onChange("postalCode")}
            placeholder="Postal code"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700">Country</label>
          <Input
            value={form.country || ""}
            onChange={onChange("country")}
            placeholder="Country"
            className="mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Delivery notes (optional)</label>
          <textarea
            value={form.deliveryNotes || ""}
            onChange={onChange("deliveryNotes") as any}
            placeholder="Add any special delivery instructions"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            rows={4}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onSave} className="px-5">Save changes</Button>
      </div>
    </section>
  );
}
