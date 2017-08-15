import React from 'react';
import RecommendationsItem from './RecommendationsItem';
import { Link } from 'react-router-dom';

class RecommendationsList extends React.Component {
  render() {
    return(
      <div className="recommendations">
        {this.props.recommendations.slice(0, 10).map((recommendation, index) => {
          return (
            <Link to={`/movie/${recommendation.id}`} key={index} >
              <RecommendationsItem
                title={recommendation.title}
                image={recommendation.backdrop_path}
                rating={recommendation.vote_average}  />
            </Link>
          );
        })}
      </div>
    );
  }
}

export default RecommendationsList;
