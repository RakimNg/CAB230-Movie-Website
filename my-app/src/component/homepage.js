import '../CSS/hero.css'
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { Navigation } from './base';
export function Homepage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headlines, setHeadlines] = useState([]);
    function Headline() {
        const dataArray = headlines.data;
        const MovieToday = [dataArray[0], dataArray[1], dataArray[2]]
        const imgURL1 = "https://picsum.photos/id/217/200/200"
        const imgURL2 = "https://picsum.photos/id/233/200/200"
        const imgURL3 = "https://picsum.photos/id/231/200/200"
        const imgArr = [imgURL1, imgURL2, imgURL3]
        console.log(MovieToday)
        return (
            <div>

                <Container>


                    <Row>
                        <CardGroup>
                            {MovieToday.map((headlines, index) => (
                                <Col sm={3}>

                                    <Card>

                                        <CardImg
                                            alt="Card image cap"
                                            src={imgArr[index]}
                                            top
                                            width="100%"
                                        />



                                        <CardBody>

                                            <CardTitle tag="h5">
                                                {headlines.title} - {headlines.year}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                <li>imdbRating: {headlines.imdbRating}</li>
                                            </CardSubtitle>
                                            <CardText>
                                                <li>Classification: {headlines.classification}</li>
                                            </CardText>

                                            <Button>
                                                View
                                            </Button>

                                        </CardBody>

                                    </Card>

                                </Col>

                            ))}
                        </CardGroup>
                    </Row>
                </Container>
            </div>


        )
    }





    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://sefdb02.qut.edu.au:3000/movies/search?title=Avengers');
                const data = await res.json();
                // const dataArray = data.data;
                // const MovieToday = [dataArray[0], dataArray[1], dataArray[2]]
                setHeadlines(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);





    if (loading) {

        return <p>loading...</p>;
    }

    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }

    return (<div>

        <Navigation />
        <div class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Welcome to Our Website</h1>
                <p class="hero-subtitle">Explore the world of amazing products and services.</p>
                <a href="#" class="hero-button">Get Started</a>
            </div>
        </div>
        <Headline />
        {/* {headlines.map((headline) => (
            <Headline
                key={headline.imdbID}
                title={headline.title}
                year={headline.year}
                imdbRating={headline.imdbRating}
                classification={headline.classification}
            />
        ))} */}
        {/* <p>{title}</p> */}

    </div>)

}
