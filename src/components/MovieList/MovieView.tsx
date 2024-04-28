import { Flex, Image } from "antd";
import Movie from "@/domains/Movie";
import { useEffect, useState } from "react";
import MovieDetails from "@/domains/MovieDetails";
import { movieParser } from "@/parsers/MovieParser";

type MovieViewProps = {
  movie: Movie;
};

const MovieView: React.FC<MovieViewProps> = ({movie}) => {
  const { id, url, cover, title, releaseDate, tags = [] } = movie;
  const [details, setDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    movieParser.parseMovieDetails(id, url).then(details => {
      if (details !== null) {
        setDetails(details);
      }
    });
  }, []);

  const tagViews = tags.map(tag => {
    const { type, description, title } = tag;
    return (
      <button 
        className={['btn', 'btn-xs', `btn-${type}`].join(' ')}
        disabled
        title={description}
      >
        { title }
      </button>
    );
  });

  const detailsNodes: React.ReactNode[] = [];
  if (details !== null) {
    if (details.length) {
      detailsNodes.push(<Flex>长度：{details.length}</Flex>)
    }
    if (details.studio) {
      detailsNodes.push(<Flex>制作商：{details.studio}</Flex>)
    }
    if (details.publisher) {
      detailsNodes.push(<Flex>发行商：{details.publisher}</Flex>)
    }
    if (details.series) {
      detailsNodes.push(<Flex>系列：{details.series}</Flex>)
    }
    if (details.director) {
      detailsNodes.push(<Flex>导演：{details.series}</Flex>)
    }
  }

  const preview = details !== null ? {
    src: details.cover,
  } : false;

  return (
    <Flex gap={12} style={{
      margin: 20,
      marginTop: 12,
      marginBottom: 0,
      padding: 8,
      backgroundColor: 'white',
      boxShadow: '1px 1px 5px gray',
    }}>
      <Flex>
        <Image
          src={cover}
          alt={title}
          preview={preview}
        />
      </Flex>
      <Flex vertical>
        <Flex onClick={() => window.open(url, '_blank')}>
          <span style={{
            fontSize: '1.25em',
            fontWeight: "bold",
          }}>
            {title}
          </span>
        </Flex>
        <Flex vertical flex={1}>
          <Flex>番号：{id} / 发布时间：{releaseDate}</Flex>
          { detailsNodes }
        </Flex>
        <Flex gap={8}>{tagViews}</Flex>
      </Flex>
    </Flex>
  );
};

export default MovieView;
