import React from 'react';
import algoliasearch from 'algoliasearch/lite';
// @ts-ignore
import { InstantSearch, SearchBox, VoiceSearch, Highlight, connectHits } from 'react-instantsearch-dom';
import {Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Paper, Container } from '@material-ui/core';
import './App.css';

const searchClient = algoliasearch(
  '0TJ4I2JOET',
  'f70294b40e001364d7667bdbf5ee13a1'
);

const CustomHits = connectHits(({ hits }) => (
  <Grid container spacing={5} style={{flexGrow:1}}>
    {hits.map(hit => (
      <Grid item xs={6} md={4} lg={3} key={hit.objectID}>
        <Card style={{height:500}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height={150}
              image={hit.image}
              title={hit.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <Highlight attribute="name" hit={hit} />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Highlight attribute="description" hit={hit} />
              </Typography>
              <div className="hit-price">${hit.price}</div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
));

const Header = () => (
  <Paper>
    <SearchBox />
    <VoiceSearch />
  </Paper>
)


function App() {
  return (
    <InstantSearch
      indexName="ejemplo_tienda"
      searchClient={searchClient}
    >
       <Header/>
       <Container>
          <CustomHits />
       </Container>
    </InstantSearch>
  );
}


export default App;
