import { MoviesLib } from './Movies';
import { Navigation } from './base';
import React, { useEffect, useState } from 'react';
export const MoviePage = (prop) => {
    const ID = prop.json();
    const ID1 = ID.imdbID();
    console.log(ID1)
}
// export function MoviePage(imdbID) {
//     console.log(imdbID)
//     useEffect(
//         () => {
//             console.log(imdbID)

//         }, [imdbID])
// }
// export function MoviePage(imdbID) {
//     // const [loading, setLoading] = useState(true);
//     // const [error, setError] = useState(null);
//     // const [headlines, setHeadlines] = useState([]);
//     // console.log(imdbID)
//     // if (imdbID != {}) {
//     //     console.log(imdbID)
//     // }
//     useEffect(() => {
//         console.log(imdbID)
//     }, [])
//     // useEffect(() => {
//     //     const getData = async () => {
//     //         try {
//     //             if (imdbID !== undefined) {
//     //                 const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`);
//     //                 const data = await res.json();
//     //                 setHeadlines(data);
//     //             }
//     //         } catch (error) {
//     //             setError(error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     getData();
//     // }, [imdbID]);


//     // return { loading, error, headlines };
// }
// export const MoviePage = (imdbID) => useEffect(() => { console.log(imdbID) }, [imdbID])











// export function SearchMovieID(imdbID) {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [headlines, setHeadlines] = useState([]);


//     useEffect(() => {

//         const getData = async () => {
//             try {
//                 const res = await fetch('http://sefdb02.qut.edu.au:3000/movies/data/' + imdbID);
//                 const data = await res.json();
//                 // const dataArray = data.data;
//                 // const MovieToday = [dataArray[0], dataArray[1], dataArray[2]]
//                 setHeadlines(data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getData();
//     }, [imdbID]);

//     return { loading, error, headlines };
// }





