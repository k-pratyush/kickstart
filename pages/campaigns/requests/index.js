import React from "react";
import Layout from "../../../components/Layout";
import RequestRow from "../../../components/RequestRow";
import { Button, Tab, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from "../../../ethereum/campaign";

class RequestIndex extends React.Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((el, idx) => {
                return campaign.methods.requests(idx).call();
            })
        );
        const approversCount = await campaign.methods.approversCount().call();
        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((req, idx) => {
            return (
                <RequestRow 
                    key={idx}
                    id={idx}
                    request={req}
                    approversCount={this.props.approversCount}
                    address={this.props.address}
                />
            );
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>
                    Found {this.props.requestCount} requests.
                </div>
            </Layout>
        );
    }
};

export default RequestIndex;