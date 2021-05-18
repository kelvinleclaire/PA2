import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type ContentProps = {
  currentContent: React.ReactNode;
  sideContent: () => JSX.Element;
}

function Content2Columns(
  contentProps: ContentProps
)
{
  return (
    <Row className="align-items-center h-100">
      <Col>
        {contentProps.currentContent}
      </Col>
      {/* TODO: make options changeable from the outside */}
      <Col className="bg-secondary align-self-stretch d-flex">
        {contentProps.sideContent()}
      </Col>
    </Row>
  );
}

export default Content2Columns;
