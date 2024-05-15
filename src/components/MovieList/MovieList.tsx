import { useAtom } from 'jotai';
import { useEffect } from "react";
import { Flex } from 'antd';

import { moviesAtom } from '@/stores/AppStore';
import MovieParser, { movieParser } from '@/parsers/MovieParser';
import MovieView from './MovieView';

// const parser = new MovieParser();

const MovieList: React.FC = () => {
  const [movies, setMovies] = useAtom(moviesAtom);
  const movieViews = movies.map(movie => (
    <MovieView 
      key={movie.id}
      movie={movie}
    />
  ));

  useEffect(() => {
    movieParser.parseMovies().then(movies => {
      console.info(`获取影片信息如下：`, movies);
      setMovies(movies);
    });
  }, []);

  return (
    <Flex vertical gap={8} style={{ marginTop: 10 }}>
      {movieViews}
    </Flex>
  );
};

export default MovieList;
