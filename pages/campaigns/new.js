import React from "react";
import Layout from "../../components/Layout";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

import { Button, Form, Input, Message } from 'semantic-ui-react';

class CampaignNew extends React.Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        isLoading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({isLoading: true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({isLoading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={e => this.setState({minimumContribution: e.target.value})}
                            />
                    </Form.Field>
                    <Message error header="Something went wrong" content={this.state.errorMessage} />

                    <Button primary loading={this.state.isLoading}>Create</Button>
                </Form>

            </Layout>
        );
    }
};

export default CampaignNew;
