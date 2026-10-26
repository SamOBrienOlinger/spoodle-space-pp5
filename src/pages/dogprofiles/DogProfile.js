import React from "react";
import DogRecordCard from "../../components/DogRecordCard";
export default function DogProfile(props) { return <DogRecordCard kind="profile" record={props} detail={props.dogProfilePage} />; }
