import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader"
import { css } from "@emotion/react"

const Loader = (props) => {

    const override = css`
        position: fixed;
        top: 50%;
        left: 50%;
    `

    return (
        <PropagateLoader
            color={ props.color }
            css={ override }
            size={ 35 }
        />
    )
}

export default Loader