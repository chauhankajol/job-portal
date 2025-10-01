import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";



export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job id is required.", success: false });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job", success: false });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const newApplication = await Application.create({ job: jobId, applicant: userId });
    // Log newApplication
 

    job.applications.push(newApplication._id);
    job.markModified('applications');  // Force field dirty if needed

    const savedJob = await job.save();
  

    return res.status(201).json({ message: "Job applied successfully.", success: true });
  } catch (error) {
    console.error('Error in applyJob:', error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// get applicants for a job - admin view
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error in getApplicants:", error);
    return res.status(500).json({
      message: "Server error fetching applicants.",
      success: false,
    });
  }
};

// get applied jobs by student
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name", // whatever fields
        },
      });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error in getAppliedJobs:", error);
    return res.status(500).json({
      message: "Server error fetching applied jobs.",
      success: false,
    });
  }
};

// update application status (admin)
export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    if (
      !status ||
      !["pending", "accepted", "rejected"].includes(status.toLowerCase())
    ) {
      return res.status(400).json({
        message: "Valid status is required: pending, accepted, or rejected.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
      application,
    });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    return res.status(500).json({
      message: "Server error updating status.",
      success: false,
    });
  }
};
