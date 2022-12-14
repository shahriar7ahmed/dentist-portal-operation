import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";

import PrivateRoute from "../../../Routes/PrivateRoute/PrivateRoute";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointments = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, "PP");

  const { data: appointmentOptions = [], refetch } = useQuery({
    queryKey: ["appointment-options", date],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/appointment-options?date=${date}`
      ).then((res) => res.json()),
  });

  return (
    <section className="my-16">
      <p className="text-center text-secondary font-bold">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            appointmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <PrivateRoute>
          <BookingModal
            refetch={refetch}
            selectedDate={selectedDate}
            treatment={treatment}
            setTreatment={setTreatment}
          ></BookingModal>
        </PrivateRoute>
      )}
    </section>
  );
};

export default AvailableAppointments;
