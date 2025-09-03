import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// Create Appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctorId,
        hasVisited,
        address,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctorId ||
        !address
    ) {
        return next(new ErrorHandler("Please Fill The Form!", 400));
    }

    // Find doctor by ID
    const doctor = await User.findOne({
        _id: doctorId,
        role: "Doctor",
        doctorDepartment: department,
    });

    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor.firstName,
            lastName: doctor.lastName,
        },
        hasVisited,
        address,
        doctorId: doctor._id,
        patientId,
    });

    res.status(200).json({
        success: true,
        appointment,
        message: "Appointment Sent Successfully!",
    });
});

// Get all appointments
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});

// Update appointment status
export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment,
    });
});

// Delete appointment
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment Not Found!", 404));
    }

    await appointment.deleteOne();

    res.status(200).json({
        success: true,
        message: "Appointment Deleted!",
    });
});
