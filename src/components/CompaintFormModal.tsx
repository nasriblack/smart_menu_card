import { Send, X } from "lucide-react";
import React, { SetStateAction } from "react";
import { ComplaintForm } from "../utils/types";

type Props = {
  handleComplaintFormChange: (
    field: keyof ComplaintForm,
    value: string
  ) => void;
  complaintForm: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    priority: string;
  };
  handleComplaintSubmit: (e: React.FormEvent) => void;
  setShowComplaintForm: React.Dispatch<SetStateAction<boolean>>;
};

const CompaintFormModal = ({
  handleComplaintFormChange,
  complaintForm,
  handleComplaintSubmit,
  setShowComplaintForm,
}: Props) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif text-[#2c2c2c]">
                Contact Manager
              </h2>
              <button
                onClick={() => setShowComplaintForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleComplaintSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={complaintForm.name}
                    onChange={(e) =>
                      handleComplaintFormChange("name", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={complaintForm.email}
                    onChange={(e) =>
                      handleComplaintFormChange("email", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={complaintForm.phone}
                    onChange={(e) =>
                      handleComplaintFormChange("phone", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={complaintForm.priority}
                    onChange={(e) =>
                      handleComplaintFormChange("priority", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={complaintForm.subject}
                  onChange={(e) =>
                    handleComplaintFormChange("subject", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  placeholder="Brief description of your concern"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={complaintForm.message}
                  onChange={(e) =>
                    handleComplaintFormChange("message", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent resize-none"
                  placeholder="Please describe your concern in detail..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowComplaintForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send to Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaintFormModal;
