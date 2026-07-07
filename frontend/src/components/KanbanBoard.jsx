import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Calendar, DollarSign, ChevronRight, ChevronLeft, Edit2, Trash2 } from 'lucide-react';

const COLUMNS = [
  { id: 'Wishlist', title: 'Wishlist', color: 'bg-purple-100 border-purple-200 text-purple-700' },
  { id: 'Applied', title: 'Applied', color: 'bg-blue-100 border-blue-200 text-blue-700' },
  { id: 'Interviewing', title: 'Interviewing', color: 'bg-yellow-100 border-yellow-200 text-yellow-700' },
  { id: 'Offered', title: 'Offered', color: 'bg-green-100 border-green-200 text-green-700' },
  { id: 'Rejected', title: 'Rejected', color: 'bg-red-100 border-red-200 text-red-700' },
];

const DropdownMenu = ({ isOpen, onEdit, onDelete, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]"
    >
      <button 
        onClick={onEdit}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors"
      >
        <Edit2 size={14} />
        Edit
      </button>
      <button 
        onClick={onDelete}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
};

const KanbanBoard = ({ jobs = [], onUpdateStatus, onEdit, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const getJobsByStatus = (status) => {
    return jobs.filter(job => job.status === status);
  };

  const moveJob = (job, direction) => {
    const currentIndex = COLUMNS.findIndex(col => col.id === job.status);
    const nextIndex = currentIndex + direction;
    
    if (nextIndex >= 0 && nextIndex < COLUMNS.length) {
      onUpdateStatus(job._id, COLUMNS[nextIndex].id);
    }
  };

  const handleMenuToggle = (jobId) => {
    setOpenMenuId(openMenuId === jobId ? null : jobId);
  };

  const handleEdit = (job) => {
    setOpenMenuId(null);
    onEdit(job);
  };

  const handleDelete = (jobId) => {
    setOpenMenuId(null);
    onDelete(jobId);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 overflow-x-auto min-h-[calc(100vh-200px)] items-start">
      {COLUMNS.map((column) => (
        <div key={column.id} className="flex-1 min-w-[300px] bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col max-h-full">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className={`font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${column.color}`}>
              {column.title} <span className="ml-1 opacity-60">({getJobsByStatus(column.id).length})</span>
            </h3>
          </div>

          <div className="space-y-4 overflow-y-auto pr-1">
            {getJobsByStatus(column.id).map((job) => (
              <div 
                key={job._id} 
                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all group relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                    {job.companyName}
                  </h4>
                  <div className="relative">
                    <button 
                      onClick={() => handleMenuToggle(job._id)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
                      title="Menu"
                    >
                      <MoreVertical size={16} />
                    </button>
                    <DropdownMenu 
                      isOpen={openMenuId === job._id}
                      onEdit={() => handleEdit(job)}
                      onDelete={() => handleDelete(job._id)}
                      onClose={() => setOpenMenuId(null)}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{job.jobTitle}</p>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {job.salary && (
                    <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      <DollarSign size={12} className="mr-1 text-green-600" />
                      {job.salary.toLocaleString()}
                    </div>
                  )}
                  <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    <Calendar size={12} className="mr-1 text-blue-600" />
                    {new Date(job.dateApplied).toLocaleDateString()}
                  </div>
                </div>

                {job.notes && (
                  <p className="text-xs text-gray-400 mt-3 line-clamp-2 italic border-t border-gray-50 pt-2">
                    "{job.notes}"
                  </p>
                )}

                {/* Move Controls */}
                <div className="flex justify-between mt-4 pt-3 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => moveJob(job, -1)}
                    disabled={job.status === COLUMNS[0].id}
                    className={`p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all`}
                    title="Move Left"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => moveJob(job, 1)}
                    disabled={job.status === COLUMNS[COLUMNS.length - 1].id}
                    className={`p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all`}
                    title="Move Right"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {getJobsByStatus(column.id).length === 0 && (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 text-sm">
                No items
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
