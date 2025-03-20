"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";
export default function PopUp() {
  const [showHistory, setShowHistory] = useState(false);

  const [regular, setRegular] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [popUp, setPopUp] = useState([]);
  const [showCase, setShowCase] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getClassList = async () => {
      const res = await fetch("http://localhost:3030/member/getClassList", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      // setPresentclassList(data.workshop);
      console.log(data.regular);
      setRegular(data.regular);
      setWorkshop(data.workshop);
      setPopUp(data.popUp);
      setShowCase(data.showcase);
      // setPresentclassList(data.present);
      // setOldclassList(data.old);
      setLoading(false);
    };
    getClassList();
  }, []);

  useEffect(() => {
    console.log(regular.length);
  }, [regular]);

  return <>This is the member class</>;
}
