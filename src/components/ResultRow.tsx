import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { VerificationResult } from '../util/findVerifiedEmails';

const ResultRow = ({ email, verified }: VerificationResult) => (
    <Table.Row>
        <Table.Cell>
            {verified ? <a href={`mailto:${email}`}>{email}</a> : email}
        </Table.Cell>
        <Table.Cell>
            {verified ? <Icon name='check' color="green" /> : <Icon name='x' color="red" />}
        </Table.Cell>
    </Table.Row>
);

export default ResultRow;