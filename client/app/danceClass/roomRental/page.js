"use client";
import { useState, useEffect } from "react";
import Calendar from "./calendar";


export default function ClassCreate() {
  const [inputs, setInputs] = useState([]);
  const [formData, setFormData] = useState({});

  const getData = async () => {
 
}; 
  

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-zinc-700">
        <Calendar/>        
    </div>
  );
}
