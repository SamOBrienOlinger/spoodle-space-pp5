import React from "react";
import DogRecordCard from "../../components/DogRecordCard";
export default function DogHealth(props) { return <DogRecordCard kind="health" record={props} detail={props.dogHealthPage} />; }
