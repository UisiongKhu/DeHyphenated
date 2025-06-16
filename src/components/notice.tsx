import React, { Component, useState } from "react";
import '../css/Homepage.css'
import { Stack } from "react-bootstrap";

type _props = {
    title: string;
    content: string;
    datetime?: string;
}

class Notice extends React.Component<_props> {
    constructor(_p : _props) {
        super(_p);
    }

    render() {
        return(
            <>
                <div className="m-1 p-1 border border-1 border-dark rounded rounded-3">
                    <Stack className="justify-content-between" direction="horizontal">
                        <h3>{this.props.title}</h3>
                        {(this.props.datetime)?<p>{this.props.datetime}</p>:<></>}
                    </Stack>
                    <hr/>
                    <p>{this.props.content}</p>
                </div>
            </>
        )
    }
}

export default Notice;