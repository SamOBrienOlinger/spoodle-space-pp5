import React from "react";
import DogRecordCard from "../../components/DogRecordCard";
export default function DogDanger(props) { return <DogRecordCard kind="behaviour" record={props} detail={props.dogDangerPage} />; }
