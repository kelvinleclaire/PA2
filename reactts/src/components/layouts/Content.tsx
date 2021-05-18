import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type ContentProps = {
  currentContent: () => JSX.Element;
}


function Content(
  contentProps: ContentProps
)
{
  return (
    <Container fluid className="Content d-flex h-100 p-0">
      <Row
        className="align-items-stretch p-0 m-0 container-fluid"> {/* Make all the columns stretch to top and bottom*/}
        {/* TODO: add some kind of templating system, so we can manipulate the columns (1 oder 2 cols) FROM THE OUTSIDE */}
        <Col className="m-0">
          {contentProps.currentContent()}
        </Col>
      </Row>
    </Container>
  )
}

export default Content;
