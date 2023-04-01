import React, { useEffect, useState } from "react";
import MedicineCard from "../components/MedicineCard";
import Navbar from "../components/Navbar";
import img from "../assets/bg.jpg";
import img1 from "../assets/img1.jpg";
import axios from "axios";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";
import { elements } from "chart.js";

const GetMedicine = ({ org }) => {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    const ngo = database.ref("ngos");
    ngo.on("value", (snapshot) => {
      const info = snapshot.val();
      const dataArray = [];

      // Iterate over the keys of the object and add each value to the array
      Object.keys(info).forEach((key) => {
        dataArray.push(info[key].medicines);
      });

      setMeds(dataArray);
    });
  }, []);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div>
      <Navbar />
      <div className="grid md:grid-cols-3 sm:grid-cols-1 2xl:grid-cols-4 justify-evenly px-8 pt-8 ">
        {
          meds.map((element, index) => {
            return (
            element.map((medicine, index) => {
              return (
                <MedicineCard
                  name={medicine.name}
                  quantity={medicine.count}
                  expiry={medicine.date}
                  img={
                    // medicine.picture
                    //   ? "data:image/jpg;base64," +
                    //     _arrayBufferToBase64(medicine.picture)
                    //   : img
                    medicine.picture
                  }
                  key={index}
                  // oid={element._id}
                />
              );
            }) )
          })}
      </div>
    </div>
  );
};

export default GetMedicine;