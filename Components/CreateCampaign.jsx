// this file was created with the help of claude.ai

import { useState } from "react";

const timeSlots = [
  "Saturday evenings",
  "Friday nights",
  "Sunday mornings",
  "Sunday evenings",
  "Sunday afternoons",
  "Saturday mornings",
  "Saturday afternoons",
  "Weeknights (Mon–Thu)",
  "All"
];

function CreateCampaign({ user, onCampaignCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    schedule: "",
    style: ""
  });

  // Only show button if user is a DM
  if (!user || user.role !== "DM") {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError("Campaign name is required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.schedule) {
      setError("Please select a time slot");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          dm: user.id
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create campaign");
      }

      const data = await response.json();
      
      // Reset form
      setFormData({
        name: "",
        location: "",
        schedule: "",
        style: ""
      });
      setShowForm(false);

      // Notify parent component
      if (onCampaignCreated) {
        onCampaignCreated(data.campaign);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setError(null);
    setFormData({
      name: "",
      location: "",
      schedule: "",
      style: ""
    });
  };

  return (
    <div className="create-campaign-container">
      {!showForm ? (
        <button 
          className="btn-create-campaign"
          onClick={() => setShowForm(true)}
        >
          + Create New Campaign
        </button>
      ) : (
        <div className="campaign-form-wrapper">
          <div className="campaign-form-header">
            <h2>Create New Campaign</h2>
            <button 
              className="btn-close"
              onClick={handleCancel}
              aria-label="Close form"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="campaign-form">
            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Campaign Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Drums from the deep"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Seattle, WA"
              />
            </div>

            <div className="form-group">
              <label htmlFor="schedule">Time Slot *</label>
              <select
                id="schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a time slot...</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="style">Campaign Style</label>
              <input
                type="text"
                id="style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                placeholder="e.g., dungeon crawl, high magic, political intrigue"
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateCampaign;
