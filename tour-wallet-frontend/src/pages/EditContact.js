import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    emergencytype: "",
    name: "",
    age:"",
    vehicleName:"",
    locationDetails:"",
    mainRequest:"", 
    passengersRequests:"", 
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Updated [${userDetails.name}] contact`);

      setUserDetails({
        emergencytype: "",
        name: "",
        age: "",
        vehicleName: "",
        locationDetails: "",
        mainRequest: "",
        passengersRequests: "",
        email: "",
        phone: "",
      });
      navigate('/');
    } else {
      toast.error(result.error);
    }
  };
  
  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      setUserDetails({
        emergencytype:result.emergencytype,
        name: result.name,
        age:result.age,
        gender:result.gender,
        vehicleName:result.vehicleName,
        locationDetails:result.locationDetails,
        mainRequest:result.mainRequest,
        passengersRequests:result.passengersRequests,
        email: result.email,
        phone: result.phone,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const navigateToGoogleMaps = () => {
    // Construct the Google Maps URL using the location details entered by the user
    const { locationDetails } = userDetails;
    if (locationDetails) {
      window.open(`https://www.google.com/maps?q=${encodeURIComponent(locationDetails)}`);
    } else {
      toast.error("Location details are required.");
    }
  };

  return (
    <>
        <h2>Update your Emergency Rerequest</h2>

        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="emergencytypeInput" className="form-label mt-4">
              Emergency Type 
            </label>
            <input
              type="text"
              className="form-control"
              id="emergencytypeInput"
              name="emergencytype"
              value={userDetails.emergencytype}
              onChange={handleInputChange}
              placeholder="For Accident or Other"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nameInput" className="form-label mt-4">
              Name Of Person
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="form-group">
          <label htmlFor="ageInput" className="form-label mt-4">
          Age Of Person
        </label>
        <input
          type="number"  // Change type to "text"
          className="form-control"
          id="ageInput"
          name="age"
          value={userDetails.age}
          onChange={handleInputChange}
          placeholder="Enter age"  // Update placeholder text
          required
        />
        </div>

          <div className="form-group">
            <label htmlFor="vehicleNameInput" className="form-label mt-4">
            Vehicle Name 
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleNameInput"
              name="vehicleName"
              value={userDetails.vehicleName}
              onChange={handleInputChange}
              placeholder="CAB-2725"
              required
            />
          </div>
               
          <div className="form-group">
            <label htmlFor="locationDetailsInput" className="form-label mt-4">
            LocationDetails
            </label>
            <button onClick={navigateToGoogleMaps} className="btn btn-primary my-2">
          Open Google Maps
          </button>
            <input
              type="text"
              className="form-control"
              id="locationDetailsInput"
              name="locationDetails"
              value={userDetails.locationDetails}
              onChange={handleInputChange}
              placeholder="locationDetails"
              required
              
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mainRequestInput" className="form-label mt-4">
            Main Request
            </label>
            <input
              type="text"
              className="form-control"
              id="mainRequestInput"
              name="mainRequest"
              value={userDetails.mainRequest}
              onChange={handleInputChange}
              placeholder="Main Request"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="passengersRequestsInput" className="form-label mt-4">
            Passengers Requests
            </label>
            <input
              type="text"
              className="form-control"
              id="passengersRequestsInput"
              name="passengersRequests"
              value={userDetails.passengersRequests}
              onChange={handleInputChange}
              placeholder="PassengersRequestsInput"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailInput" className="form-label mt-4">
              Email Of Person
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="johndoe@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneInput" className="form-label mt-4">
              Phone Number Of Person
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneInput"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              placeholder="+977 987654321"
              required
            />
          </div>
          <input
            type="submit"
            value="Update Emergency Request"
            className="btn btn-info my-2"
          />
        </form>
      </>
  );
};

export default EditContact;
