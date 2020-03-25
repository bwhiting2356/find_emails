import React, { useState } from 'react';
import { Container, Form, Header, Button } from 'semantic-ui-react'
import Spinner from './components/Spinner';
import ResultsTable from './components/ResultsTable';

import findVerifiedEmails, { VerificationResult } from './util/findVerifiedEmails';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [domain, setDomain] = useState('');
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState<VerificationResult[]>([]);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setDomain('');
    setResults([]);
  };

  const onFormSubmit = async () => {
    setFetching(true);
    const results = await findVerifiedEmails(firstName, lastName, domain);
    setFetching(false);
    setResults(results);
  }

  const enableButton = lastName && firstName && domain;

  return (
    <Container style={{ width: '600px', marginTop: '20px' }}>
      <Header as='h1'>Verify Emails</Header>
      <Form onSubmit={onFormSubmit}>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='John' value={firstName} onChange={e => setFirstName(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Doe' value={lastName} onChange={e => setLastName(e.target.value)} />
          </Form.Field>

          <Form.Field>
            <label>Domain</label>
            <Form.Input placeholder='company.com' value={domain} onChange={e => setDomain(e.target.value)} />
          </Form.Field>
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button primary type='submit' disabled={!enableButton}>Find Verified Emails</Button>
          <Button secondary onClick={clearForm}>Clear</Button>
        </div>
      </Form>
      {fetching && <Spinner />}
      {!fetching && results.length > 0 && <ResultsTable results={results} />}
    </Container>
  );
}

export default App;
