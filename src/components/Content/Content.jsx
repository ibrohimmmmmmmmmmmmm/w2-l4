import { Menu } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const API = "https://69b7ccaeffbcd028609636b4.mockapi.io/data";

export default function Content() {
  const [data, setData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editPerson, setEditPerson] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setData(data.filter(p => p.id !== id));
    setOpenMenuId(null);
  };
  const handleInfo = (person) => {
    setSelectedPerson(person);
    setOpenMenuId(null);
  };

  const handleEditOpen = (person) => {
    setEditPerson(person);
    setOpenMenuId(null);
  };
  const handleSave = async () => {
    await fetch(`${API}/${editPerson.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editPerson)
    });
    setData(data.map(p => p.id === editPerson.id ? editPerson : p));
    setEditPerson(null);
  };
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <div className="relative">
      {data.map((person) => (
        <div
          key={person.id}
          className="flex items-center justify-between h-23.5 border-b relative"
        >
          <div className="flex items-center gap-3">
            <img className="rounded-full w-10" src={person.image} alt="" />
            <div>
              <p className="font-semibold">{person.name}</p>
              <p>{person.email}</p>
            </div>
          </div>
          <p>{person.city}</p>
          <p>{person.status ? "Active" : "Inactive"}</p>
          <p>{person.phone}</p>
          <Menu
            className="cursor-pointer"
            onClick={() => toggleMenu(person.id)}
          />
          {openMenuId === person.id && (
            <div className="absolute right-0 top-12 bg-white shadow p-2 rounded flex flex-col gap-2 z-50">
              <button onClick={() => handleInfo(person)}>Info</button>
              <button onClick={() => handleEditOpen(person)}>Edit</button>
              <button onClick={() => handleDelete(person.id)} className="text-red-500">
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-80">
            <h2 className="font-bold mb-2">User Info</h2>
            <p>Name: {selectedPerson.name}</p>
            <p>Email: {selectedPerson.email}</p>
            <p>City: {selectedPerson.city}</p>

            <button
              onClick={() => setSelectedPerson(null)}
              className="mt-3 bg-black text-white px-3 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {editPerson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-80 flex flex-col gap-2">
            <input
              value={editPerson.name}
              onChange={(e) =>
                setEditPerson({ ...editPerson, name: e.target.value })
              }
              className="border p-1"
            />
            <input
              value={editPerson.email}
              onChange={(e) =>
                setEditPerson({ ...editPerson, email: e.target.value })
              }
              className="border p-1"
            />
            <input
              value={editPerson.city}
              onChange={(e) =>
                setEditPerson({ ...editPerson, city: e.target.value })
              }
              className="border p-1"
            />
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1"
            >
              Save
            </button>
            <button
              onClick={() => setEditPerson(null)}
              className="bg-gray-400 text-white px-3 py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}