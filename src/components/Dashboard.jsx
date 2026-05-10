// src/app/dashboard/page.jsx
"use client"
import { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '@/firebase'; // Ensure the correct path to your firebase.js file

export default function Dashboard() {
  const [contactForms, setContactForms] = useState([]);

  useEffect(() => {
    const contactFormsRef = ref(database, 'contactForms');
    
    const unsubscribe = onValue(contactFormsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setContactForms(formattedData);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const formRef = ref(database, `contactForms/${id}`);
    try {
      await remove(formRef);
      setContactForms(contactForms.filter((form) => form.id !== id));
      // Avoid blocking alerts; keep UI responsive and accessible.
      const el = document.getElementById("dashboard-status");
      if (el) el.textContent = "Form deleted successfully.";
    } catch (error) {
      console.error("Error deleting form:", error);
      const el = document.getElementById("dashboard-status");
      if (el) el.textContent = "Failed to delete form.";
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
        <h2 className="text-xl font-semibold mb-4 text-center">Contact Forms</h2>
        <div className="p-6 rounded-lg shadow-lg">
          <span id="dashboard-status" className="sr-only" aria-live="polite" />
          {contactForms.length === 0 ? (
            <p>No contact forms available.</p>
          ) : (
            <ul className="space-y-4">
              {contactForms.map((form) => (
                <li key={form.id} className="border p-4 rounded-md shadow-sm flex justify-between items-center">
                  <div>
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Message:</strong> {form.message}</p>
                    <p><strong>Timestamp:</strong> {new Date(form.timestamp).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(form.id)}
                    className="py-2 px-4 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
