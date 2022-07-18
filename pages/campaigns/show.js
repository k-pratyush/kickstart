import React from "react";
import Layout from "../../components/Layout";
import ContributeForm from "../../components/ContributeForm";
import Campaign from '../../ethereum/campaign';
import { Link } from '../../routes';

import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from "../../ethereum/web3";

class CampaignShow extends React.Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address);
        const metaData = await campaign.methods.getMetaData().call();
        return {
            address: props.query.address,
            minContribution: metaData[0],
            balance: metaData[1],
            requestsCount: metaData[2],
            approversCount: metaData[3],
            manager: metaData[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minContribution,
            requestsCount,
            approversCount
        } = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'Creator of this campaign',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minContribution,
                meta: "Minimum Contribution (wei)",
                description: "You must contribute atleast this much wei to become an approver."
            },
            {
                header: requestsCount,
                meta: "Number of requests",
                description: "A request tries to withdraw mony from the contract. Requests must be approved by approvers."
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description: 'Number of people who have already donated to campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Campaign Balance",
                description: 'The balance is how much money this campaign has to spend.'
            }
        ];
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                            
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                        </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
            
        );
    }
};

export default CampaignShow;
