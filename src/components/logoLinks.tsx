import React, { Component, useState } from "react";
import '../css/Homepage.css'
import { Stack } from "react-bootstrap";
import GithubIcon from '../media/github_icon.png';

class LogoLinks extends React.Component{


    render() {
        return(
            <>
                <Stack className="ms-1" direction="horizontal" gap={1}>
                    <a href="https://github.com/UisiongKhu/DeHyphenated"><img src={GithubIcon} height={50} width={50} /></a>
                </Stack>
            </>
        )
    }
}

export default LogoLinks;