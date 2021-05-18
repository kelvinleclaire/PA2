import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type ContentProps = {
  currentContent: () => JSX.Element
}

function Content1Column(
  contentProps: ContentProps
)
{
  return (
    <Row className="align-items-center h-100">
      <Col>
        {contentProps.currentContent()}
      </Col>
    </Row>
  );
}

export default Content1Column;
