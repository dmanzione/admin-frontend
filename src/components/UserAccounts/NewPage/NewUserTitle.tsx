interface NewUserTitleProps {
  title: string;
}

const NewUserTitle = ({ title }: NewUserTitleProps) => {
  return <h2>{title}</h2>;
};

export default NewUserTitle;
