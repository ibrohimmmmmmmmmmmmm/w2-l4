import React, { useState } from "react";
import Button from "@mui/material/Button";

const API = "https://69b7ccaeffbcd028609636b4.mockapi.io/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    image: "",
    status: true,
  });

  const handleSave = async () => {
    if (!form.name || !form.email) return;

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const newUser = await res.json();

    // 👉 ВАЖНО: обновляем список через window
    if (window.updateUsers) {
      window.updateUsers((prev) => [...prev, newUser]);
    }

    setOpen(false);
    setForm({
      name: "",
      email: "",
      city: "",
      phone: "",
      image: "",
      status: true,
    });
  };

  const changeTheme = (mode) => {
    setTheme(mode);

    if (mode === "dark") {
      document.body.className = "bg-[#0f172a] text-white";
    } else {
      document.body.className = "bg-[#f8fafc] text-black";
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 bg-[rgba(255,255,255,0.6)] backdrop-blur-md border-b">
        <p className="text-[24px] font-semibold">User List</p>

        <div className="flex gap-3">
          <Button variant="contained" onClick={() => setOpen(true)}>
            + ADD
          </Button>

          <Button variant="outlined" onClick={() => changeTheme("light")}>
            Light
          </Button>

          <Button variant="outlined" onClick={() => changeTheme("dark")}>
            Dark
          </Button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white w-[320px] p-5 rounded-xl shadow-lg flex flex-col gap-3 text-black">
            <h2 className="text-lg font-semibold text-center">
              Add User
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
              className="border p-2 rounded"
            />

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}