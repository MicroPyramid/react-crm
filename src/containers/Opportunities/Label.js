import React, { useEffect, useState } from 'react';
import { Chip } from "@mui/material";

export const Label = (props) => {
  const [tags, seTags] = useState([props.tags.name]);
  const [tagsColor, setTagsColor] = useState("olive");

  useEffect(() => {
    colorTag()
  }, [])
  
  const colorTag = () => {
    if (props.tags.name === 'account') {
      setTagsColor("red");
    }
    else if (props.tags.name === "testing") {
      setTagsColor("orange");
    }
    else if (props.tags.name === "created") {
      setTagsColor("blue");
    }
    else if (props.tags.name === "assigned") {
      setTagsColor("yellow");
    }
    else if (props.tags.name === "bug") {
      setTagsColor("green");
    }
    else if (props.tags.name === "closed") {
      setTagsColor("purple");
    }
  }
  return (
    <div>
      {
        props.tags ?
        <Chip
          label={props.tags.name}
          style={{
          backgroundColor: tagsColor,
          borderRadius: "5px",
          fontSize: "10px",
          padding: "5px",
          height: "20px",
          color: "white",
          marginLeft: "4px",
          textTransform: "capitalize",
          fontWeight: "bold",
          paddingTop: "5px",
          paddingLeft: "0px",
          paddingRight: "0px",
          }}
        />
        : null
      }
    </div>
  )
}
