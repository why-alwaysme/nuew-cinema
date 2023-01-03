import {getTvList, searchTv} from "./Api";
import {
    Divider, Text, SimpleGrid,
    Card, CardHeader, CardBody, 
    Heading,
    Input, Image,
    ChakraProvider,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import "./App.css";

const App = () => {

  const [popularTv, setPopularTv] = useState([])
  
  useEffect(() => {
    getTvList().then((result) => {
      setPopularTv(result)
    })
  }, [])

  const PopularTvList = () => {
    return popularTv.map((tv, i) => {
      return(
        <Card key={i} align='center'>
          <CardHeader>
              <Heading size='md'>{tv.original_name}</Heading>
          </CardHeader>
          <CardBody>
            <Image objectfit='cover' src={`${process.env.REACT_APP_BASEIMGURL}/${tv.poster_path}`} alt=".." />
          </CardBody>
          <Divider />
              <Text as='i' >{tv.first_air_date}</Text>
              <Text marginBottom={3} color='orange' fontsize='2xl' as='b' >{tv.vote_average}</Text>
        </Card>
      )
    } )
  }

  const search = async (q) => {
    if(q.length > 3){
      const query = await searchTv(q)
      setPopularTv(query.results)
    }
  }

  console.log({ popularTv: popularTv })

  return (
    <div className="App">
      <header className="App-header">

          <ChakraProvider>
          <Heading color='teal' >NUEW CINEMA</Heading>
            <Input className="tv-search" htmlSize={70} width="auto" variant='flushed' placeholder='Cari Series..' _placeholder={{ color: '#fff'}} onChange={({ target }) => search(target.value)}/>
              <SimpleGrid marginBottom={10} spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                <PopularTvList/>
              </SimpleGrid>
          </ChakraProvider>

      </header>
    </div>
  );
}

export default App;
