import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => (
    <Segment style={{ minHeight: '200px' }}>
        <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>
    </Segment>
);

export default Spinner;
