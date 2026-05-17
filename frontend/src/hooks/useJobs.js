import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Use a base URL approach to ensure we always hit the /api/jobs endpoint correctly
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/jobs`;

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      // Ensure jobs is always an array to prevent "filter is not a function" crashes
      setJobs(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load applications. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addJob = async (jobData) => {
    try {
      const response = await axios.post(API_URL, jobData);
      setJobs(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding job:', err);
      throw err;
    }
  };

  const updateJob = async (id, updateData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updateData);
      setJobs(prev => prev.map(job => job._id === id ? response.data : job));
      return response.data;
    } catch (err) {
      console.error('Error updating job:', err);
      throw err;
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, fetchJobs, addJob, updateJob, deleteJob };
};

export default useJobs;
