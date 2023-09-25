import PropTypes from "prop-types";

export default function PageInfo({ recipes }) {
  return (
    <div>
      <ul>
        {Object.keys(recipes).map((recipeTitle, index) => {
          const recipe = recipes[recipeTitle];
          return (
            <div
              key={recipeTitle}
              className="border border-emerald-600 p-4 rounded-lg mb-4"
            >
              <h4 className="text-xl text-emerald-950 font-semibold">
                <span className="bg-emerald-600 text-white rounded-full px-3 py-1 mr-2">
                  {index + 1}
                </span>
                {recipe.title}
              </h4>
              <p className="text-lg text-emerald-950 font-medium">
                Description: {recipe.description}
              </p>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

PageInfo.propTypes = {
  recipes: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
