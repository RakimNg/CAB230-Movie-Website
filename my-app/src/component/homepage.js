import '../CSS/hero.css'
import '../CSS/card.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { Navigation } from './nav';
export function Homepage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headlines, setHeadlines] = useState([]);
    const navigate = useNavigate()
    function Headline() {
        const dataArray = headlines.data;
        const MovieToday = [dataArray[0], dataArray[1], dataArray[2]]
        const imgURL1 = "https://picfiles.alphacoders.com/348/348156.jpg"
        const imgURL2 = "https://i.pinimg.com/originals/d3/e3/1e/d3e31e5775d1aed0820b555da52d0677.jpg"
        const imgURL3 = "https://th.bing.com/th/id/R.18d1c08202b0b5812d7902cebc3d6c28?rik=3CrG5TQJ9BegnA&riu=http%3a%2f%2fimage.tmdb.org%2ft%2fp%2foriginal%2f5iZ0wT8MvnKoUd85guu00pszqMC.jpg&ehk=f9MXNlG74Bwkqrbfk%2bDZQfdpKXlckEw9bU%2bGVYN3I8A%3d&risl=&pid=ImgRaw&r=0"
        const imgArr = [imgURL1, imgURL2, imgURL3]
        console.log(MovieToday)
        return (
            <div className='card-group'>

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

                                            <Button color="danger" onClick={() => {
                                                localStorage.setItem("imdbID", headlines.imdbID);
                                                navigate(`movie/${headlines.imdbID}`)
                                            }}>View</Button>

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
                const res = await fetch('http://sefdb02.qut.edu.au:3000/movies/search?title=star%20war');
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
                <p class="hero-subtitle">Explore the fantastic movie world!</p>
                <a href="#" class="hero-button">Get Started</a>
            </div>
        </div>
        <div class="h3">
            <h5>
                Recommended Movies
            </h5>
        </div>

        <Headline />

    </div>)

}
