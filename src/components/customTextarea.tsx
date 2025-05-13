import React, { Component, useState } from "react";
import '../css/Homepage.css'

type _props = {
    rows?: number;
    cols?: number;
    style?: Object;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

class CustomTextarea extends React.Component<_props> {
    constructor(_p : _props) {
        super(_p);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        if(this.props.onChange){
            this.props.onChange(event.target.value);
        }
    }

    render() {
        return(
            <textarea id="content-textarea" className="content-textarea" rows={(this.props.rows)?this.props.rows:undefined} cols={(this.props.cols)?this.props.cols:undefined} value={this.props.value} placeholder={this.props.placeholder ? this.props.placeholder : ""} style={(this.props.style)?this.props.style:undefined} onChange={this.handleInputChange}></textarea>
        )
    }
}

export default CustomTextarea;