import React, { useState, useRef } from 'react';
import axiosInstance from '../../Api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SessionEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    jsonUrl: '',
    status: 'draft',
  });


 const lastSavedDataRef = useRef(formData);
  const timeoutRef = useRef(null);

  // Compare current form data with last saved data (only relevant fields)
  const isFormDataEqual = (a, b) => {
    return (
      a.title === b.title &&
      a.tags === b.tags &&
      a.jsonUrl === b.jsonUrl
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-save after 5 seconds of inactivity
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 5000);
  };

  const handleAutoSave = async () => {
    
    if (isFormDataEqual(formData, lastSavedDataRef.current)) {
    
    return;
  }

  try {
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const payload = {
      ...formData,
      tags: tagsArray,
      status: 'draft'
    };

    await axiosInstance.post('/my-sessions/save-draft', payload);
     lastSavedDataRef.current = { ...formData };
    toast.success('Draft auto-saved');
  } catch (err) {
    toast.error('Auto-save failed');
  }
};


  const handleSubmit = async (status) => {
     clearTimeout(timeoutRef.current);
  try {
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const payload = {
      ...formData,
      tags: tagsArray,
      status
    };
    console.log(status)
      if(status=='published')
   { await axiosInstance.post('/my-sessions/publish', payload);}
  else
  {
    await axiosInstance.post('/my-sessions/save-draft', payload);
  }
     lastSavedDataRef.current = { ...formData };
    toast.success(status === 'draft' ? 'Saved as draft' : 'Published successfully');
    if(status === 'published') {
  setFormData({ title: '', tags: '', jsonUrl: '', status: 'draft' });
}

  } catch (err) {
    toast.error('Failed to save session');
  }
};


  return (
    <div className="h-full py-20  px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-[#7e8446]">Session Editor</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter session title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter comma-separated tags"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="jsonUrl"
            value={formData.jsonUrl}
            onChange={handleChange}
            placeholder="Enter JSON file URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
               className="bg-[#7e8446] text-white px-4 py-2  rounded hover:bg-[#7e8446]/70  w-full"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('published')}
              className="bg-[#7e8446] text-white px-4 py-2  rounded hover:bg-[#7e8446]/70  w-full"
            >
              Publish
            </button>
          </div>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default SessionEditor;
