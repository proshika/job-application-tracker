import React, { useState } from 'react';
import { Plus, Briefcase, Layout, RefreshCw } from 'lucide-react';
import KanbanBoard from './components/KanbanBoard';
import AddJobModal from './components/AddJobModal';
import useJobs from './hooks/useJobs';

function App() {
  const { jobs, loading, error, addJob, updateJob, deleteJob, fetchJobs } = useJobs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const handleAddJob = async (jobData) => {
    try {
      await addJob(jobData);
    } catch (err) {
      alert('Failed to add job application.');
    }
  };

  const handleEditJob = async (id, jobData) => {
    try {
      await updateJob(id, jobData);
    } catch (err) {
      alert('Failed to update job application.');
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await deleteJob(id);
      } catch (err) {
        alert('Failed to delete job application.');
      }
    }
  };

  const handleOpenEditModal = (job) => {
    setEditJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditJob(null);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateJob(id, { status: newStatus });
    } catch (err) {
      alert('Failed to update job status.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-md shadow-blue-100">
              <Briefcase size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-800">JobTracker</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchJobs}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <button 
              onClick={() => { setEditJob(null); setIsModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-blue-100 flex items-center gap-2"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Job</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto py-6">
        {error && (
          <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-3 shadow-sm">
            <div className="bg-red-100 p-1 rounded-full text-xs font-bold">!</div>
            {error}
          </div>
        )}

        {loading && jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium">Loading your board...</p>
          </div>
        ) : (
          <KanbanBoard 
            jobs={jobs} 
            onUpdateStatus={handleUpdateStatus}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteJob}
          />
        )}
      </main>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => { setEditJob(null); setIsModalOpen(true); }}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform active:scale-95 z-20"
      >
        <Plus size={28} />
      </button>

      {/* Modal */}
      <AddJobModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onAdd={handleAddJob}
        onEdit={handleEditJob}
        editJob={editJob}
      />
    </div>
  );
}

export default App;
