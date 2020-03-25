import React from 'react';
import { Table } from 'semantic-ui-react';
import { VerificationResult } from '../util/findVerifiedEmails';
import ResultRow from './ResultRow';

const ResultsTable = ({ results }: { results: VerificationResult[] }) => (
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Verified</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {results.map(result => <ResultRow key={result.email} {...result} />)}
        </Table.Body>
    </Table>
);

export default ResultsTable;