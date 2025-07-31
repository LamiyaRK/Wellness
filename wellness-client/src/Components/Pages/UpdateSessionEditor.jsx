import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../../Api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router';

const UpdateSessionEditor = () => {
  const { id } = useParams(); // session ID from URL param
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sessionId: null,
    title: '',
    tags: '',
    jsonUrl: '',
    status: 'draft',
  });

  const lastSavedDataRef = useRef(formData);
  const timeoutRef = useRef(null);

  // Load session data on mount
  useEffect(() => {
    if (id) {
      axiosInstance.get(`/my-sessions/${id}`)
        .then(res => {
          const session = res.data;
          setFormData({
            sessionId: session._id,
            title: session.title,
            tags: session.tags.join(', '),
            jsonUrl: session.json_file_url,
            status: session.status,
          });
          lastSavedDataRef.current = {
            sessionId: session._id,
            title: session.title,
            tags: session.tags.join(', '),
            jsonUrl: session.json_file_url,
            status: session.status,
          };
        })
        .catch(err => {
          toast.error("Failed to load session data");
          navigate('/my-sessions'); // redirect on failure
        });
    }
  }, [id, navigate]);

  // Check if data changed to avoid duplicate autosave
  const isFormDataEqual = (a, b) => (
    a.title === b.title &&
    a.tags === b.tags &&
    a.jsonUrl === b.jsonUrl
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 5000);
  };

  const handleAutoSave = async () => {
    if (isFormDataEqual(formData, lastSavedDataRef.current)) return;

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const payload = {
        sessionId: formData.sessionId,
        title: formData.title,
        tags: tagsArray,
        jsonUrl: formData.jsonUrl,
        status: 'draft',
      };

      await axiosInstance.post('/my-sessions/save-draft', payload);

      lastSavedDataRef.current = { ...formData };
      toast.success('Auto-Updated Draft');
    } catch {
      toast.error('Auto-update failed');
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
        sessionId: formData.sessionId,
        title: formData.title,
        tags: tagsArray,
        jsonUrl: formData.jsonUrl,
        status,
      };

      if (status === 'published') {
        await axiosInstance.post('/my-sessions/publish', payload);
      } else {
        await axiosInstance.post('/my-sessions/save-draft', payload);
      }

      lastSavedDataRef.current = { ...formData };
      toast.success(status === 'draft' ? 'Updated draft' : 'Published successfully');

      if (status === 'published') {
       setTimeout(() => navigate('/my-sessions'), 3000);
      }
    } catch {
      toast.error('Failed to update session');
    }
  };

  return (
    <div className="h-full py-20 px-4">
      <div className="w-full xs:w-sm sm:w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-[#7e8446]">Update Session</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter session title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter comma-separated tags"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="jsonUrl" className="block text-sm font-medium mb-1">JSON File URL</label>
            <input
              type="text"
              name="jsonUrl"
              id="jsonUrl"
              value={formData.jsonUrl}
              onChange={handleChange}
              placeholder="Enter JSON file URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
            <input
              type="text"
              name="status"
              id="status"
              value={formData.status}
              disabled
              className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

         <div className="flex justify-between gap-3 mt-6">
  {formData.status === 'draft' ? (
    <>
      <button
        type="button"
        onClick={() => handleSubmit('draft')}
        className="bg-[#7e8446] text-white px-4 py-2 rounded hover:bg-[#7e8446]/70 w-full"
      >
        Update Draft
      </button>
      <button
        type="button"
        onClick={() => handleSubmit('published')}
        className="bg-[#7e8446] text-white px-4 py-2 rounded hover:bg-[#7e8446]/70 w-full"
      >
        Publish
      </button>
    </>
  ) : (
    <button
      type="button"
      onClick={() => handleSubmit('published')}
      className="bg-[#7e8446] text-white px-4 py-2 rounded hover:bg-[#7e8446]/70 w-full"
    >
      Update
    </button>
  )}
</div>

        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );


};

export default UpdateSessionEditor;
