import { Link } from 'react-router-dom';
import './flyout.scss';

const Category = ({ parent, setIsFlyOutOn }) => {
  return (
    <div className="category-list">
      <div className="category-head">{parent?.name}</div>
      <div className="category-content">
        {parent?.children.map((child) => {
          return (
            <div className="category-item" key={child.id}>
              <Link onClick={() => setIsFlyOutOn(false)} to={`/products?category=${child.id}`}>
                {child.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Flyout = ({ classNameAdd, setIsFlyOutOn, categories }) => {
  const groupCategories = categories.reduce((group, category) => {
    const { column } = category;
    group[column] = group[column] ?? [];
    group[column].push(category);
    return group;
  }, []);

  return (
    <div
      id="fly-out"
      className={classNameAdd}
      onMouseEnter={() => setIsFlyOutOn(true)}
      onMouseLeave={() => setIsFlyOutOn(false)}
    >
      <div className="container">
        <div className="wrapper">
          <div className="fo-left">
            {groupCategories.map((column, index) => {
              return (
                <div className="category" key={index}>
                  {column.map((parent) => (
                    <Category parent={parent} setIsFlyOutOn={setIsFlyOutOn} key={parent.id} />
                  ))}
                </div>
              );
            })}
          </div>
          <div className="fo-right">
            {categories.featured?.map((listAcc, indexL) => {
              return (
                <div className="category-list" key={indexL}>
                  <div className="category-head">{listAcc.title}</div>
                  <div className="acsordion-content">
                    {listAcc.list.map((item, indexI) => {
                      return (
                        <div className="category-item" key={indexI}>
                          <Link to="/product-list/ALL">{item}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
