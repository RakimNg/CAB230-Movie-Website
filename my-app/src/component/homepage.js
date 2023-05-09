
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { Navigation } from './base';
export function Headline(props) {
    return (
        <div>

            <Container>


                <Row>
                    <CardGroup>

                        <Col sm={4}>
                            <Card>





                                <CardBody>
                                    <CardTitle tag="h5">
                                        {props.title} - {props.year}
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                    >
                                        <li>imdbRating: {props.imdbRating}</li>
                                    </CardSubtitle>
                                    <CardText>
                                        <li>Classification: {props.classification}</li>
                                    </CardText>
                                    <Button>
                                        View
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>


                    </CardGroup>
                </Row>
            </Container>
        </div>


    )
}
export const useData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headlines, setHeadlines] = useState([]);


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://sefdb02.qut.edu.au:3000/movies/search?title=');
                const data = await res.json();
                const dataArray = data.data;
                const MovieToday = [dataArray[0], dataArray[1], dataArray[2]]
                setHeadlines(MovieToday);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { loading, error, headlines };
};



export function Homepage() {


    const { loading, error, headlines } = useData();
    if (loading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }

    return (<div>

        <Navigation />
        <header>Welcome user1234</header>
        {headlines.map((headline) => (
            <Headline
                key={headline.imdbID}
                title={headline.title}
                year={headline.year}
                imdbRating={headline.imdbRating}
                classification={headline.classification}
            />
        ))}
        {/* <p>{title}</p> */}

    </div>)
}
