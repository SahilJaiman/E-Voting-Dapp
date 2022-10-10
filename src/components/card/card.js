import { Card, Col, Row, Button, Text, Badge, Tooltip } from "@nextui-org/react";

export const CandidateCard = (props) => (
    <Tooltip content={"Press to vote!"}  color="primary">
        <Card
            isPressable
            isHoverable
            css={{ w: "375px", h: "400px" }}
            onPress={props.onPress}
        >
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col>
                    <Text h3 color="black">

                    </Text>
                </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
                <Card.Image
                    src={props.src}
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    alt="Candidate"
                />
            </Card.Body>
            <Card.Footer
                isBlurred
                css={{
                    position: "absolute",
                    bgBlur: "#ffffff66",
                    borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                }}
            >
                <Row>
                    <Col>
                        <Text h3 color="black">
                            {props.name}
                        </Text>

                    </Col>
                    <Col>
                        <Row justify="flex-end">
                            <Button auto color="primary">
                                {props.votes}
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    </Tooltip>
);
