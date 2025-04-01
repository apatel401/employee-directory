import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"

import "./index.scss"
import MainContainer from "./MainContainer"

registerBlockType(metadata.name, { edit: EmployeeDirectory })

const divsToUpdate = document.querySelectorAll(".employee-directory")

divsToUpdate.forEach(div => {
  // const data = JSON.parse(div.querySelector("pre").innerText)
  const root = ReactDOM.createRoot(div)
  root.render(<EmployeeDirectory />)
})

function EmployeeDirectory() {
  
  return (
    <div {...useBlockProps()}>
    <div className="directory-container">
    <MainContainer />
    </div>
    </div>
  )
}