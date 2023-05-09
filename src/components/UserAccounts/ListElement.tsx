interface ListElementProps {
  title: string;
  content: string;
}

const ListElement = ({ title, content }: ListElementProps) => {
  return (
    <div className="row">
      <div className="col-sm-3">
        <h6 className="mb-0">{title}</h6>
      </div>
      <div className="col-sm-9 text-secondary">{content}</div>
    </div>
  );
};

export default ListElement;
