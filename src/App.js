import {getTvList, searchTv} from "./Api";
import {
    Divider, Text, SimpleGrid,
    Card, CardHeader, CardBody, 
    Heading, Tabs, TabList, TabPanels, Tab, TabPanel,
    Input, Image, Skeleton,
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
          <Skeleton isLoaded>
          <CardHeader>
              <Heading size='md'>{tv.original_name}</Heading>
          </CardHeader>
          </Skeleton>
          <Skeleton isLoaded>
          <CardBody>
            <Image objectfit='cover' src={`${process.env.REACT_APP_BASEIMGURL}/${tv.poster_path}`} alt=".." />
          </CardBody>
          </Skeleton>
          <Divider />
          <Skeleton isLoaded>
              <Text as='i' >{tv.first_air_date}</Text>
          </Skeleton>
          <Skeleton isLoaded>
              <Text marginBottom={3} color='orange' fontsize='2xl' as='b' >{tv.vote_average}</Text>
          </Skeleton>
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
            <Skeleton isLoaded startColor='pink.500' endColor='orange.500' height='50px'>
              <Heading color='teal' >NUEW CINEMA</Heading>
            </Skeleton>
            <Input className="tv-search" htmlSize={70} width="auto" variant='flushed' placeholder='Cari Series..' _placeholder={{ color: '#fff'}} onChange={({ target }) => search(target.value)}/>
              <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                  <Tab>TV Series</Tab>
                  <Tab>Movie</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid marginBottom={10} spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                      <PopularTvList/>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <p>Soon!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
          </ChakraProvider>

      </header>
    </div>
  );
}

export default App;
