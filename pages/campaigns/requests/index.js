import React from "react";
import Layout from "../../../components/Layout";
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';

class RequestIndex extends React.Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
};

export default RequestIndex;