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
    if (details.studio !== null || details.publisher !== null) {
      detailsNodes.push()
    }
    if (details.series !== null) {
      detailsNodes.push(<Flex><strong>系列：</strong>{details.series ?? '-'}</Flex>);
    }
    if (details.director !== null) {
      detailsNodes.push(<Flex><strong>导演：</strong>{details.director ?? '-'}</Flex>);
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
      <Flex justify="center" align="center">
        <Image
          src={cover}
          alt={title}
          width={200}
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
          <Flex gap={8}>
            <Flex><strong>番号：</strong>{id}</Flex>
            <Flex>/</Flex>
            <Flex><strong>发布时间：</strong>{releaseDate}</Flex>
            <Flex>/</Flex>
            <Flex><strong>长度：</strong>{details?.length ?? '-'}</Flex>
          </Flex>
          <Flex gap={8}>
            <Flex><strong>制作商：</strong>{details?.studio ?? '-'}</Flex>
            <Flex> / </Flex>
            <Flex><strong>发行商：</strong>{details?.publisher ?? '-'}</Flex>
          </Flex>
          { detailsNodes }
        </Flex>
        <Flex gap={8}>{tagViews}</Flex>
      </Flex>
    </Flex>
  );
};

export default MovieView;
