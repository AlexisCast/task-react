import classNames from 'classnames';

const PageContent = ({ title, className, children }) => {
  return (
    <div className={classNames('max-w-md mx-auto p-4 bg-white rounded-md', className)}>
      <h1 className="font-semibold mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
