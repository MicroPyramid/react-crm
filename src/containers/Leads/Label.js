import React, { useEffect, useState } from 'react';
import { Chip } from "@mui/material";

export const Label = (props) => {
  const [tagsColor, setTagsColor] = useState("#665d1e");

  useEffect(() => {
    colorTag()
  }, [])

  const colorTag = () => {
    if (props.tags.name === 'account') {
      setTagsColor("red")
    } else if (props.tags.name === "testing") {
      setTagsColor("#D22B2B")
    } else if (props.tags.name === "assigned") {
      setTagsColor("#0087bd")
    } else if (props.tags.name === "bug") {
      setTagsColor("#008000")
    } else if (props.tags.name === "closed") {
      setTagsColor("#008080")
    } else if (props.tags.name === "asdfg") {
      setTagsColor("Crimson")
    } else if (props.tags.name === "test") {
      setTagsColor("#b06500")
    } else if (props.tags.name === "new") {
      setTagsColor("#FF2400")
    } else if (props.tags.name === "tagtest") {
      setTagsColor("#ffff00")
    } else if (props.tags.name === "assigning") {
      setTagsColor("#E0115F")
    } else if (props.tags.name === "leading") {
      setTagsColor("#4e1609")
    } else if (props.tags.name === "processing") {
      setTagsColor("#ffa500")
    } else if (props.tags.name === "vddafv") {
      setTagsColor("#ff004f")
    } else if (props.tags.name === "vfvfavtq") {
      setTagsColor("#ff5a36")
    } else if (props.tags.name === "active") {
      setTagsColor("#7f1734")
    } else if (props.tags.name === "details") {
      setTagsColor("#FF2400")
    } else if (props.tags.name === "testing") {
      setTagsColor("#D22B2B")
    } else if (props.tags.name === "created") {
      setTagsColor("#880808")
    } else if (props.tags.name === "details") {
      setTagsColor("#66ff00")
    } else if (props.tags.name === "new") {
      setTagsColor("#191970")
    } else if (props.tags.name === "staging") {
      setTagsColor("#191970")
    } else if (props.tags.name === "exist") {
      setTagsColor("#191970")
    } else if (props.tags.name === "tagest") {
      setTagsColor("#954535")
    } else if (props.tags.name === "asdfg") {
      setTagsColor("#E97451")
    }
  }
  
  return (
    (props.tags ?
      <Chip label={ props.tags.name }
        key={ props.tags.id }
        style={{
        backgroundColor: tagsColor,
        borderRadius: "3px",
        fontSize: "11px",
        padding: "5px",
        height: "20px",
        color: "white",
        marginLeft: "5px",
        textTransform: "capitalize",
        fontWeight: "bold",
        paddingTop: "6px",
        marginBottom: "3px"
        }}
      />
      : null)
  )
}