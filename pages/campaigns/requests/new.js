import React from "react";
import { Form, Button, Message } from 'semantic-ui-react';
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from '../../.../routes';

class RequestNew extends React.Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }
    render() {
        return (
            <Form>
                
            </Form>
        );
    }
};

export default RequestNew;
